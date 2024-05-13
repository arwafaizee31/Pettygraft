<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\VerifiesEmails;
use Illuminate\Support\Facades\Auth;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    use VerifiesEmails;

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }
    protected function redirectTo()
    {
        // Get the authenticated user
        $user = Auth::user();

        // Get the user's role
        $role = $user->roles->first(); // Assuming a user has only one role

        // Redirect based on the role
        switch ($role->id) {

            case 2: // User role
                return '/admin/dashboard';
                break;
            case 3: // petowner role
                return '/petowner/myPets';
                break;
            case 4: // Vendor role
                    return '/vendor/dashboard';
                    break;
            default:
                return '/home'; // Default redirection
                break;
        }
    }
}
