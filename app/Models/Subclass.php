<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subclass extends Model
{
    protected $table = 'subclasses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'masterclass_id', 'path', 'video_title', 'description'
    ];

}
