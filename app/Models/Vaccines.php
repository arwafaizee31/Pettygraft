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
    public function pets()
    {
        return $this->belongsToMany(Pets::class, 'pet_vaccines');
    }
    public function types()
    {
        return $this->belongsTo(PetTypes::class, 'pet_type_id', 'id');
    }
    public function custompets()
    {
        return $this->belongsToMany(CustomPets::class, 'custom_pet_vaccines');
    }
    public function vendors()
    {
        return $this->belongsToMany(User::class, 'vendor_vaccines');
    }
}
