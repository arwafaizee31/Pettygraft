<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable ,SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'fname',
        'lname',
        'email',
        'password',
        'country_code' ,
        'phone_no',
        'country',
        'state',
        'city',
        'role_id',
        'avatar',
        'profile_description'   
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles','user_id','role_id');
    }
    public function pets()
    {
        return $this->hasMany(Pets::class, 'owner_id', 'id');
    }
    public function vaccines()
    {
        return $this->belongsToMany(Vaccines::class, 'vendor_vaccines', 'vendor_id', 'vaccine_id');
    }
}
