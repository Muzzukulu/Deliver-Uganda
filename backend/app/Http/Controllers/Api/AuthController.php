<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Transporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // === CLIENT ===
    public function clientRegister(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:clients,phone',
            'email' => 'nullable|email|unique:clients,email',
            'password' => 'required|string|min:6|confirmed',
        ]);
        $client = Client::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $client->createToken('client-token')->plainTextToken;
        return response()->json(['message' => 'Client created!', 'token' => $token, 'client' => $client], 201);
    }

    public function clientLogin(Request $request)
    {
        $request->validate(['phone' => 'required', 'password' => 'required']);
        $client = Client::where('phone', $request->phone)->orWhere('email', $request->phone)->first();
        if (!$client || !Hash::check($request->password, $client->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $token = $client->createToken('client-token')->plainTextToken;
        return response()->json(['token' => $token, 'client' => $client]);
    }

    // === TRANSPORTER ===
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'name' => 'required|string',
            'phone' => 'required|string|unique:transporters,phone',
            'national_id' => 'required|string|unique:transporters,national_id',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $transporter = Transporter::create([
            'first_name' => $request->first_name,
            'name' => $request->name,
            'phone' => $request->phone,
            'national_id' => strtoupper($request->national_id),
            'password' => Hash::make($request->password),
            'status' => 'pending',
        ]);
        return response()->json(['message' => 'Transporter registered, awaiting verification'], 201);
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

    public function transporterRegister(Request $request) { return $this->register($request); }
    public function transporterLogin(Request $request) { return $this->login($request); }
}