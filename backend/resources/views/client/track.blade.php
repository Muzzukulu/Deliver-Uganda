<!DOCTYPE html>
<html>
<head>
<title>Track {{ $order->parcel_tracker_number }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:system-ui;background:#f8fafc;margin:0;padding:20px}
.card{max-width:480px;margin:40px auto;background:#fff;padding:28px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,.08)}
.top{display:flex;justify-content:space-between;align-items:center}
.badge{background:#10b981;color:#fff;padding:6px 14px;border-radius:999px;font-weight:700;font-size:12px; text-transform:uppercase}
.line{height:6px;background:#e5e7eb;border-radius:99px;margin:18px 0; overflow:hidden}
.line-fill{height:100%;background:#111;border-radius:99px; transition:width 0.5s}
.steps{display:flex;justify-content:space-between;margin:20px 0 10px 0}
.step{font-size:11px;color:#9ca3af;text-align:center; flex:1}
.step.active{color:#111;font-weight:800}
.step.dot::before{content:'';display:block;width:10px;height:10px;background:#e5e7eb;border-radius:50%;margin:0 auto 6px auto}
.step.active.dot::before{background:#111}
.btn{display:block;text-align:center;background:#111;color:#fff;padding:14px;border-radius:12px;text-decoration:none;margin-top:20px;font-weight:700}
small{color:#6b7280; font-size:11px; text-transform:uppercase; letter-spacing:0.5px}
.truck{border:1px dashed #ddd; padding:12px; border-radius:12px; margin:15px 0; background:#fefce8}
</style>
</head>
<body>
<div class="card">
<div class="top"><h2 style="margin:0">📦 {{ $order->parcel_tracker_number }}</h2><span class="badge">{{ str_replace('_',' ',$order->status) }}</span></div>

@php
 $progress = ['pending'=>20,'accepted'=>40,'picked'=>60,'on_the_way'=>85,'delivered'=>100][$order->status] ?? 20;
@endphp
<div class="line"><div class="line-fill" style="width: {{ $progress }}%"></div></div>

<div class="steps">
  <div class="step dot {{ in_array($order->status,['pending','accepted','picked','on_the_way','delivered'])?'active':'' }}">Pending</div>
  <div class="step dot {{ in_array($order->status,['accepted','picked','on_the_way','delivered'])?'active':'' }}">Accepted</div>
  <div class="step dot {{ in_array($order->status,['picked','on_the_way','delivered'])?'active':'' }}">Picked</div>
  <div class="step dot {{ in_array($order->status,['on_the_way','delivered'])?'active':'' }}">On Way</div>
  <div class="step dot {{ $order->status=='delivered'?'active':'' }}">Done</div>
</div>

<p><small>FROM</small><br><strong>{{ $order->pickup_address }}</strong></p>
<p><small>TO</small><br><strong>{{ $order->dropoff_address }}</strong></p>
<p><small>PACKAGE</small><br>{{ $order->package_description }}</p>

@if($order->transporter)
<div class="truck">
  <small>YOUR TRANSPORTER</small><br>
  <strong>🚚 {{ $order->transporter->first_name }} {{ $order->transporter->name }}</strong><br>
  <small>{{ $order->transporter->phone }} • {{ $order->transporter->number_plate ?? 'Bike' }}</small>
</div>
@endif

<p><small>PAYMENT</small><br><strong>UGX {{ number_format($order->delivery_fee ?? $order->price_ugx ?? $order->price, 0) }}</strong> <small>({{ $order->payment_status }})</small></p>

<a class="btn" href="/receipt/{{ $order->parcel_tracker_number }}">Download Receipt PDF</a>
<p style="text-align:center;margin-top:16px"><small>Deliver Uganda • Fast & Secure Delivery • USD ${{ $order->delivery_fee_usd ?? $order->price_usd }}</small></p>
</div>
</body>
</html>