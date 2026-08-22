<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Driver;
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
        ]);
        $user = User::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
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
            'phone' => 'required|string|unique:drivers,phone',
            'national_id' => 'required|string|unique:drivers,national_id',
            'driving_permit' => 'nullable|string',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $phone = $request->phone;
        $firstName = strtoupper($request->first_name);
        $nationalId = strtoupper($request->national_id);
        $blockedNumbers = ['0700000001', '0700000002', '0750000000'];
        if (in_array($phone, $blockedNumbers)) {
            SuspiciousAttempt::create(['phone' => $phone, 'national_id' => $nationalId, 'first_name' => $request->first_name, 'reason' => 'Blacklisted number', 'ip_address' => $request->ip()]);
            return response()->json(['message' => 'Verification Failed: This phone number is linked to a reported case'], 403);
        }
        $driver = Driver::create([
            'first_name' => $request->first_name, 'name' => $request->name, 'phone' => $phone,
            'national_id' => $nationalId, 'driving_permit' => $request->driving_permit,
            'password' => Hash::make($request->password), 'status' => 'pending',
        ]);
        return response()->json(['message' => 'Registration successful! Awaiting verification.'], 201);
    }

    public function login(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);
        $driver = Driver::where('phone', $request->phone)->first();
        if (!$driver || !Hash::check($request->password, $driver->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $driver->createToken('driver-token')->plainTextToken;
        return response()->json(['token' => $token, 'driver' => $driver]);
    }

    public function driverRegister(Request $request) { return $this->register($request); }
    public function driverLogin(Request $request) { return $this->login($request); }
}