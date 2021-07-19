<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Society extends Model
{
    protected $table = 'society';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'society_name', 'path','description'
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