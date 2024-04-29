<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';
    use HasFactory;
    protected $fillable = [
        'id',
        'role_name',
        'display_name',
        'created_at',
       'updated_at'
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }
}
