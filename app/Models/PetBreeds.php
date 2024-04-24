<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PetBreeds extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'pet_breeds';
    protected $fillable = [
        'id',
        'pet_type_id',
        'breed',
        'breed_display_name'
    ];
}
