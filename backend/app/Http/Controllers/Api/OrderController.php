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
      'client_id' => $request->client_id ?? null,
      'pickup_address' => $request->pickup_address ?? $request->pickup ?? 'Restaurant',
      'dropoff_address' => $request->dropoff_address ?? $request->dropoff ?? $request->address,
      'package_description' => $request->package_description ?? $request->item ?? $request->dropoff ?? 'Food Delivery',
      'delivery_fee' => $request->delivery_fee ?? $request->price ?? 0,
      'price_ugx' => $request->price_ugx ?? $request->total ?? 0,
      'price_usd' => $request->price_usd ?? 0,
      'status' => 'pending',
      'payment_status' => 'pending',
    ]);

    return response()->json($order, 201);
  }

  public function accept(Request $request, $id) {
      $order = Order::findOrFail($id);
      $order->update([
          'status' => 'accepted',
          'transporter_id' => $request->user()?->id ?? $request->transporter_id ?? null,
      ]);
      return response()->json(['message' => 'Order accepted', 'order' => $order]);
  }

  public function markDelivered(Request $request, $id) {
      $order = Order::findOrFail($id);
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
}