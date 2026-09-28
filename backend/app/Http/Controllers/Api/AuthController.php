<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Rider; // CAPITAL R - this is the fix!
use App\Models\User;
use App\Models\SuspiciousAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function clientRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:users,phone',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'national_id' => 'required|string|unique:users,national_id', // National ID standard for clients too!
        ]);
        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'national_id' => strtoupper($request->national_id),
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('customer-token')->plainTextToken;
        return response()->json(['message' => 'Customer account created successfully!', 'token' => $token, 'user' => $user], 201);
    }

    public function clientLogin(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);
        $user = User::where('phone', $request->phone)->orWhere('email', $request->phone)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('customer-token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'name' => 'required|string',
            'phone' => 'required|string|unique:riders,phone',
            'national_id' => 'required|string|unique:riders,national_id|regex:/^CM[A-Z0-9]{12,}$/i',
            'driving_permit' => 'nullable|string',
            'password' => 'required|string|min:8|confirmed',
        ]);
        
        $phone = $request->phone;
        $nationalId = strtoupper($request->national_id);
        $blockedNumbers = ['0700000001', '0700000002', '0750000000'];
        
        if (in_array($phone, $blockedNumbers)) {
            SuspiciousAttempt::create(['phone' => $phone, 'national_id' => $nationalId, 'first_name' => $request->first_name, 'reason' => 'Blacklisted number', 'ip_address' => $request->ip()]);
            return response()->json(['message' => 'Verification Failed: This phone number is linked to a reported case'], 403);
        }
        
        $rider = Rider::create([ // CAPITAL R
            'first_name' => $request->first_name, 
            'name' => $request->name, 
            'phone' => $phone,
            'national_id' => $nationalId, 
            'driving_permit' => $request->driving_permit,
            'password' => Hash::make($request->password), 
            'status' => 'pending',
        ]);
        return response()->json(['message' => 'Registration successful! Awaiting verification.'], 201);
    }

    public function login(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);
        $rider = Rider::where('phone', $request->phone)->first(); // CAPITAL R
        if (!$rider || !Hash::check($request->password, $rider->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $rider->createToken('rider-token')->plainTextToken;
        return response()->json(['token' => $token, 'rider' => $rider]);
    }

    // Aliases for new standard routes
    public function riderRegister(Request $request) { return $this->register($request); }
    public function riderLogin(Request $request) { return $this->login($request); }
    
    // Keep old driver names working for 1 month
    public function driverRegister(Request $request) { return $this->register($request); }
    public function driverLogin(Request $request) { return $this->login($request); }
}