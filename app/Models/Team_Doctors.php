<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team_Doctors extends Model
{
    protected $table = 'team_doctors';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = 
    [
        'team_id', 'doctor_id','type'
    ];

}