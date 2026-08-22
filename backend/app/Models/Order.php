<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name',
        'customer_phone',
        'pickup_location',
        'delivery_location',
        'package_description',
        'status',
        'price'
    ];
}