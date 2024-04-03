<?php

namespace App\Http\Controllers;
use App\Models\Role;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function roles()
    {
        $roles = Role::whereIn('id', [3,4])->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($roles);
    }
}
