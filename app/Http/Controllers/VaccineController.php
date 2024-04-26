<?php

namespace App\Http\Controllers;

use App\Models\Vaccines;
use Illuminate\Http\Request;

class VaccineController extends Controller
{
    public function allVaccines()
    {
        $vaccines = Vaccines::whereNull('deleted_at')->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($vaccines);
    }
}
