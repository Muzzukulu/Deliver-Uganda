<!DOCTYPE html>
<html>
<head>
<title>Capture Parcel Number - Deliver Uganda</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:system-ui;background:#f8f5ff;margin:0;padding:20px}
.card{max-width:420px;margin:80px auto;background:#fff;padding:30px;border-radius:20px;box-shadow:0 20px 40px rgba(111,66,193,.15)}
h2{margin:0 0 6px 0;color:#6f42c1}
input{width:100%;padding:16px;border:2px solid #e9e5f5;border-radius:12px;font-size:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;box-sizing:border-box}
input:focus{outline:none;border-color:#6f42c1}
.btn{width:100%;background:#6f42c1;color:#fff;border:none;padding:16px;border-radius:12px;font-weight:800;font-size:15px;margin-top:14px;cursor:pointer}
small{color:#999}
.logo{background:#6f42c1;color:#fff;display:inline-block;padding:6px 12px;border-radius:99px;font-weight:900;font-size:12px;letter-spacing:1px;margin-bottom:12px}
</style>
</head>
<body>
<div class="card">
<div class="logo">📦 DELIVER UGANDA</div>
<h2>Capture Receipt</h2>
<p><small>Enter Parcel Tracker Number once — download instantly</small></p>

<form method="POST" action="/receipt/find">
@csrf
<input name="parcel_tracker_number" placeholder="e.g. DU-4829-XY" required autofocus>
<button class="btn">🔍 FIND & DOWNLOAD RECEIPT</button>
</form>

<p style="text-align:center;margin-top:16px"><small>Example: DU-4829-XY • Staff only • 100% Transporter</small></p>
</div>
</body>
</html>