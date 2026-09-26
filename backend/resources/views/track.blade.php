<!DOCTYPE html>
<html>
<head>
<title>Track {{ $order->parcel_tracker_number }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:system-ui;background:#f8fafc;margin:0;padding:20px}
.card{max-width:480px;margin:40px auto;background:#fff;padding:28px;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,.08)}
.top{display:flex;justify-content:space-between;align-items:center}
.badge{background:#10b981;color:#fff;padding:6px 14px;border-radius:999px;font-weight:700;font-size:12px}
.line{height:4px;background:#e5e7eb;border-radius:99px;margin:18px 0}
.line-fill{height:100%;width:75%;background:#111;border-radius:99px}
.btn{display:block;text-align:center;background:#111;color:#fff;padding:14px;border-radius:12px;text-decoration:none;margin-top:20px;font-weight:700}
small{color:#6b7280}
</style>
</head>
<body>
<div class="card">
<div class="top"><h2 style="margin:0">📦 {{ $order->parcel_tracker_number }}</h2><span class="badge">{{ $order->status }}</span></div>
<div class="line"><div class="line-fill"></div></div>
<p><small>FROM</small><br><strong>{{ $order->pickup_address }}</strong></p>
<p><small>TO</small><br><strong>{{ $order->dropoff_address }}</strong></p>
<p><small>PACKAGE</small><br>{{ $order->package_description }} — UGX {{ number_format($order->price_ugx ?? $order->price) }}</p>
<a class="btn" href="/receipt/{{ $order->parcel_tracker_number }}">Download Receipt PDF</a>
<p style="text-align:center;margin-top:16px"><small>Deliver Uganda • Fast & Secure Delivery</small></p>
</div>
</body>
</html>