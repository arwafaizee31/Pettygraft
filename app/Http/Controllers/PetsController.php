<?php

namespace App\Http\Controllers;

use App\Models\PetTypes;
use App\Models\PetBreeds;

use Illuminate\Http\Request;
use App\Models\Pets;
use Inertia\Inertia;
class PetsController extends Controller
{
    //
    public function allpets()
    {
        $pets = Pets::with('breed','owner')->where('deleted_at', null)->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($pets);
    }
    public function show($id)
    {
        // Fetch the pet details by ID
        $pet = Pets::findOrFail($id);

        // Pass the pet details to the Inertia view
        return Inertia::render('PetOwner/PetProfilePage', [
            'pet' => $pet,
        ]);
    }
    public function getPetGender()
    {
        $pet_gender = config('variables.petGender');
        return response()->json($pet_gender);
    }

    public function getPetTypes(){
        $pet_types = PetTypes::all();
        return response()->json($pet_types);
    }

    public function getPetBreeds(){
        $pet_breeds = PetBreeds::all();
        return response()->json($pet_breeds);
    }
    
}
