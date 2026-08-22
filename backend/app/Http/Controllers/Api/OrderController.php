<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index() { return Order::latest()->get(); }
    
    public function show($id) { return Order::findOrFail($id); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pickup_address' => 'required',
            'delivery_address' => 'required',
            'package_details' => 'nullable',
        ]);
        $data['user_id'] = Auth::id();
        $data['status'] = 'pending';
        $order = Order::create($data);
        return response()->json($order, 201);
    }

    public function accept($id)
    {
        $order = Order::findOrFail($id);
        $order->update(['driver_id' => Auth::id(), 'status' => 'accepted']);
        return $order;
    }

    public function markDelivered($id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => 'delivered']);
        return $order;
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->update($request->validate(['status' => 'required']));
        return $order;
    }
}