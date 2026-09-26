<!DOCTYPE html>
<html>
<head>
<style>
 body{font-family:Helvetica; padding:20px; color:#111}
 .header{background:#FFCC00; padding:15px 20px; display:flex; justify-content:space-between}
 .ptn{font-size:32px; font-weight:900; margin:20px 0}
 .line{border-top:2px dashed #000; margin:15px 0}
 .label{font-weight:bold}
 .amount{font-size:28px; font-weight:900}
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

  <div class="line"></div>
  <p><span class="label">FROM:</span><br>{{ $order->pickup_address }}</p>
  <p><span class="label">TO:</span><br>{{ $order->dropoff_address }}</p>
  
  <div class="line"></div>
  <p><span class="label">PACKAGE:</span> {{ $order->package_description }}</p>
  <p><span class="label">AMOUNT:</span> <span class="amount">UGX {{ number_format($order->price_ugx ?? $order->price, 0) }}</span></p>

  <div class="line"></div>
  <p>Track at: <b>track.deliveruganda.com/{{ $order->parcel_tracker_number }}</b></p>
  <p style="text-align:center; margin-top:30px">Thank you for choosing Deliver Uganda!</p>
</body>
</html>