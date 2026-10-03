<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Transporter;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientAuthController extends Controller
{
    // ==================== SHOW FORMS ====================
    public function showClientRegister(){
        return view('auth.client-register');
    }

    public function showTransporterRegister(){
        return view('transporter.register');
    }

    public function showLogin(){
        return view('auth.login');
    }

    // ==================== REGISTER LOGIC ====================
    public function clientRegister(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'phone'=>'required|string|unique:clients,phone',
            'password'=>'required|min:6|confirmed',
        ]);

        $client = Client::create([
            'name'=>$request->name,
            'phone'=>$request->phone,
            'password'=>Hash::make($request->password),
        ]);

        Auth::guard('client')->login($client);
        return redirect()->route('client.dashboard');
    }

    public function registerTransporter(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'name' => 'required|string', // last name
            'phone' => 'required|string|unique:transporters,phone',
            'national_id' => 'required|string|unique:transporters,national_id',
            'password' => 'required|confirmed|min:6',
        ]);

        Transporter::create([
            'first_name' => $request->first_name,
            'last_name' => $request->name,
            'phone' => $request->phone,
            'national_id' => $request->national_id,
            'driving_permit' => $request->driving_permit,
            'password' => Hash::make($request->password),
            'status' => 'pending',
        ]);

        return redirect()->route('transporter.pending')->with('success', 'Registered! Awaiting admin approval.');
    }

    // ==================== LOGIN LOGIC - MULTI GUARD ====================
    public function login(Request $request){
        $request->validate([
            'phone'=>'required|string',
            'password'=>'required|string',
        ]);

        // 1. Try CLIENT
        if(Auth::guard('client')->attempt(['phone'=>$request->phone,'password'=>$request->password])){
            $request->session()->regenerate();
            return redirect()->route('client.dashboard');
        }

        // 2. Try TRANSPORTER - Your fleet to TZ, Congo, Kenya, Rwanda, South Sudan
        if(Auth::guard('transporter')->attempt(['phone'=>$request->phone,'password'=>$request->password])){
            $request->session()->regenerate();
            $t = Auth::guard('transporter')->user();
            if($t->status === 'pending'){
                return redirect()->route('transporter.pending');
            }
            return redirect()->route('transporter.dashboard');
        }

        // 3. Try ADMIN - can login with email or phone
        if(Auth::guard('admin')->attempt(['phone'=>$request->phone,'password'=>$request->password]) || 
           Auth::guard('admin')->attempt(['email'=>$request->phone,'password'=>$request->password])){
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['phone'=>'Invalid phone or password'])->onlyInput('phone');
    }

    // ==================== LOGOUT ====================
    public function logout(Request $request){
        if(Auth::guard('client')->check()) Auth::guard('client')->logout();
        if(Auth::guard('transporter')->check()) Auth::guard('transporter')->logout();
        if(Auth::guard('admin')->check()) Auth::guard('admin')->logout();
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}