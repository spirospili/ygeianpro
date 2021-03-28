<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\File as Publication;
use App\Models\FileLike as PublicationLike;
use Illuminate\Http\Request;

class PublicationController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only('update');
    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $ids = [];
        if($request->auth)
            $ids = PublicationLike::whereUserId($request->auth)->get()->pluck('file_id')->toArray();

        return response()->json(Publication::when($request->keywords, function ($query) use ($request){
            return $query->where('name', 'LIKE', '%' . $request->keywords .'%')
                ->orWhere('tags', 'LIKE', '%'.$request->keywords.'%');
        })/*->when($request->auth, function($query) use($ids){
            $query->whereIn('id', $ids);
        })*/->when($request->page, function($query){
            return $query->limit(2);
        })->latest()->get());
    }

    /**
     * Store the request
     */
    public function create()
    {
    
    }

    /**
     * show the resourse
     */
    public function show($id)
    {
        return response()->json(Publication::findOrFail($id));
    }

    /**
     * Store the request
     */
    public function store(Request $request)
    {
    
    }

    /**
     * Update the request
     */
    public function update(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);
        if($request->like){
            $publication->likes = $publication->likes+1;
            PublicationLike::create([
                'user_id' => auth()->user()->id,
                'file_id' => $id
            ]);
        }

        if($request->unlike){
            $publication->likes = $publication->likes-1;
            PublicationLike::whereUserId(auth()->user()->id)->whereFileId($id)->delete();
        }

        if($request->share)
            $publication->shares = $publication->shares+1;
        
        $publication->save();

        return response()->json(['message' => 'success']);
    }

    /**
     * Delete the request
     */
    public function destroy($id)
    {
        
    }
}
