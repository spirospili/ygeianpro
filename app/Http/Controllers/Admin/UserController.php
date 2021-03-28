<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Newsletter;
use Illuminate\Http\Request;

class UserController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.user.index', [
            'title' => 'User',
            'users' => User::when($request->keywords, function ($query) use ($request){
                return $query->where('name', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
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

    /** Edit the resource */
    public function edit($id)
    {
        
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        User::find($id)->delete();

        return redirect()->back();
    }

    public function newsletter(Request $request)
    {
        return view('admin.user.newsletter', [
            'title' => 'Newsletter List',
            'users' => Newsletter::when($request->keywords, function ($query) use ($request){
                return $query->where('email', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }
}
