<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomPetVaccines extends Model
{
    use HasFactory;
    protected $table = 'custom_pet_vaccines';
    protected $fillable = [
        'id',
        'custom_pet_id',
        'vaccine_id',
    ];
}




