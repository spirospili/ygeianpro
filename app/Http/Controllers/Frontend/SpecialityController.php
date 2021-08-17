<?php

namespace App\Http\Controllers\Frontend;

use App\Models\News;
use Illuminate\Http\Request;
use App\Models\Speciality;
use Illuminate\Support\Facades\DB;

class SpecialityController
{
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        
        return response()->json(['speciality' => DB::table('speciality')->get()]);
    }

    

    
}
