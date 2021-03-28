<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'path', 'description', 'logo', 'speciality', 'tags'
    ];


    public function videos()
    {
        return $this->hasMany('App\Models\Video')->latest();
    }

    public function followers()
    {
        return $this->hasMany('App\Models\Follower')->latest();
    }

    public function publications()
    {
        return $this->hasMany('App\Models\File')->latest();
    }

    public function images()
    {
        return $this->hasMany('App\Models\DoctorImage')->latest();
    }

}
