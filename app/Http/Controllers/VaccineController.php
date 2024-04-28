<?php

namespace App\Http\Controllers;

use App\Models\Vaccines;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use App\Mail\VaccineApprovalMailbyAdmin;
use App\Models\User;

class VaccineController extends Controller
{
    public function allVaccines()
    {
        $vaccines = Vaccines::with('types')->where('is_approved' , 1)->where('deleted_at', null)->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($vaccines);
    }
    public function addVaccine(Request $request,$Id): RedirectResponse
    {
        // Validate the request data
        
        $user = User::where('id', $Id)->first();
      $email = $user->email;    
        $validator = Validator::make($request->all(), [
            'vaccine_name' => 'required|string|max:255',
            'min_age' => 'required|numeric',
            'max_age' => 'required|numeric',
            'pet_type_id' => 'required|exists:pet_types,id', // Assuming you have a pet_types table
        ]);

        // If validation fails, redirect back with error messages
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Create a new vaccine instance
        $vaccine = new Vaccines();
        $vaccine->vaccine_name = $request->input('vaccine_name');
        $vaccine->min_age = $request->input('min_age');
        $vaccine->max_age = $request->input('max_age');
        $vaccine->pet_type_id = $request->input('pet_type_id');
        $vaccine->is_approved = false; // Default value
       
        $vaccine->save();
        if($user){
            \Mail::to($email)->send(new VaccineApprovalMailbyAdmin($user,$vaccine));
        }
     
        // Redirect back with success message
        return redirect()->back()->with('success', 'Vaccine added successfully.Kindly wait for it to be approved by PettyGrapht');
    }
    
}
