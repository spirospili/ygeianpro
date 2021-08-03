<?php

namespace App\Http\Controllers\Admin;

use App\Models\Team;
use App\Models\Doctor;
use App\Models\Team_Doctors;
use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class TeamController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $teams=Team::when($request->keywords, function ($query) use ($request){
            return $query->where('TeamName', 'LIKE', '%%');
        })->latest()->get();

        $doctors=Doctor::when($request->keywords, function ($query) use ($request){
            return $query->where('tags', 'LIKE', '%Top%');
        })->latest()->get();

        foreach ($teams as $team)
        {
            foreach ($doctors as $doctor)
            {
               if($team->TeamLead_id==$doctor->id)
                 {
                    $team->TeamLead_name=$doctor->name;
                 }
            }
        }

        return view('admin.team.index', [
            'title' => 'Teams',
            'teams' => $teams
        ]);
    }

    
    /**
     * Store the request
     */
    public function create()
    {

        return view('admin.team.create',[
            'specialities' => DB::table('speciality')->get(),
            'doctors' => DB::table('doctors')->get()
        ]);
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:100',
            'lead_doctor_name' => 'required', 
            'speciality'=>'required',
            'logo'=> 'image|mimes:jpeg,jpg,png|required'
        ]);
        
        $team = Team::create([
            'team_name' => $request->name,
            'TeamLead_id' => $request->lead_doctor_name,
            'team_speciality' => $request->speciality ?? null,
            'logo_path' => $request->file('logo') ? $request->file('logo')->store('teams', 'public'): null
        ]);

        $added_team=Team::where('team_name', $request->name)
        ->Where('TeamLead_id', $request->lead_doctor_name)
        ->Where('team_speciality', $request->speciality ?? null)
        ->get();
         
        Team_Doctors::create
        ([
                   'team_id' => $added_team[0]->team_id,
                   'doctor_id' => $request->lead_doctor_name,
                   'type' => "lead"
        ]);

        foreach($request->team_member as $team_member)
        {
            if($team_member!="null"){
               Team_Doctors::create
               ([
                   'team_id' => $added_team[0]->team_id,
                   'doctor_id' => $team_member,
                   'type' => "member"
                ]);
            }
        }
        $details = [
            'title' => 'Team Created',
            'body' => 'New Team created  by the admin',
            'doctor' => $team,
        ];
        
        $users = User::all();
        foreach($users as $user){
            $user->notify(new PushNotification($details));
        }
        
        return redirect()->route('admin.team.index');
    }

    /** Edit the resource */
    public function edit($id)
    {
        $team = Team::where('team_id', $id)->get();
        $team_members=Team_Doctors::where('team_id', $id)->get();

        return view('admin.team.edit', [
            'id' => $id,
            'team' => $team[0],
            'team_members'=> $team_members,
            'doctors' => DB::table('doctors')->get()
        ], [
            'specialities' => DB::table('speciality')->get()
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'lead_doctor_name' => 'required', 
            'speciality'=>'required'
        ]);
         

        $team = Team::where('team_id', $id)->update(['team_name'=> $request->name, 'TeamLead_id'=> $request->lead_doctor_name, 'team_speciality' => $request->speciality, 'logo_path' => $request->file('logo') ? $request->file('logo')->store('teams', 'public'): null]); 
        
        $doctors=Team_Doctors::where('team_id', $id)->delete();
        
        Team_Doctors::create
        ([
                   'team_id' => $id,
                   'doctor_id' => $request->lead_doctor_name,
                   'type' => "lead"
        ]);

        foreach($request->team_member as $team_member)
        {
            if($team_member!="null"){

               Team_Doctors::create
               ([
                   'team_id' => $id,
                   'doctor_id' => $team_member,
                   'type' => "member"
                ]);
            }
        }
        
        return redirect()->route('admin.team.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Team::where('team_id', $id)->delete();
        Team_Doctors::where('team_id', $id)->delete();
        return redirect()->back();
    }
}
