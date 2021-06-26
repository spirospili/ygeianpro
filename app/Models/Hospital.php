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
        'hospital_name', 'path'
    ];

    public function doctors()
    {
        return $this->hasMany('App\Models\Doctor')->latest();
    }
}
