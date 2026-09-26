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
  ];
}