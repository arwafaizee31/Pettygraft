<?php

namespace App\Http\Controllers;

use Mail;
use App\Models\Pets;
use App\Models\User;
use App\Models\Vaccines;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Mail\VaccineApprovalMailbyAdmin;
use Illuminate\Support\Facades\Validator;
use App\Mail\VaccineDateApproachMailByAdmin;
use app\Helpers\custom;
require_once(app_path('Helpers/custom.php'));


class VaccineController extends Controller
{
    public function allVaccines()
    {
        $vaccines = Vaccines::with('types')->where('is_approved', 1)->where('deleted_at', null)->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($vaccines);
    }
    public function addVaccine(Request $request, $Id): RedirectResponse
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
        if ($user) {
            \Mail::to($email)->send(new VaccineApprovalMailbyAdmin($user, $vaccine));
        }

        // Redirect back with success message
        return redirect()->back()->with('success', 'Vaccine added successfully.Kindly wait for it to be approved by PettyGrapht');
    }
    public function vaccineDateApproach()
    {

        $users = User::whereHas('roles', function ($query) {
            $query->where('role_id', 4);
        })->get();
        $pets = Pets::all();

        foreach ($pets as $pet) {
            $pet->age = calculateAge($pet->d_o_b);
        }

        $vaccines = Vaccines::all();
        $filteredPets = [];
        foreach ($pets as $pet) {
            $petAge = calculateAge($pet->d_o_b);
            $petVaccines = [];

            foreach ($vaccines as $vaccine) {
                if ($petAge >= $vaccine->min_age && $petAge <= $vaccine->max_age) {
                    $petVaccines[] = $vaccine;
                }
            }

            if (!empty($petVaccines)) {
                $filteredPets[] = [
                    'pet' => $pet,
                    'vaccines' => $petVaccines
                ];
            }
        }
     
        $allMailData = [];
        foreach ($filteredPets as $filteredPetData) {
            $pet = $filteredPetData['pet'];
            $vaccines = $filteredPetData['vaccines'];

            $user = User::find($pet->owner_id);

            // Add user data to the filtered pet data
            $filteredPetData['user'] = $user;

            // Prepare email data for the pet
            $mailData = [
                'title' => 'Reminder!! Vaccine date Approaching!',
                'pet_dob' => $pet->d_o_b,
                'pet_name' => $pet->pet_name,
                'user_name' => $user ? $user->fname . ' ' . $user->lname : 'Unknown',
                'user_email' => $user->email,
                'vaccines' => []
            ];

            // Add vaccine information for each vaccine
            foreach ($vaccines as $vaccine) {
                $mailData['vaccines'][] = [
                    'vaccine_name' => $vaccine->vaccine_name,
                    'min_age' => $vaccine->min_age,
                    'max_age' => $vaccine->max_age
                ];
            }
            $allMailData[] = $mailData;
        }
  
        foreach ($allMailData as $mailData) {
            if ($pet->is_private == 0) {
                // Send email to all users
                foreach ($users as $user) {
                    \Mail::to($user->email)->send(new VaccineDateApproachMailByAdmin($mailData));
                }
            } elseif ($pet->is_private == 1) {
                // Send email to user with matching permanent_vendor_id
                $user = User::find($pet->permanent_vendor_id);
                if ($user) {
                    \Mail::to($user->email)->send(new VaccineDateApproachMailByAdmin($mailData));
                }
            }
        }
            // if ($pet->is_private == 0) {
            //     // Send email to all users
            //     foreach ($users as $user) {
            //         \Mail::to($user->email)->send(new VaccineDateApproachMailByAdmin($mailData));
            //     }
            // } elseif ($pet->is_private == 1) {
            //     // Send email to user with matching permanent_vendor_id
            //     $user = User::find($pet->permanent_vendor_id);
            //     if ($user) {
            //         \Mail::to($user->email)->send(new VaccineDateApproachMailByAdmin($mailData));
            //     }
            // }
            // \Mail::to('nishthabordia06@gmail.com')->send(new VaccineDateApproachMailByAdmin($mailData));

            dd('Email send successfully.');
        }
    }

