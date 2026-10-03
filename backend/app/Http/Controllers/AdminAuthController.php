<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Transporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    // POST /api/admin/login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Needs HasApiTokens on Admin model
        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Admin login successful',
            'admin' => $admin,
            'token' => $token
        ]);
    }

    // GET /api/admin/transporter/pending
    public function pendingTransporters()
    {
        return Transporter::where('status', 'pending')->get();
    }

    // POST /api/admin/transporter/{id}/approve
    public function approveTransporter($id)
    {
        $transporter = Transporter::findOrFail($id);
        $transporter->update(['status' => 'approved', 'is_pro' => true]);
        return response()->json(['message' => 'Approved', 'transporter' => $transporter]);
    }
}