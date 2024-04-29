<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PetsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VaccineController;

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

       

        Route::get('/petRegistration', [PetsController::class, 'petRegistration'])->name('PetRegistration');
       

        Route::get('/petProfilePage/{id}', [PetsController::class, 'show'])->name('petOwner-PetProfilePage');
       
        Route::put('/privateVendor/{petId}/update', [PetsController::class, 'privateVendorUpdate'])->name('privateVendor.update');
        Route::post('/update-pet-image/{petId}', [PetsController::class, 'updatePetImage'])->name('update-pet-image');
       
        Route::get('/myPets', function () {
            return Inertia::render('PetOwner/MyPets');
        })->name('my-pets.owner');
        Route::get('/ownerMyPets', [PetsController::class, 'ownerMyPets'])->name('ownerMyPets');
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

        Route::get('/vaccineAddition', function () {
            return Inertia::render('Vendor/VaccineAdditionForm');
        })->name('vaccineAdditionForm');
        Route::post('/vaccineAddition/{Id}', [VaccineController::class, 'addVaccine'])->name('vaccineAddition');
        Route::get('/customPetAddition', function () {
            return Inertia::render('Vendor/CustomPetAdditionForm');
        })->name('customPetAddition');
     
        Route::get('/petDetails/{id}', [PetsController::class, 'showPetDetails'])->name('pet-details-page');
        Route::get('/custompetProfilePage/{id}', [PetsController::class, 'show'])->name('customPetProfilePage');
        Route::get('/sendDateApproachMail', [VaccineController::class, 'vaccineDateApproach'])->name('vaccinesDateApproachMail');
    });
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/{Id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{Id}', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/update-user-image/{Id}', [ProfileController::class, 'updateUserImage'])->name('update-user-image');
    Route::delete('/petProfile/{id}', [PetsController::class, 'destroy'])->name('petProfile.destroy');
    Route::put('/update-pet-profile/{petId}', [PetsController::class, 'updatePetProfile'])->name('update-pet-profile');
    
    Route::post('/customPetAddition/{Id}', [PetsController::class, 'addCustomPet'])->name('customPetAddition.save');
    Route::get('/vendorDetails/{id}', [UserController::class, 'showVendorDetails'])->name('vendor-details-page');
    Route::get('/allVendors', function () {
        return Inertia::render('AllVendorListing');
    })->name('vendors.show');
});
Route::get('/vendors', function () {
    return Inertia::render('FrontendVendors');
})->name('frontend.vendors');

require __DIR__ . '/auth.php';
