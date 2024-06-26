<?php

namespace App\Http\Controllers;

use App\Models\PetTypes;
use App\Models\PetBreeds;
use App\Models\CustomPets;
use Illuminate\Http\Request;
use App\Models\Pets;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;



class PetsController extends Controller
{
    //
    public function allpets()
    {
        $pets = Pets::with('breeds', 'owner')->where('deleted_at', null)->where('is_private', 0)->where('permanent_vendor_id', null)->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($pets);
    }
    public function show($id)
    {
        // Fetch the pet details by ID
        $user = Auth::user();
        $roleId = $user->roles()->first()->id;
        if ($roleId == 4) {
            $pet = CustomPets::with('breeds', 'types', 'owner', 'vaccines')->findOrFail($id);
            return Inertia::render('Vendor/CustomPetProfilePage', [
                'pet' => $pet, 'roleId' => $roleId
            ]);
        } else {
            $pet = Pets::with('breeds', 'types', 'owner', 'vaccines')->findOrFail($id);
            if ($pet->owner_id !== auth()->id()) {
                // If not the owner, return a forbidden response
                abort(403, 'Unauthorized action.');
            }
            return Inertia::render('PetOwner/PetProfilePage', [
                'pet' => $pet,


            ]);
        }
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
        $user = Auth::user();
        $roleId = $user->roles()->first()->id;
        if ($roleId == 4) {
            $pet = CustomPets::findOrFail($id);
            $pet->delete();
            return Redirect::to('/vendor/dashboard')->with('Pet deleted successfully');
        } else {
            $pet = Pets::findOrFail($id);
            $pet->delete();
            return Redirect::to('/petowner/myPets')->with('Pet deleted successfully');
        }
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
        $user = Auth::user();
        $roleId = $user->roles()->first()->id;

        if ($roleId == 4) {

            $pet = CustomPets::findOrFail($petId);
            $validatedData = $request->validate([

                'pet_name' => 'required|string',
                'd_o_b' => 'required|date',
                'last_vaccine_date' => 'required|date',
                'type_id' => 'required',
                'breed' => 'required',
                'gender' => 'required',
                'vaccine_ids' => 'array',
                'owner_name' => 'required',
                'owner_email' => 'required|string|email|max:255', // removed lowercase
                'country_code' => 'required|string|max:255',
                'owner_contact' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'state' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255', // Ensure the vendor ID exists in the users table
            ]);
            $pet->pet_name = $validatedData['pet_name'];
            $pet->d_o_b = $validatedData['d_o_b'];
            $pet->last_vaccine_date = $validatedData['last_vaccine_date'];
            $pet->type_id = $validatedData['type_id'];
            $pet->breed = $validatedData['breed'];
            $pet->gender = $validatedData['gender'];
            $pet->owner_name = $validatedData['owner_name'];
            $pet->owner_email = $validatedData['owner_email'];
            $pet->country_code = $validatedData['country_code'];
            $pet->owner_contact = $validatedData['owner_contact'];
            $pet->country = $validatedData['country'];
            $pet->state = $validatedData['state'];
            $pet->city = $validatedData['city'];
            $pet->save();
            if (isset($validatedData['vaccine_ids'])) {
                $pet->vaccines()->sync($validatedData['vaccine_ids']);
            }
        } else {

            $pet = Pets::findOrFail($petId);
            $validatedData = $request->validate([

                'pet_name' => 'required|string',
                'd_o_b' => 'required|date',
                'last_vaccine_date' => 'required|date',
                'type_id' => 'required',
                'breed' => 'required',
                'gender' => 'required',
                'vaccine_ids' => 'array', // Ensure the vendor ID exists in the users table
            ]);
            $pet->pet_name = $validatedData['pet_name'];
            $pet->d_o_b = $validatedData['d_o_b'];
            $pet->last_vaccine_date = $validatedData['last_vaccine_date'];
            $pet->type_id = $validatedData['type_id'];
            $pet->breed = $validatedData['breed'];
            $pet->gender = $validatedData['gender'];
            $pet->save();
            if (isset($validatedData['vaccine_ids'])) {
                $pet->vaccines()->sync($validatedData['vaccine_ids']);
            }
        }


        // Return a response indicating success
        return Redirect::back();
    }
    public function ownerMyPets($id)
    {
        $myPets = Pets::with('breeds')->where('owner_id', $id)->get();
        return response()->json(['pets' => $myPets]);
    }

