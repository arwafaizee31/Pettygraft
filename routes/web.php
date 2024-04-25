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

Route::group(['middleware' => ['admin', 'verified'], 'prefix' => 'admin'], function (){
   
        // Define routes accessible only by Admin
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('admin-dashboard');
    });
    Route::group(['middleware' => ['petowner', 'verified'], 'prefix' => 'petowner'], function (){
   
        // Define routes accessible only by Pet Owner
        Route::get('/dashboard', function () {
            return Inertia::render('PetOwner/Dashboard');
        })->name('petOwner-dashboard');

        Route::get('/petRegistration', function () {
            return Inertia::render('PetOwner/PetRegistration');
        })->name('PetRegistration');
    });
    Route::group(['middleware' => ['vendor', 'verified'], 'prefix' => 'vendor'], function (){
   
        // Define routes accessible only by Vendor
        Route::get('/dashboard', function () {
            return Inertia::render('Vendor/Dashboard');
        })->name('vendor-dashboard');

        Route::get('/all-pets', function () {
            return Inertia::render('Vendor/AllPets');
        })->name('vendor-allpets');
    });
  
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
