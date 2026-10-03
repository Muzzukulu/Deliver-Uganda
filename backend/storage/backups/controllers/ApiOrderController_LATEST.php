<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
  public function index() { 
      return Order::latest()->get(); 
  }
  
  public function store(Request $request) {
    $request->validate([
      'pickup' => 'required_without:pickup_address',
      'dropoff' => 'required_without:dropoff_address',
    ]);

    $this->backupSelf();

    $usdToUgx = $request->exchange_rate ?? $request->rate_used ?? 3850; 
    $commissionRate = 70;
    $baseFeeUsd = $request->delivery_fee_usd ?? $request->price_usd ?? 6.50;
    
    $transporterCommissionUsd = round($baseFeeUsd * ($commissionRate / 100), 2);
    $platformProfitUsd = round($baseFeeUsd - $transporterCommissionUsd, 2);
    
    $baseFeeUgx = round($baseFeeUsd * $usdToUgx);
    $transporterCommissionUgx = round($transporterCommissionUsd * $usdToUgx);
    $platformFeeUgx = round($platformProfitUsd * $usdToUgx);

    $lastId = Order::max('id') + 1;
    $year = date('y');
    $month = date('n');
    $seq = str_pad($lastId, 4, '0', STR_PAD_LEFT);
    $ptn = 'DU' . $year . '-' . $seq . '-Q' . $month;

    $order = Order::create([
      'parcel_tracker_number' => $ptn,
      'payment_reference' => $ptn,
      'mtn_reference' => $ptn,
      'airtel_reference' => $ptn,
      'order_year_code' => 'DU' . $year,
      'order_month' => $month,
      // === FIXED: client_id now works with Sanctum ===
      'client_id' => $request->user()?->id ?? $request->client_id ?? null,
      'pickup_address' => $request->pickup_address ?? $request->pickup ?? 'Restaurant',
      'pickup_lat' => $request->pickup_lat ?? 0.3476,
      'pickup_lng' => $request->pickup_lng ?? 32.5825,
      'dropoff_address' => $request->dropoff_address ?? $request->dropoff ?? $request->address,
      'dropoff_lat' => $request->dropoff_lat ?? 0.3300,
      'dropoff_lng' => $request->dropoff_lng ?? 32.5900,
      'package_description' => $request->package_description ?? $request->item ?? $request->dropoff ?? 'Food Delivery',
      'price' => $baseFeeUgx,
      'delivery_fee' => $baseFeeUgx,
      'transporter_payout' => $transporterCommissionUgx,
      'platform_fee' => $platformFeeUgx,
      'price_ugx' => $baseFeeUgx,
      'price_usd' => $baseFeeUsd,
      'rate_used' => $usdToUgx,
      'exchange_rate' => $usdToUgx,
      'distance_km' => $request->distance_km ?? 5.2,
      'delivery_fee_usd' => $baseFeeUsd,
      'transporter_commission_usd' => $transporterCommissionUsd,
      'platform_profit_usd' => $platformProfitUsd,
      'commission_rate' => $commissionRate,
      'status' => 'pending',
      'payment_status' => 'pending',
    ]);

    $smsMessage = "Your parcel {$ptn} created! Pay {$baseFeeUgx} UGX via MTN *165# or Airtel *185#. Use Reference: {$ptn} to track and confirm payment. Track: deliveruganda.com/track/{$ptn}";
    Log::info("API SMS: {$smsMessage}");

    return response()->json([
        'message' => 'Order created - '.$ptn.' | Ref: '.$ptn.' for ALL networks!',
        'payment_reference' => $ptn,
        'track_url' => 'deliveruganda.com/track/'.$ptn,
        'sms_preview' => $smsMessage,
        'order' => $order
    ], 201);
  }

  public function accept(Request $request, $id) {
      $order = Order::where('id',$id)->orWhere('parcel_tracker_number',$id)->firstOrFail();
      $order->update([
          'status' => 'accepted',
          'transporter_id' => $request->user()?->id ?? $request->transporter_id ?? null,
      ]);
      return response()->json(['message' => 'Order accepted '.$order->parcel_tracker_number, 'order' => $order]);
  }

  public function markDelivered(Request $request, $id) {
      $order = Order::where('id',$id)->orWhere('parcel_tracker_number',$id)->firstOrFail();
      $order->update(['status' => 'delivered']);
      return response()->json(['message' => 'Order delivered', 'order' => $order]);
  }

  public function transporterOrders(Request $request) {
      $tid = $request->user()?->id;
      if($tid){
          $orders = Order::where('transporter_id', $tid)->latest()->get();
          if($orders->isEmpty()){
              $orders = Order::where('status','pending')->latest()->get();
          }
          return response()->json($orders);
      }
      return response()->json(Order::where('status','pending')->latest()->get());
  }

  public function track($tracker) {
      $order = Order::where('parcel_tracker_number', $tracker)
                    ->orWhere('id', $tracker)
                    ->firstOrFail();
      return response()->json($order);
  }

  public function updateLocation(Request $request, $id) {
      $order = Order::where('id', $id)
                    ->orWhere('parcel_tracker_number', $id)
                    ->firstOrFail();
      $order->update([
          'current_lat' => $request->lat,
          'current_lng' => $request->lng,
          'status' => 'in_transit'
      ]);
      return response()->json(['message'=>'Location updated - Boda is moving!','order'=>$order]);
  }

  public function update(Request $request, $id) {
    $order = Order::findOrFail($id);
    $order->update($request->all());
    return response()->json($order);
  }
  
  public function destroy($id) {
    Order::findOrFail($id)->delete();
    return response()->json(['message'=>'Deleted']);
  }

  private function backupSelf() {
      try {
          $currentFile = __FILE__;
          $backupDir = storage_path('backups/controllers');
          if (!File::exists($backupDir)) {
              File::makeDirectory($backupDir, 0755, true);
          }
          $date = date('Y-m-d');
          File::copy($currentFile, $backupDir . '/ApiOrderController_' . $date . '.php');
          File::copy($currentFile, $backupDir . '/ApiOrderController_LATEST.php');
          Log::info("API BACKUP OK");
      } catch (\Exception $e) {
          Log::error("API BACKUP FAILED: " . $e->getMessage());
      }
  }
}