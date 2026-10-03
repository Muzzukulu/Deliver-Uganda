<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Transporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class TransporterAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $transporter = Transporter::where('email', $request->email)->first();

        if (!$transporter || !Hash::check($request->password, $transporter->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if ($transporter->status !== 'active') {
            return response()->json(['message' => 'Account not active, status: ' . $transporter->status], 403);
        }

        $token = $transporter->createToken('transporter-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'transporter' => $transporter
        ]);
    }
}