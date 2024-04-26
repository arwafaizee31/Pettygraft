<?php

namespace App\Http\Controllers;
use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;

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
}
