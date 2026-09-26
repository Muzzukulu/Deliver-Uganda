<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  protected $fillable = [
    'client_id',
    'driver_id',
    'pickup_address',
    'pickup_lat',
    'pickup_lng',
    'dropoff_address',
    'dropoff_lat',
    'dropoff_lng',
    'package_description',
    'price',
    'price_usd',
    'price_ugx',
    'rate_used',
    'exchange_rate',
    'distance_km',
    'delivery_fee',
    'delivery_fee_usd',
    'rider_payout',
    'driver_commission_usd',
    'platform_fee',
    'platform_profit_usd',
    'commission_rate',
    'status',
    'payment_status',
    'parcel_tracker_number', // <-- ADDED
  ];

  protected static function boot()
  {
      parent::boot();

      static::creating(function ($order) {
          // Don't overwrite if already set manually
          if (empty($order->parcel_tracker_number)) {
              
              // Get last number from DB for safety
              $lastOrder = self::orderBy('id', 'desc')->first();
              
              if ($lastOrder && preg_match('/DUG-(\d+)/', $lastOrder->parcel_tracker_number, $matches)) {
                  $lastNumber = intval($matches[1]);
              } else {
                  $lastNumber = self::count();
              }

              $nextNumber = $lastNumber + 1;
              $order->parcel_tracker_number = 'DUG-' . str_pad($nextNumber, 7, '0', STR_PAD_LEFT);
              // Result: DUG-0000001, DUG-0000002...
          }
      });
  }
}