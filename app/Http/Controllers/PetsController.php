<?php

namespace App\Http\Controllers;

use App\Models\PetTypes;
use App\Models\PetBreeds;
use Illuminate\Http\Request;

class PetsController extends Controller
{
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


    public function storePetsData(Request $request){
        $request->validate([
            'petName' => 'required|string|max:255',
            'petType' => 'required|string|max:255',
            'petBreed' => 'nullable',
            'dob' => 'required',
            'petGender' => 'requried',
        ]);

        // Create a new Pet instance and save to the database
        $pet = new Pet();
        $pet->pet_name = $request->input('petName');
        $pet->pet_type = $request->input('petType');
        $pet->save();

        // Optionally, you can return a response or redirect
        return response()->json(['message' => 'Pet data saved successfully'], 200);
    }
}
