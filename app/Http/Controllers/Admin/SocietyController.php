<?php

namespace App\Http\Controllers\Admin;

use App\Models\Doctor;
use App\Models\Masterclass;
use App\Models\Subclass;
use App\Models\Society;

use App\Models\Speciality;
use App\Models\User;
use App\Notifications\PushNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SocietyController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $data=(object) Society::when($request->keywords, function ($query) use ($request){
            return $query->where('society_name', 'LIKE', '%' . $request->keywords .'%');
        })->latest()->get();
        
       
        return view('admin.society.index', [
            'title' => 'Hospital',
            'societies' => $data
        ]);
    }

    
    /**
     * Store the request
     */
    public function create()
    {
        return view('admin.society.create');
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:100'

        ]);
        $society = Society::create([
            'society_name' => $request->name,
            'path' => $request->file('logo') ? $request->file('logo')->store('society', 'public'): null,
            'description' => $request->description
        ]);
        
        

        $details = [
            'title' => 'Society Created',
            'body' => 'New hospital created  by the admin',
            'doctor' => $society,
        ];
        
        $users = User::all();
        foreach($users as $user){
            $user->notify(new PushNotification($details));
        }
        
        return redirect()->route('admin.society.index');
    }

    /** Edit the resource */
    public function edit($id)
    {
        $society = Society::findOrFail($id);
        
        return view('admin.society.edit', [
            'society' => $society
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $request->validate
        ([
            'name' => 'required|min:3|max:100', 
        ]);

        $society = Society::findOrFail($id)->update(['society_name' => $request->name, 'description' => $request->description, $request->file('logo') ? $request->file('logo')->store('society', 'public'): null ]);
       
               
    
        return redirect()->route('admin.society.index');
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Society::find($id)->delete();
        
        return redirect()->back();
    }
}
