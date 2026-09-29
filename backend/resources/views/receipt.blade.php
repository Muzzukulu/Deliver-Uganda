<!DOCTYPE html>
<html>
<head>
<style>
 body{font-family:Helvetica; padding:20px; color:#111}
 .header{background:#FFCC00; padding:15px 20px; display:flex; justify-content:space-between; align-items:center}
 .ptn{font-size:32px; font-weight:900; margin:20px 0; letter-spacing:2px}
 .line{border-top:2px dashed #000; margin:15px 0}
 .label{font-weight:bold; color:#555; font-size:12px; text-transform:uppercase}
 .amount{font-size:28px; font-weight:900}
 .grid{display:flex; justify-content:space-between; gap:20px}
 .box{flex:1; border:1px solid #eee; padding:10px; border-radius:8px}
</style>
</head>
<body>
  <div class="header">
    <h2>DELIVER UGANDA</h2>
    <span>Reliable • Fast • Nationwide</span>
  </div>

  <h1 style="text-align:center">DELIVERY RECEIPT</h1>
  <div class="ptn">TRACKING # {{ $order->parcel_tracker_number }}</div>
  
  <div class="line"></div>
  <p><span class="label">STATUS:</span> {{ strtoupper($order->status) }}</p>
  <p><span class="label">DATE:</span> {{ $order->created_at->format('d M Y - h:i A') }}</p>
  @if($order->transporter)
  <p><span class="label">TRANSPORTER:</span> {{ $order->transporter->first_name }} {{ $order->transporter->name }} - {{ $order->transporter->phone }}</p>
  @endif

  <div class="line"></div>
  <p><span class="label">FROM:</span><br>{{ $order->pickup_address }}</p>
  <p><span class="label">TO:</span><br>{{ $order->dropoff_address }}</p>
  
  <div class="line"></div>
  <div class="grid">
    <div class="box">
      <p class="label">PACKAGE</p>
      <p>{{ $order->package_description }}</p>
      <p class="label" style="margin-top:10px">DISTANCE</p>
      <p>{{ $order->distance_km ?? 'N/A' }} KM</p>
    </div>
    <div class="box">
      <p class="label">PAYMENT BREAKDOWN</p>
      <p>Delivery Fee: UGX {{ number_format($order->delivery_fee ?? $order->price_ugx, 0) }}</p>
      <p style="font-size:12px; color:#777">USD: ${{ number_format($order->delivery_fee_usd ?? $order->price_usd, 2) }} @ {{ $order->exchange_rate ?? $order->rate_used }}</p>
      <p class="label" style="margin-top:10px">PAYMENT STATUS</p>
      <p>{{ strtoupper($order->payment_status) }}</p>
    </div>
  </div>

  <div class="line"></div>
  <p><span class="label">TOTAL AMOUNT:</span> <span class="amount">UGX {{ number_format($order->delivery_fee ?? $order->price_ugx ?? $order->price, 0) }}</span></p>

  <div class="line"></div>
  <p>Track at: <b>track.deliveruganda.com/{{ $order->parcel_tracker_number }}</b></p>
  <p style="text-align:center; margin-top:30px; font-size:12px; color:#999">Thank you for choosing Deliver Uganda! | USD is source of truth</p>
</body>
</html>