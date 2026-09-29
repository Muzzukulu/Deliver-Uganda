<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transporter;
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
            'national_id' => 'required|string|unique:users,national_id',
        ]);
        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'national_id' => strtoupper($request->national_id),
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken('client-token')->plainTextToken;
        return response()->json(['message' => 'Client account created successfully!', 'token' => $token, 'user' => $user], 201);
    }

    public function clientLogin(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);
        $user = User::where('phone', $request->phone)->orWhere('email', $request->phone)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $user->createToken('client-token')->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'name' => 'required|string',
            'phone' => 'required|string|unique:transporters,phone',
            'national_id' => 'required|string|unique:transporters,national_id|regex:/^CM[A-Z0-9]{12,}$/i',
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
        
        $transporter = Transporter::create([
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
        $transporter = Transporter::where('phone', $request->phone)->first();
        if (!$transporter || !Hash::check($request->password, $transporter->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        if ($transporter->status !== 'approved') {
             return response()->json(['message' => 'Account pending approval'], 403);
        }
        $token = $transporter->createToken('transporter-token')->plainTextToken;
        return response()->json(['token' => $token, 'transporter' => $transporter]);
    }

    // Standard routes
    public function transporterRegister(Request $request) { return $this->register($request); }
    public function transporterLogin(Request $request) { return $this->login($request); }
}