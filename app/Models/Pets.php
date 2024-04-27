<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pets extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'pets';
    protected $fillable = [
        'id',
        'owner_id',
        'pet_name',
        'type_id',
        'breed',
        'd_o_b',
        'vaccines_done',
        'gender',
        'last_vaccine_date',
        'is_private',
        'permanent_vendor_id',
        'avatar'
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
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }
    public function vaccines()
    {
        return $this->belongsToMany(Vaccines::class, 'pet_vaccines', 'pet_id', 'vaccine_id');
    }
 
}
