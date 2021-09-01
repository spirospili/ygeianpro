<?php

namespace App\Http\Controllers\Frontend;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserProfileController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        if($request->notiifcation == "mark_read"){
            $user = User::find(auth()->user()->id);
            return $user->unreadNotifications->markAsRead();
        }
        if($request->likes)
        return User::with(['videos', 'publications'])->find(auth()->user()->id);
        else
        return  User::with([
            'doctors.videos' => function($q){
                $q->orderBy('created_at', 'DESC');
            },
            'doctors.images' => function($q){
                $q->orderBy('created_at', 'DESC');
            },
            'doctors.publications' => function($q){
                $q->orderBy('created_at', 'DESC');
            },
            'notifications' => function($q){
            $q->whereNull('read_at');
        },'doctors.speciality'])->find(auth()->user()->id);
    }

    /**
     * Store the request
     */
    public function create()
    {
    
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        
    }

    /**
     * View the resourse
     */
    public function show($id)
    {
        
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'nullable',
            'phone' => 'sometimes|nullable',
            'oldPassword' => 'required_with:password',
            'password' => 'nullable|string|min:6|confirmed',
            'image' => 'nullable|image|mimes:jpeg,jpg,png|max:8120'
        ],
            [
                'o_pass.required_with' => "Old Password field is required"
            ]);


            
        $user = User::find(auth()->user()->id);

        if($request->oldPassword) {
            if (!Hash::check($request->oldPassword, $user->password)) {
                return response()->json(["errors" => [
                    'Old Password' => "Old password does not match"
                ]
                ],400);
            }
        }

        if($request->payment_id){

            $payment = json_decode($request->payment_id, true);

            if($request->package == "600"){
                $payment['total'] =   $request->package;
                $payment['subscription_start'] =    date('m/d/Y');
                $payment['subscription_end'] =   date('m/d/Y', strtotime('+1 years'));
            }else{
                $payment['total'] =   $request->package;
                $payment['subscription_start'] =    date('m/d/Y');
                $payment['subscription_end'] =   date('m/d/Y', strtotime('+1 month'));
            }

            $user->payment_info = json_encode($payment);
        }


        if($request->name)
            $user->name = $request->name;

        if($request->phone)
            $user->phone = $request->phone;

        /*if($request->email)
            $user->email = $request->email;*/

        if($request->password)
            $user->password = bcrypt($request->password);

        if($request->file('image'))
            $user->image = $request->file('image')->store('users', 'public');

        

        $user->save();

        return response()->json($user);
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        
    }
}
