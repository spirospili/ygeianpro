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
        'society_name', 'path'
    ];

    public function doctors()
    {
        return $this->hasMany('App\Models\Doctor')->latest();
    }
}