    public function privatePets($Id)
    {
        $pets = Pets::with('breeds', 'owner')->where('deleted_at', null)->where('is_private', 1)->where('permanent_vendor_id', $Id)->get();
        // Assuming you have a Role model with the necessary fields
        return response()->json($pets);
    }


    public function addCustomPet(Request $request, $Id): RedirectResponse
    {

        // Validate the request data
        $user = Auth::user();
        $roleId = $user->roles()->first()->id;
        if($roleId == 4){
            $validator = Validator::make($request->all(), [
                'pet_name' => 'required|string',
                'd_o_b' => 'required|date',
                'last_vaccine_date' => 'required|date',
                'type_id' => 'required',
                'breed' => 'required',
                'gender' => 'required',
                'vaccine_ids' => 'array|required',
                'owner_name' => 'required',
                'owner_email' => 'required|string|email|max:255', // removed lowercase
                'country_code' => 'required|string|max:255',
                'owner_contact' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'state' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
            ]);
        }
        else{
            $validator = Validator::make($request->all(), [
                'pet_name' => 'required|string',
                'd_o_b' => 'required|date',
                'last_vaccine_date' => 'required|date',
                'type_id' => 'required',
                'breed' => 'required',
                'gender' => 'required',
                'vaccine_ids' => 'array|required',
            ]);
        }
       

        // If validation fails, redirect back with error messages
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Retrieve the validated data
        $validatedData = $validator->validated();

        // Create a new CustomPets instance and save it
        if($roleId == 4){
            $pet = new CustomPets();
            $pet->vendor_id = $Id;
            $pet->owner_name = $validatedData['owner_name'];
            $pet->owner_email = $validatedData['owner_email'];
            $pet->country_code = $validatedData['country_code'];
            $pet->owner_contact = $validatedData['owner_contact'];
            $pet->country = $validatedData['country'];
            $pet->state = $validatedData['state'];
            $pet->city = $validatedData['city'];
        }
        else{
            $pet = new Pets();
            $pet->owner_id = $Id;
            if($validatedData['type_id'] == 1){
                $pet->avatar = "/dogProfile.png";
            }
            else{
                $pet->avatar = "/catProfile.png";
            }
        }
    
       
        $pet->pet_name = $validatedData['pet_name'];
        $pet->d_o_b = $validatedData['d_o_b'];
        $pet->last_vaccine_date = $validatedData['last_vaccine_date'];
        $pet->type_id = $validatedData['type_id'];
        $pet->breed = $validatedData['breed'];
        $pet->gender = $validatedData['gender'];
      
        $pet->save();

        // If there are vaccine IDs, sync them with the pet
        if (isset($validatedData['vaccine_ids'])) {
            $pet->vaccines()->sync($validatedData['vaccine_ids']);
        }
        
        // Redirect back to wherever needed
        return redirect()->back();
    }
    public function customPets($Id)
    {
        $pets = CustomPets::with('breeds', 'owner')->where('deleted_at', null)->where('vendor_id', $Id)->get();
        // Assuming you have a Role model with the necessary fields
        return response()->json($pets);
    }
    public function showPetDetails($id)
    {
        $pet = Pets::with('breeds', 'types', 'owner', 'vaccines')->findOrFail($id);
        $petTypeDisplayName = $pet->types->pet_type_display_name;
        $breedDisplayName = $pet->breeds->breed_display_name;
        
        // Add the pet type display name and breed display name to the pet attributes
        $pet->pet_type_display_name = $petTypeDisplayName;
        $pet->breed_display_name = $breedDisplayName;
        return Inertia::render('Vendor/PetDetails', ['pet' => $pet]);
    }
    public function petRegistration()
    {
        // Fetch the pet details by ID
        $user = Auth::user();
        $roleId = $user->roles()->first()->id;
         
        return Inertia::render('PetOwner/PetRegistration', [
           'roleId' => $roleId
        ]);
     
    }
    public function myPets()
    {
        // Fetch the pet details by ID
        $user = Auth::user();
        $roleId = $user->roles()->first()->id;
       if (count($user->pets) === 0) {
        return Inertia::render('PetOwner/PetRegistration',[
            'roleId' => $roleId
        ]);
    } else {
        return Inertia::render('PetOwner/MyPets');
      
    }
    
       
    }
    
}
