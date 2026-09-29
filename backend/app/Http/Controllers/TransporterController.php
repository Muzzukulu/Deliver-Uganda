<?php

namespace App\Http\Controllers;

use App\Models\Transporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TransporterController extends Controller
{
    public function register(Request $request)
    {
        // 1. STRICT VALIDATION - NIN MANDATORY 14 chars
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'phone' => 'required|string|unique:transporters,phone|regex:/^256[0-9]{9}$/',
            'password' => 'required|string|min:6|confirmed',
            'national_id' => ['required','string','size:14','unique:transporters,national_id','regex:/^[A-Z]{2}[0-9]{8}[A-Z0-9]{4}$/i'],
            'driving_permit' => 'nullable|string|max:50',
        ], [
            'national_id.required' => 'Valid National ID (NIN) is mandatory - 14 chars',
            'national_id.size' => 'NIN must be exactly 14 characters',
            'national_id.regex' => 'NIN format invalid (e.g., CM12345678ABCD)',
            'phone.regex' => 'Phone must be in 2567XXXXXXXX format'
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

        return response()->json([
            'success' => true,
            'message' => 'Account created, proceed to Pro payment',
            'transporterId' => $transporter->id,
            'transporter' => $transporter
        ], 201);
    }

    // 2. MTN MoMo Pro 250k - Initiate Payment
    public function initiateProPayment(Request $request)
    {
        $request->validate([
            'transporterId' => 'required|exists:transporters,id',
            'phone' => 'required|string'
        ]);

        $transporter = Transporter::findOrFail($request->transporterId);

        $externalId = (string) Str::uuid();
        $momoPayload = [
            'amount' => '250000',
            'currency' => 'UGX',
            'externalId' => $externalId,
            'payer' => [
                'partyIdType' => 'MSISDN',
                'partyId' => $request->phone
            ],
            'payerMessage' => 'Deliver Uganda Pro Package',
            'payeeNote' => 'Pro transporter Activation - ID '.$transporter->id
        ];

        return response()->json([
            'success' => true,
            'message' => 'MoMo prompt sent to '.$request->phone.' Dial *165# to approve 250k',
            'momoPayload' => $momoPayload,
            'payUrl' => '/pay-pro?transporterId='.$transporter->id.'&tx='.$externalId
        ]);
    }

    // 3. Webhook - MTN will call this after payment
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