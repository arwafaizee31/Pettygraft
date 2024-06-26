<?php

use App\Models\UserRoles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PetsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VaccineController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/roles', [UserController::class, 'roles']);
Route::get('/petsGender', [PetsController::class, 'getPetGender']);
Route::get('/petTypes', [PetsController::class, 'getPetTypes']);
Route::get('/petBreeds', [PetsController::class, 'getPetBreeds']);

Route::get('/allPets', [PetsController::class, 'allpets']);
Route::get('/allVendors', [UserController::class, 'allVendors']);
Route::get('/allVaccines', [VaccineController::class, 'allVaccines']);
Route::get('/ownerMyPets/{id}', [PetsController::class, 'ownerMyPets']);
Route::get('/UsersbyId/{Id}', [ProfileController::class, 'Users']);
Route::get('/privatePets/{Id}', [PetsController::class, 'privatePets']);
Route::get('/customPets/{Id}', [PetsController::class, 'customPets']);
Route::get('/page-title', [UserController::class, 'pageTitle']);
Route::get('/user/{user}/role', [UserController::class, 'getUserRole']);
Route::get('/premiumVendors', [UserController::class, 'premiumVendors']);


