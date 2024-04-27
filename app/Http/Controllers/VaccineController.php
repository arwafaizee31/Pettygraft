<?php

namespace App\Http\Controllers;

use App\Models\Vaccines;
use Illuminate\Http\Request;

class VaccineController extends Controller
{
    public function allVaccines()
    {
        $vaccines = Vaccines::with('types')->where('is_approved' , 1)->where('deleted_at', null)->get(); // Assuming you have a Role model with the necessary fields
        return response()->json($vaccines);
    }
}
