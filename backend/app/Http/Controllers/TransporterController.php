<?php
namespace App\Http\Controllers;

use App\Models\Transporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TransporterController extends Controller
{
    // SHOW FORMS
    public function showRegister(){
        return view('transporter.auth.register');
    }
    
    public function showLogin(){
        return view('transporter.auth.login');
    }
    
    public function showPending(){
        return view('transporter.pending');
    }

    public function dashboard(){
        return view('transporter.dashboard');
    }

    // REGISTER WEB
    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'phone' => 'required|string|unique:transporters,phone|regex:/^256[0-9]{9}$/',
            'password' => 'required|string|min:6|confirmed',
            'national_id' => ['required','string','size:14','unique:transporters,national_id','regex:/^[A-Z]{2}[0-9]{8}[A-Z0-9]{4}$/i'],
            'driving_permit' => 'nullable|string|max:50',
        ]);

        $transporter = Transporter::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'national_id' => strtoupper($request->national_id),
            'driving_permit' => $request->driving_permit,
            'status' => 'pending_payment',
            'is_pro' => false,
        ]);

        // Auto login transporter WEB
        Auth::guard('transporter')->login($transporter);
        
        // Redirect to Pro payment page
        return redirect()->route('transporter.pro.pay', ['transporterId' => $transporter->id]);
    }

    // LOGIN WEB
    public function login(Request $request){
        $request->validate(['phone'=>'required','password'=>'required']);
        
        if(Auth::guard('transporter')->attempt(['phone'=>$request->phone,'password'=>$request->password])){
            $request->session()->regenerate();
            $t = Auth::guard('transporter')->user();
            if($t->status !== 'active'){
                return redirect()->route('transporter.pending');
            }
            return redirect()->route('transporter.dashboard');
        }
        return back()->withErrors(['phone'=>'Invalid credentials']);
    }

    public function logout(Request $request){
        Auth::guard('transporter')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/transporter/login');
    }

    // MTN MoMo methods KEEP but make them WEB views
    public function initiateProPayment(Request $request)
    {
        $request->validate([
            'transporterId' => 'required|exists:transporters,id',
            'phone' => 'required|string'
        ]);

        $transporter = Transporter::findOrFail($request->transporterId);
        $externalId = (string) Str::uuid();

        // Show pay view, not JSON
        return view('transporter.pro-pay', [
            'transporter' => $transporter,
            'phone' => $request->phone,
            'tx' => $externalId,
            'amount' => 250000
        ]);
    }

    public function momoCallback(Request $request)
    {
        if($request->has('transporter_id')){
            $transporter = Transporter::find($request->transporter_id);
            if($transporter){
                $transporter->update(['status' => 'active', 'is_pro' => true]);
            }
        }
        return response()->json(['status' => 'ok']);
    }
}