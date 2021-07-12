<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'video', 'length', 'doctor_id',
        'likes', 'shares', 'tags', 'description',
        'type', 'hospital_id'
    ];

    public function likes()
    {
        $this->hasMany('App\Models\VideoLike');
    }
}
