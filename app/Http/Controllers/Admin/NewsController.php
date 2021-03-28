<?php

namespace App\Http\Controllers\Admin;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        return view('admin.news.index', [
            'title' => 'News',
            'news' => News::when($request->keywords, function ($query) use ($request){
                return $query->where('title', 'LIKE', '%' . $request->keywords .'%');
            })->latest()->get()
        ]);
    }

    /**
     * Store the request
     */
    public function create()
    {
        return view('admin.news.create');
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:100',
            'image' => 'required|image|mimes:jpeg,jpg,png',
            'content' => 'nullable|max:1000', 
        ]);

        News::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $request->file('image')->store('news', 'public')
        ]);

        return redirect()->route('admin.news.index');
    }

    /**Edit the resource */
    public function edit($id)
    {
        $news = News::findOrFail($id);

        return view('admin.news.edit', [
            'news' => $news
        ]);
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);
        $news->title = $request->title;
        $news->content = $request->content;
        if($request->file('image'))
            $news->image = $request->file('image')->store('news', 'public');
        $news->save();

        return redirect()->back();
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        News::find($id)->delete();

        return redirect()->back();
    }
}
