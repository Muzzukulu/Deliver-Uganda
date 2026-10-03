<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function showLogin() { return view('auth.login'); }
    public function showClientRegister() { return view('client.register'); }
    public function clientRegister(Request $request) { return response()->json(['ok'=>true]); }
    public function showClientLogin() { return view('client.login'); }
    public function showTransporterRegister() { return view('transporter.register'); }
    public function registerTransporter(Request $request) { return response()->json(['ok'=>true]); }
    public function showTransporterLogin() { return view('transporter.login'); }
    public function showAdminLogin() { return view('admin.login'); }
    public function login(Request $request) { return redirect('/admin/dashboard'); }
    public function logout(Request $request) { auth()->logout(); return redirect('/login'); }
}