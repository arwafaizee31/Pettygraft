<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserVaccines extends Model
{
    use HasFactory;
    protected $table = 'user_vaccines';
    protected $fillable = [
        'id',
        'vendor_id',
        'vaccine_id',
    ];
    
}
