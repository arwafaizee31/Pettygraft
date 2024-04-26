<?php

namespace App\Http\Controllers;

use App\Models\PetTypes;
use App\Models\PetBreeds;

use Illuminate\Http\Request;
use App\Models\Pets;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class PetsController extends Controller
{
    //
    public function allpets()
    {
        $pets = Pets::with('breeds', 'owner')->where('deleted_at', null)->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($pets);
    }
    public function show($id)
    {
        // Fetch the pet details by ID
        $pet = Pets::with('breeds','types','owner')->findOrFail($id);

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

    public function getPetTypes()
    {
        $pet_types = PetTypes::all();
        return response()->json($pet_types);
    }

    public function getPetBreeds()
    {
        $pet_breeds = PetBreeds::all();
        return response()->json($pet_breeds);
    }
    public function destroy(Request $request, $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $pet = Pets::findOrFail($id);


        $pet->delete();
        return Redirect::to('/petowner/dashboard')->with('Pet deleted successfully');
    }
    public function privateVendorUpdate(Request $request, $petId): RedirectResponse
    {

        // Validate the request data
        $validatedData = $request->validate([
            'permanent_vendor_id' => 'nullable|exists:users,id', // Ensure the vendor ID exists in the users table
        ]);

        // Find the pet by ID
        $pet = Pets::findOrFail($petId);

        // Update the pet's permanent vendor ID
        if ($validatedData['permanent_vendor_id']) {
            $pet->is_private = 1;
            $pet->permanent_vendor_id = $validatedData['permanent_vendor_id'];
            $pet->save();
        } else {
            $pet->is_private = 0;
            $pet->permanent_vendor_id = null;
            $pet->save();
        }


        // Return a response indicating success
        return Redirect::back()->with('Permanent vendor updated successfully');
    }
    public function updatePetImage(Request $request, $petId)
    {

        // Validate the incoming request data (e.g., image upload)
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png|max:2048',
        ]);

        // Handle image upload and update logic
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Store the image in the public/pets directory
            $image->storeAs('public/pets', $imageName);

            // Update the pet's image path in the database
            $pet = Pets::findOrFail($petId);
            $pet->avatar = '/storage/pets/' . $imageName; // Note: 'storage' is linked to 'public' directory
            $pet->save();
        }

        // Redirect back to the pet profile page
        return redirect()->back();
    }
    public function updatePetProfile(Request $request, $petId): RedirectResponse
    {

        // Validate the request data
        $validatedData = $request->validate([
          
            'pet_name'=> 'required|string',
            'd_o_b' => 'required|date',
            'last_vaccine_date'=> 'required|date',
            'type_id' => 'required',
            'breed' => 'required',
            'gender' => 'required', // Ensure the vendor ID exists in the users table
        ]);
       
        // Find the pet by ID
        $pet = Pets::findOrFail($petId);

        // Update the pet's permanent vendor ID
       
            $pet->pet_name = $validatedData['pet_name'];
            $pet->d_o_b = $validatedData['d_o_b'];
            $pet->last_vaccine_date = $validatedData['last_vaccine_date'];
            $pet->type_id = $validatedData['type_id'];
            $pet->breed = $validatedData['breed'];
            $pet->gender = $validatedData['gender'];
            $pet->save();
        
         
        


        // Return a response indicating success
        return Redirect::back();
    }
}
