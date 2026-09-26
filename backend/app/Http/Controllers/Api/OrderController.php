<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
class OrderController extends Controller
{
  public function index() { return Order::latest()->get(); }
  public function store(Request $request) {
    $order = Order::create([
      'customer_name' => $request->customer_name ?? 'Guest',
      'phone' => $request->customer_phone ?? $request->phone ?? '0700000000',
      'pickup' => $request->pickup_address ?? $request->pickup ?? 'Restaurant',
      'dropoff' => $request->dropoff_address ?? $request->dropoff ?? $request->address,
      'price' => $request->price ?? $request->total,
      'item' => $request->dropoff_address ?? $request->dropoff ?? 'Food Delivery',
      'status' => 'pending',
      'total' => $request->price ?? 0,
      'address' => $request->dropoff_address ?? $request->address,
      'exchange_rate' => $request->exchange_rate,
      'distance_km' => $request->distance_km,
      'delivery_fee' => $request->delivery_fee,
      'rider_payout' => $request->rider_payout,
      'platform_fee' => $request->platform_fee,
    ]);
    return response()->json($order, 201);
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
