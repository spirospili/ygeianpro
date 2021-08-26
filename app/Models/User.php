<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use  App\Models\Notification;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'image', 'profession',"payment_info","speciality"
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function doctors()
    {
        return $this->belongsToMany('App\Models\Doctor', 'followers', 'user_id', 'doctor_id')->withPivot('created_at')->latest();
    }

    public function publications()
    {
        return $this->belongsToMany('App\Models\File', 'file_likes', 'user_id', 'file_id')->withPivot('created_at')->latest();;
    }

    public function videos()
    {
        return $this->belongsToMany('App\Models\Video', 'video_likes', 'user_id', 'video_id')->withPivot('created_at')->latest();;
    }


}
