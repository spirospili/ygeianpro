<?php

namespace App\Http\Controllers\Admin;

use App\Models\LiveSession;
use Illuminate\Http\Request;

class LiveController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('admin.live.index', [
            'title' => 'Go Live',
            'session' => LiveSession::where('status', 'started')->orderByDesc('id')->limit(1)->first()
        ]);
    }


    /**
     * Store the request
     */
    public function store(Request $request)
    {
        LiveSession::create([
            'url' => $request->url
        ]);

        return redirect()->back();
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $session = LiveSession::find($id);
        $session->status = 'closed';
        $session->save();

        return redirect()->back();
    }
}
