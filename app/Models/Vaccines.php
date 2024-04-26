<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Vaccines extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'vaccines';
    protected $fillable = [
        'id',
        'pet_type_id',
        'vaccine_name',
        'min_age',
       'max_age',

    ];
        
}