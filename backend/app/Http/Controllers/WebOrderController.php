<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class WebOrderController extends Controller
{
  public function store(Request $request) {
    $request->validate([
      'pickup_address' => 'required',
      'dropoff_address' => 'required',
    ]);

    // === ANTI-CUT BACKUP: Backup self before any operation ===
    $this->backupSelf();

    // === SAME USD ENGINE AS API ===
    $usdToUgx = $request->exchange_rate ?? 3850;
    $commissionRate = 70;
    $baseFeeUsd = $request->delivery_fee_usd ?? $request->price_usd ?? 6.50;
    
    $transporterCommissionUsd = round($baseFeeUsd * ($commissionRate / 100), 2);
    $platformProfitUsd = round($baseFeeUsd - $transporterCommissionUsd, 2);
    
    $baseFeeUgx = round($baseFeeUsd * $usdToUgx);
    $transporterCommissionUgx = round($transporterCommissionUsd * $usdToUgx);
    $platformFeeUgx = round($platformProfitUsd * $usdToUgx);

    // === FINAL DU26 FORMAT - UNIVERSAL REFERENCE ===
    $lastId = Order::max('id') + 1;
    $year = date('y'); // 26 = 2026
    $month = date('n'); // 10 = October
    $seq = str_pad($lastId, 4, '0', STR_PAD_LEFT);
    $ptn = 'DU' . $year . '-' . $seq . '-Q' . $month; // DU26-0001-Q10

    $order = Order::create([
      'parcel_tracker_number' => $ptn,
      'payment_reference' => $ptn, // GOLD: Same for MTN, Airtel, Bank - ALL NETWORKS!
      'mtn_reference' => $ptn,
      'airtel_reference' => $ptn,
      'order_year_code' => 'DU' . $year, // DU26
      'order_month' => $month,            // 10
      'client_id' => auth()->id() ?? $request->client_id ?? null,
      'pickup_address' => $request->pickup_address,
      'pickup_lat' => $request->pickup_lat ?? 0.3476,
      'pickup_lng' => $request->pickup_lng ?? 32.5825,
      'dropoff_address' => $request->dropoff_address,
      'dropoff_lat' => $request->dropoff_lat ?? 0.3300,
      'dropoff_lng' => $request->dropoff_lng ?? 32.5900,
      'package_description' => $request->package_description ?? $request->item ?? 'Food Delivery',
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

    // === UNIVERSAL SMS FOR ALL NETWORKS ===
    $smsMessage = "Your parcel {$ptn} created! Pay {$baseFeeUgx} UGX via MTN *165# or Airtel *185#. Use Reference: {$ptn} to track and confirm payment. Track: deliveruganda.com/track/{$ptn}";
    
    Log::info("SMS TO {$request->phone}: {$smsMessage}");
    // When you get SMS provider, uncomment:
    // Africa's Talking -> send $smsMessage

    return redirect()->route('orders.track', $order->parcel_tracker_number)
                     ->with('success', 'Order created - ' . $ptn . ' | Ref: ' . $ptn . ' for ALL networks!');
  }

  public function track($tracker) {
      $order = Order::where('parcel_tracker_number', $tracker)
                    ->orWhere('id', $tracker)
                    ->firstOrFail();
      return view('orders.track', compact('order'));
  }

  public function index() {
      $orders = Order::latest()->get();
      return view('orders.index', compact('orders'));
  }

  // === SELF-HEALING BACKUP ENGINE - SURVIVES UMEME CUTS ===
  private function backupSelf() {
      try {
          $currentFile = __FILE__;
          $backupDir = storage_path('backups/controllers');
          
          if (!File::exists($backupDir)) {
              File::makeDirectory($backupDir, 0755, true);
          }

          // Daily backup + Latest backup
          $date = date('Y-m-d');
          $dailyBackup = $backupDir . '/WebOrderController_' . $date . '.php';
          $latestBackup = $backupDir . '/WebOrderController_LATEST.php';
          
          if (!File::exists($dailyBackup)) {
              File::copy($currentFile, $dailyBackup);
          }
          File::copy($currentFile, $latestBackup);

          // Keep only last 30 days to save Optiplex 380 disk
          $files = File::files($backupDir);
          if (count($files) > 30) {
              // Clean old
              collect($files)->sortBy(fn($f) => $f->getMTime())->take(count($files)-30)->each(fn($f) => File::delete($f));
          }

          Log::info("BACKUP OK: {$latestBackup}");

      } catch (\Exception $e) {
          Log::error("BACKUP FAILED: " . $e->getMessage());
      }
  }
}