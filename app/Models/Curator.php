<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curator extends Model
{
    protected $table = 'curators';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = 
    [
        'masterclass_id', 'doctors_id'
    ];

    
}
