<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PetVaccines extends Model
{
    use HasFactory;
    protected $table = 'pet_vaccines';
    protected $fillable = [
        'id',
        'pet_id',
        'vaccine_id',
    ];
}


