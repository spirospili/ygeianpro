<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Masterclass extends Model
{
    protected $table = 'masterclass';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'masterclass_title', 'speciality', 'hospital_id', 'm_thumbnail'
    ];

    public function subclasses()
    {
        return $this->hasMany('App\Models\Subclass')->latest();
    }

    public function curators()
    {
        return $this->hasMany('App\Models\Curator')->latest();
    }
}
