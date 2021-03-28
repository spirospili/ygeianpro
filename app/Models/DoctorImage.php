<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DoctorImage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'image', 'doctor_id',
        'likes', 'shares', 'tags', 'description'
    ];

    public function likes()
    {
        $this->hasMany('App\Models\VideoLike');
    }
}
