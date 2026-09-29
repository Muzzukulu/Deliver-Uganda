<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Order extends Model
{
    protected $fillable = [
        'client_id',
        'transporter_id',
        'parcel_tracker_number',
        'pickup_address',
        'dropoff_address',
        'package_description',
        'delivery_fee',
        'delivery_fee_usd',
        'price_ugx',
        'price_usd',
        'status',
        'payment_status',
        'payment_method',
        'voice_note_path',
    ];

    // --- AUTO GENERATE TRACKING NUMBER LIKE DU-4829-XY ---
    protected static function booted()
    {
        static::creating(function ($order) {
            if (empty($order->parcel_tracker_number)) {
                $order->parcel_tracker_number = self::generateTrackingNumber();
            }
            if (empty($order->status)) $order->status = 'pending';
            if (empty($order->payment_status)) $order->payment_status = 'pending';
        });
    }

    public static function generateTrackingNumber(): string
    {
        do {
            // DU-4829-XY => 4 digits + 2 letters
            $numbers = random_int(1000, 9999);
            $letters = strtoupper(Str::random(2)); // only letters, no 0/O confusion
            $code = "DU-{$numbers}-{$letters}";
        } while (self::where('parcel_tracker_number', $code)->exists());

        return $code;
    }

    // Relationships - 100% Transporter
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function transporter()
    {
        return $this->belongsTo(Transporter::class);
    }

    public function getStatusLabelAttribute()
    {
        return strtoupper(str_replace('_', ' ', $this->status));
    }
}