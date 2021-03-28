<?php

namespace App\Http\Controllers\Frontend;

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
        $news = News::when($request->search, function($query)use($request){
            $query->where('title', 'LIKE', '%' . $request->search .'%');
        })->latest()->get();
        return response()->json(['news' => $news]);
    }

    /**
     * Update the request
     */
    public function show($id)
    {
        return response()->json(News::findOrFail($id));
    }

    
}
