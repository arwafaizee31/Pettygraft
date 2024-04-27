<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    
     
     
    /**
     * Delete the user's account.
     */
   
    public function destroy(Request $request,$id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = User::findOrFail($id);
       
        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/login');
    }
    public function update(Request $request, $Id): RedirectResponse
    {
        

        // Validate the request data
        $validatedData = $request->validate([
            'fname' => 'required|string',
            'lname' => 'required|string',
            'phone_no' => 'nullable|string',
            'country' => 'nullable|string',
            'state' => 'nullable|string',
            'city' => 'nullable|string',
            'country_code' => 'nullable|string',
            'email' => 'required|email',
        ]);
       
        // Find the pet by ID
        try {
            // Find the user by ID
            $user = User::findOrFail($Id);
    
            // Update the user's data
            $user->update($validatedData);
    
            // Return a response indicating success
            return redirect()->back()->with('success', 'Profile updated successfully.');
        } catch (\Exception $e) {
            // Handle the error
            // You can log the error, display an error message, or redirect to an error page
            return redirect()->back()->with('error', 'An error occurred while updating profile.');
        }
    }
    public function updateUserImage(Request $request, $Id)
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
            $image->storeAs('public/users', $imageName);

            // Update the pet's image path in the database
            $user = User::findOrFail($Id);
            $user->avatar = '/storage/users/' . $imageName; // Note: 'storage' is linked to 'public' directory
            $user->save();
        }

        // Redirect back to the pet profile page
        return redirect()->back();
    }
}
