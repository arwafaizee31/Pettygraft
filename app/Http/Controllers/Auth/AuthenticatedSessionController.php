<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.requestCustom'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
   /**
 * Handle an incoming authentication request.
 */
public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();

    $request->session()->regenerate();

    // Get the authenticated user
    $user = Auth::user();
    
    // Get the user's role
    $role = $user->roles->first(); // Assuming a user has only one role
    
    // Redirect based on the role
    switch ($role->id) {
        case 1: // Admin role
            return redirect()->route('admin-dashboard');
            break;
        case 2: // User role
            return redirect()->route('admin-dashboard');
            break;
        case 3: // User role
            return redirect()->route('myPets');
            break;
        case 4: // User role
            return redirect()->route('vendor-dashboard');
            break;
        default:
            return redirect()->intended(RouteServiceProvider::HOME); // Default redirection
            break;
    }
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
