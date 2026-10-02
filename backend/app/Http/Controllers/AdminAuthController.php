<?php
namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $request){
        $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        $admin = Admin::where('email',$request->email)->first();
        
        if(!$admin || !Hash::check($request->password,$admin->password)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;
        
        return response()->json([
            'message'=>'Admin logged in',
            'token'=>$token,
            'admin'=>$admin
        ]);
    }

    // Approve transporter
    public function approveTransporter($id){
        $transporter = \App\Models\Transporter::findOrFail($id);
        $transporter->update(['status'=>'approved']);
        return response()->json(['message'=>'Transporter approved','transporter'=>$transporter]);
    }

    // List pending transporters
    public function pendingTransporters(){
        return \App\Models\Transporter::where('status','pending')->get();
    }
}