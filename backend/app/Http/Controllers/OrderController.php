<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Order;

class OrderController extends Controller
{
  public function index() { 
    return Order::latest()->get(); 
  }

  public function store(Request $request) {
    $usdToUgx = $request->exchange_rate ?? 3850; 
    $commissionRate = 70;
    $baseFeeUsd = $request->delivery_fee_usd ?? $request->price_usd ?? 6.50;
    
    $driverCommissionUsd = round($baseFeeUsd * ($commissionRate / 100), 2);
    $platformProfitUsd = round($baseFeeUsd - $driverCommissionUsd, 2);
    
    $baseFeeUgx = round($baseFeeUsd * $usdToUgx);
    $driverCommissionUgx = round($driverCommissionUsd * $usdToUgx);
    $platformFeeUgx = round($platformProfitUsd * $usdToUgx);

    // AUTO-GENERATOR FOR PTN - NO MORE TINKER!
    $lastId = Order::max('id') + 1;
    $ptn = 'DUG-' . str_pad($lastId, 7, '0', STR_PAD_LEFT);

    $order = Order::create([
      'parcel_tracker_number' => $ptn,
      'client_id' => $request->client_id,
      'driver_id' => $request->driver_id,
      'pickup_address' => $request->pickup_address ?? $request->pickup ?? 'Nakawa',
      'pickup_lat' => $request->pickup_lat ?? 0.3476,
      'pickup_lng' => $request->pickup_lng ?? 32.5825,
      'dropoff_address' => $request->dropoff_address ?? $request->dropoff ?? $request->address ?? 'Kololo',
      'dropoff_lat' => $request->dropoff_lat ?? 0.3300,
      'dropoff_lng' => $request->dropoff_lng ?? 32.5900,
      'package_description' => $request->package_description ?? $request->item ?? 'Food Delivery',
      
      'price' => $baseFeeUgx,
      'delivery_fee' => $baseFeeUgx,
      'rider_payout' => $driverCommissionUgx,
      'platform_fee' => $platformFeeUgx,
      
      'price_usd' => $baseFeeUsd,
      'price_ugx' => $baseFeeUgx,
      'rate_used' => $usdToUgx,
      'exchange_rate' => $usdToUgx,
      'distance_km' => $request->distance_km ?? 5.2,
      'delivery_fee_usd' => $baseFeeUsd,
      'driver_commission_usd' => $driverCommissionUsd,
      'platform_profit_usd' => $platformProfitUsd,
      'commission_rate' => $commissionRate,
      'status' => 'pending',
      'payment_status' => 'pending',
    ]);

    return response()->json([
      'message' => 'Order created with USD engine',
      'order' => $order
    ], 201);
  }

  public function update(Request $request, $id) { 
    $o=Order::findOrFail($id); 
    $o->update($request->all()); 
    return $o; 
  }
  
  public function destroy($id) { 
    Order::findOrFail($id)->delete(); 
    return response()->json(['message'=>'Deleted']); 
  }

  // PUBLIC TRACKING PAGE - NO LOGIN NEEDED
  public function track($ptn) {
    $order = Order::where('parcel_tracker_number', $ptn)->firstOrFail();
    return view('track', compact('order'));
  }

  // PDF RECEIPT DOWNLOAD
  public function receipt($ptn) {
    $order = Order::where('parcel_tracker_number', $ptn)->firstOrFail();
    $pdf = Pdf::loadView('receipt', compact('order'));
    return $pdf->download("Receipt-{$ptn}.pdf");
  }
}