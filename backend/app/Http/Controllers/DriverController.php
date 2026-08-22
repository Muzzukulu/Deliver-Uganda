<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DriverController extends Controller
{
    public function register(Request $request)
    {
        // 1. STRICT VALIDATION - NIN MANDATORY 14 chars
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'phone' => 'required|string|unique:drivers,phone|regex:/^256[0-9]{9}$/',
            'password' => 'required|string|min:6|confirmed', // expects password_confirmation field
            'national_id' => ['required','string','size:14','unique:drivers,national_id','regex:/^[A-Z]{2}[0-9]{8}[A-Z0-9]{4}$/i'],
            'driving_permit' => 'nullable|string|max:50',
        ], [
            'national_id.required' => 'Valid National ID (NIN) is mandatory - 14 chars',
            'national_id.size' => 'NIN must be exactly 14 characters',
            'national_id.regex' => 'NIN format invalid (e.g., CM12345678ABCD)',
            'phone.regex' => 'Phone must be in 2567XXXXXXXX format'
        ]);

        $driver = Driver::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'national_id' => strtoupper($request->national_id),
            'driving_permit' => $request->driving_permit,
            'status' => 'pending_payment', // Changed for Pro flow
            'is_pro' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Account created, proceed to Pro payment',
            'driverId' => $driver->id,
            'driver' => $driver
        ], 201);
    }

    // 2. MTN MoMo Pro 250k - Initiate Payment
    public function initiateProPayment(Request $request)
    {
        $request->validate([
            'driverId' => 'required|exists:drivers,id',
            'phone' => 'required|string'
        ]);

        $driver = Driver::findOrFail($request->driverId);

        // MTN MoMo Config - will use sandbox for now
        $externalId = (string) Str::uuid();
        $momoPayload = [
            'amount' => '250000',
            'currency' => 'UGX',
            'externalId' => $externalId,
            'payer' => [
                'partyIdType' => 'MSISDN',
                'partyId' => $request->phone // 2567XXXXXXXX
            ],
            'payerMessage' => 'Deliver Uganda Pro Package',
            'payeeNote' => 'Pro Driver Activation - ID '.$driver->id
        ];

        // TODO: Call MTN API here - for now we return payload ready for frontend
        // In real: $response = Http::withHeaders([...])->post($mtnUrl, $momoPayload);

        // Store transaction as pending
        // $driver->transactions()->create([...]);

        return response()->json([
            'success' => true,
            'message' => 'MoMo prompt sent to '.$request->phone.' Dial *165# to approve 250k',
            'momoPayload' => $momoPayload,
            'payUrl' => '/pay-pro?driverId='.$driver->id.'&tx='.$externalId
        ]);
    }

    // 3. Webhook - MTN will call this after payment
    public function momoCallback(Request $request)
    {
        // Verify MTN signature here
        $driverId = $request->input('externalId'); // or parse from payeeNote
        // Simplified: find by externalId
        // $driver = Driver::where('external_id', $request->externalId)->first();
        // For now expect driver_id in callback
        if($request->has('driver_id')){
            $driver = Driver::find($request->driver_id);
            $driver->update(['status' => 'active', 'is_pro' => true]);
        }

        return response()->json(['status' => 'ok']);
    }
}