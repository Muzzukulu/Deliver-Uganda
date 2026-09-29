<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

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

    $order = Order::create([
      'customer_name' => $request->customer_name ?? 'Guest',
      'phone' => $request->customer_phone ?? $request->phone ?? '0700000000',
      'pickup' => $request->pickup_address ?? $request->pickup ?? 'Restaurant',
      'dropoff' => $request->dropoff_address ?? $request->dropoff ?? $request->address,
      'price' => $request->price ?? $request->total,
      'item' => $request->item ?? $request->dropoff_address ?? $request->dropoff ?? 'Food Delivery',
      'status' => 'pending',
      'total' => $request->price ?? $request->total ?? 0,
      'address' => $request->dropoff_address ?? $request->address,
      'exchange_rate' => $request->exchange_rate,
      'distance_km' => $request->distance_km,
      'delivery_fee' => $request->delivery_fee,
      'transporter_payout' => $request->transporter_payout,
      'platform_fee' => $request->platform_fee,
    ]);
    return response()->json($order, 201);
  }

  // Transporter accepts order
  public function accept(Request $request, $id) {
      $order = Order::findOrFail($id);
      $order->update([
          'status' => 'accepted',
          'transporter_id' => $request->user()->id ?? $request->transporter_id,
      ]);
      return response()->json(['message' => 'Order accepted by transporter', 'order' => $order]);
  }

  // Transporter marks delivered
  public function markDelivered(Request $request, $id) {
      $order = Order::findOrFail($id);
      $order->update(['status' => 'delivered']);
      return response()->json(['message' => 'Order delivered', 'order' => $order]);
  }

  public function update(Request $request, $id) {
    $order = Order::findOrFail($id);
    $order->update($request->all());
    return $order;
  }
  
  public function destroy($id) {
    Order::findOrFail($id)->delete();
    return response()->json(['message'=>'Deleted']);
  }
}