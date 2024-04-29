<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserRoles extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'user_roles';
    protected $fillable = [
        'id',
        'role_id',
        'user_id'
    ];
}
