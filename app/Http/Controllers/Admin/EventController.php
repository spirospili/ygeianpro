<?php

namespace App\Http\Controllers\Admin;

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
        return view('admin.event.index', [
            'title' => 'Events',
            'events' => Event::when($request->keywords, function ($query) use ($request){
                return $query->where('name', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }

    /**
     * Store the request
     */
    public function create()
    {
        return view('admin.event.create');
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:100',
            'image' => 'required|image|mimes:jpeg,jpg,png',
            'description' => 'nullable|max:1000', 
            'start_date' => 'required',
            'end_date' => 'required',
            'location' => 'required|min:3|max:150'
        ]);

        $event = Event::create([
            'name' => $request->title,
            'description' => $request->description,
            'image' => $request->file('image')->store('events', 'public'),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'price' => '',
            'location' =>$request->location
        ]);

        return redirect()->route('admin.event.index');
    }

    /** Edit the resource */
    public function edit($id)
    {
        $event = Event::findOrFail($id);
        
        return view('admin.event.edit', [
            'event' => $event
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $events = Events::find($id);
        
        if($request->name)
            $events->name = $request->name;

        if($request->description)
            $events->description = $request->description;

        if($request->file('image'))
            $events->image = $request->file('image')->store('events', 'public');

        if($request->start_date)
            $events->start_date = $request->start_date;

        if($request->end_date)
            $events->end_date = $request->end_date;

        if($request->location)
            $events->location = $request->location;

        $events->save();

        return redirect()->back();
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        Event::find($id)->delete();

        return redirect()->back();
    }
}
