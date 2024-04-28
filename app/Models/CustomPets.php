<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class CustomPets extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'custom_pets';
    protected $fillable = [
        'id',
        'vendor_id',
        'pet_name',
        'type_id',
        'breed',
        'd_o_b',
        'vaccines_done',
        'gender',
        'last_vaccine_date',
       'owner_name',
       'owner_contact',
       'owner_email',
       'country_code'
    ];
    public function breeds()
    {
        return $this->belongsTo(PetBreeds::class, 'breed', 'id');
    }
    public function types()
    {
        return $this->belongsTo(PetTypes::class, 'type_id', 'id');
    }
    public function owner()
    {
        return $this->belongsTo(User::class, 'vendor_id', 'id');
    }
    public function vaccines()
    {
        return $this->belongsToMany(Vaccines::class, 'custom_pet_vaccines', 'custom_pet_id', 'vaccine_id');
    }
 
}
