<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    protected $table = 'hospitals';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'hospital_name', 'path', 'description'
    ];

    public function doctors()
    {
        return $this->hasMany('App\Models\Doctor')->latest();
    }

    public function videos()
    {
        return $this->hasMany('App\Models\Video')->latest();
    }

    public function publications()
    {
        return $this->hasMany('App\Models\File')->latest();
    }

    public function masterclasses()
    {
        return $this->hasMany('App\Models\Masterclass')->latest();
    }
}
