<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PetTypes extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'pet_types';
    protected $fillable = [
        'id',
        'pet_type',
        'pet_types_display_name',
    ];
}
