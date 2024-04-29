<?php

namespace App\Http\Controllers;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRoles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Config;



class UserController extends Controller
{
    public function roles()
    {
        $roles = Role::whereIn('id', [3,4])->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($roles);
    }
    public function allVendors()
{
    $vendors = User::whereNull('deleted_at')
                   ->whereHas('roles', function ($query) {
                       $query->where('role_id', 4);
                   })
                   ->get();

    return response()->json($vendors);
}
public function pageTitle()
{
    // Get the route name from the request and retrieve the page title from the configuration array

    $pageTitle = Config::get('variables.page_title');
    
    // Return the page title as a JSON response
    return response()->json($pageTitle);
}
public function getUserRole($userId)
{
    $role = UserRoles::where('user_id', $userId)->first();
    return response()->json(['role_id' => $role->role_id]);
}
public function getUserId(){
    if (Auth::check()) {
        // Get the ID of the currently logged-in user
        $userId = Auth::id();
        return $userId;
    } else {
        // User is not authenticated, handle the case accordingly
        return null; // or any other value to indicate the absence of a logged-in user
    }
}
public function premiumVendors()
{
   
    $vendors = User::whereNull('deleted_at')
    ->where('is_premium', 1)
    ->whereHas('roles', function ($query) {
        $query->where('role_id', 4);
    })
    ->inRandomOrder() // Randomize the order of results
    ->take(3) // Take only 3 records
    ->get();


    
    return response()->json($vendors);
}


}
