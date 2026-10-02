<!DOCTYPE html>
<html>
<head>
    <title>Transporter Registration - Deliver Uganda</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial; background: #f0f4ff; display:flex; justify-content:center; padding:20px; }
        .card { background: white; padding: 30px; border-radius: 15px; width: 100%; max-width: 450px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .brand { color: #6a0dad; font-size: 26px; font-weight: 900; text-align:center; letter-spacing: 1px; margin-bottom: 5px; }
        .brand span { color: #002366; }
        h2 { color: #0a1931; text-align:center; margin-top:5px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px; }
        .subtitle { text-align:center; color:#666; font-size:14px; margin-bottom:20px; }
        input { width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px; box-sizing:border-box; }
        .btn-blue { width:100%; background: #002366; color: white; padding:14px; border:none; border-radius:8px; font-weight:bold; font-size:16px; cursor:pointer; margin-top:15px; }
        .btn-blue:hover { background: #001a4d; }
        label { font-size:13px; font-weight:bold; color:#333; margin-top:10px; display:block; }
    </style>
</head>
<body>
<div class="card">
    <div class="brand">Deliver Uganda</div>
    
    <h2><span style="font-size:22px;">🚛🏍️</span> Transporter Registration</h2>
    <p class="subtitle">Join Deliver Uganda - Transport to TZ, DRC, Kenya, Rwanda, S. Sudan</p>

    @if($errors->any())
        <div style="background:#ffe0e0; padding:10px; border-radius:8px; color:red; font-size:13px;">
            @foreach($errors->all() as $e) {{ $e }}<br> @endforeach
        </div>
    @endif

    @if(session('success'))
        <div style="background:#d4edda; padding:10px; border-radius:8px; color:green; font-size:13px; margin-bottom:10px;">
            {{ session('success') }}
        </div>
    @endif

    <form method="POST" action="{{ route('transporter.register') }}">
        @csrf
        <label>First Name</label>
        <input type="text" name="first_name" value="{{ old('first_name') }}" required placeholder="John">

        <label>Last Name</label>
        <input type="text" name="name" value="{{ old('name') }}" required placeholder="Mukasa">

        <label>Phone (for login)</label>
        <input type="text" name="phone" value="{{ old('phone') }}" required placeholder="07XXXXXXXX">

        <label>National ID</label>
        <input type="text" name="national_id" value="{{ old('national_id') }}" required placeholder="CMXXXXXXXXXXXX">

        <label>Driving Permit No.</label>
        <input type="text" name="driving_permit" value="{{ old('driving_permit') }}" placeholder="Optional">

        <label>Password</label>
        <input type="password" name="password" required>

        <label>Confirm Password</label>
        <input type="password" name="password_confirmation" required>

        <button type="submit" class="btn-blue">REGISTER AS TRANSPORTER</button>
    </form>

    <p style="text-align:center; margin-top:15px; font-size:13px;">
        Already have account? <a href="/login" style="color:#002366; font-weight:bold;">Login</a>
    </p>
</div>
</body>
</html>