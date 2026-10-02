<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Transporter;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // === CLIENT - PURE ===
    public function clientRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:clients,phone',
            'email' => 'nullable|email|unique:clients,email',
            'password' => 'required|string|min:6|confirmed',
            'default_gps_lat' => 'nullable|numeric',
            'default_gps_lng' => 'nullable|numeric',
        ]);

        $client = Client::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'default_gps_lat' => $request->default_gps_lat,
            'default_gps_lng' => $request->default_gps_lng,
        ]);

        $token = $client->createToken('client-token')->plainTextToken;
        return response()->json(['message' => 'Client created!', 'token' => $token, 'client' => $client, 'user' => $client], 201);
    }

    public function clientLogin(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);

        $client = Client::where('phone', $request->phone)
                        ->orWhere('email', $request->phone)
                        ->first();

        if (!$client || !Hash::check($request->password, $client->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $client->createToken('client-token')->plainTextToken;
        return response()->json(['token' => $token, 'client' => $client, 'user' => $client]);
    }

    // === TRANSPORTER - PURE, NO DRIVER, NO RIDER ===
    public function transporterRegister(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:transporters,phone',
            'national_id' => 'required|string|unique:transporters,national_id',
            'driving_permit' => 'nullable|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $transporter = Transporter::create([
            'first_name' => $request->first_name,
            'name' => $request->name,
            'phone' => $request->phone,
            'national_id' => strtoupper($request->national_id),
            'driving_permit' => $request->driving_permit,
            'password' => Hash::make($request->password),
            'status' => 'pending',
        ]);

        return response()->json(['message' => 'Transporter registered, awaiting verification', 'transporter' => $transporter], 201);
    }

    public function transporterLogin(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);

        $transporter = Transporter::where('phone', $request->phone)->first();

        if (!$transporter || !Hash::check($request->password, $transporter->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($transporter->status !== 'approved') {
            return response()->json(['message' => 'Account pending approval: '.$transporter->status, 'status' => $transporter->status], 403);
        }

        $token = $transporter->createToken('transporter-token')->plainTextToken;
        // PURE - ONLY transporter, no driver key!
        return response()->json(['token' => $token, 'transporter' => $transporter, 'user' => $transporter]);
    }

    // === ADMIN ===
    public function adminLogin(Request $request)
    {
        $request->validate(['email'=>'required|email','password'=>'required']);
        $admin = Admin::where('email',$request->email)->first();
        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message'=>'Invalid admin credentials'],401);
        }
        $token = $admin->createToken('admin-token')->plainTextToken;
        return response()->json(['token'=>$token,'admin'=>$admin]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logged out']);
    }

    // === LEGACY ALIASES - Keep for old /login route ===
    public function register(Request $request){ return $this->clientRegister($request); }
    public function login(Request $request){ return $this->clientLogin($request); }
}