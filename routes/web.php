<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PetsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(['verify' => true]);
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});




Route::middleware(['auth', 'verified'])->group(function () {

    Route::group(['middleware' => ['admin', 'verified'], 'prefix' => 'admin'], function () {

        // Define routes accessible only by Admin
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('admin-dashboard');
    });
    Route::group(['middleware' => ['petowner', 'verified'], 'prefix' => 'petowner'], function () {

        // Define routes accessible only by Pet Owner
        Route::get('/dashboard', function () {
            return Inertia::render('PetOwner/Dashboard');
        })->name('petOwner-dashboard');

        Route::get('/petRegistration', function () {
            return Inertia::render('PetOwner/PetRegistration');
        })->name('PetRegistration');

        Route::get('/petProfilePage/{id}', [PetsController::class, 'show'])->name('petOwner-PetProfilePage');
        Route::delete('/petProfile/{id}', [PetsController::class, 'destroy'])->name('petProfile.destroy');
        Route::put('/privateVendor/{petId}/update', [PetsController::class, 'privateVendorUpdate'])->name('privateVendor.update');
        Route::post('/update-pet-image/{petId}', [PetsController::class, 'updatePetImage'])->name('update-pet-image');
        Route::put('/update-pet-profile/{petId}', [PetsController::class, 'updatePetProfile'])->name('update-pet-profile');
        
        Route::get('/myPets', function () {
            return Inertia::render('PetOwner/MyPets');
        })->name('my-pets.owner');
    });
    Route::group(['middleware' => ['vendor', 'verified'], 'prefix' => 'vendor'], function () {

        // Define routes accessible only by Vendor
        Route::get('/dashboard', function () {
            return Inertia::render('Vendor/Dashboard');
        })->name('vendor-dashboard');

        Route::get('/all-pets', function () {
            return Inertia::render('Vendor/AllPets');
        })->name('vendor-allpets');

        Route::get('/vaccines', function () {
            return Inertia::render('Vendor/VaccineListing');
        })->name('vendor-vaccineListing');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/{Id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{Id}', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/update-user-image/{Id}', [ProfileController::class, 'updateUserImage'])->name('update-user-image');
});

require __DIR__ . '/auth.php';
