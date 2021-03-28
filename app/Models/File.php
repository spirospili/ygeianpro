<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'path', 'tags', 'doctor_id'
    ];

    public function likes()
    {
        $this->hasMany('App\Models\FileLike');
    }
}
