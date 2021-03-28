<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $events = Event::when($request->search, function($query)use($request){
            $query->where('name', 'LIKE', '%' . $request->search .'%')
            ->orWhere('tags', 'LIKE', '%'.$request->keywords.'%');
        })->latest()->get();
        return response()->json(['events' => $events]);
    }

    /**
     * Update the request
     */
    public function show($id)
    {
        return response()->json(Event::findOrFail($id));
    }

    
}
