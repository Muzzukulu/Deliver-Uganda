<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transporter Registration - Deliver Uganda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-light">
<div class="container py-4">
  <div class="row justify-content-center">
    <div class="col-md-7 col-lg-6">
      <div class="card shadow-lg border-0 rounded-4 p-4">
        <h1 class="text-center fw-bold display-5" style="color: #6f42c1;">Deliver Uganda</h1>
        <p class="text-center text-muted mb-4 fs-5">Transporter Registration</p>
        
        @if($errors->any())
          <div class="alert alert-danger rounded-3">{{ $errors->first() }}</div>
        @endif

        <form method="POST" action="/transporter/register">
          @csrf
          <div class="row">
            <div class="col-6 mb-3"><input name="first_name" placeholder="First Name" class="form-control form-control-lg rounded-3" required></div>
            <div class="col-6 mb-3"><input name="name" placeholder="Last Name" class="form-control form-control-lg rounded-3" required></div>
          </div>
          <div class="mb-3"><input name="phone" placeholder="Phone" class="form-control form-control-lg rounded-3" required></div>
          <div class="mb-3"><input name="national_id" placeholder="National ID" class="form-control form-control-lg rounded-3" required></div>
          <div class="mb-3"><input name="driving_permit" placeholder="Driving Permit No." class="form-control form-control-lg rounded-3"></div>
          <div class="mb-3"><input name="password" type="password" placeholder="Password" class="form-control form-control-lg rounded-3" required></div>
          <div class="mb-4"><input name="password_confirmation" type="password" placeholder="Confirm Password" class="form-control form-control-lg rounded-3" required></div>
          
          <button class="btn btn-lg w-100 fw-bold rounded-3 py-3 text-white" style="background-color: #0d3b66;">Register - Await Approval</button>
        </form>
        <p class="text-center mt-3">Already have account? <a href="/login">Login</a></p>
      </div>
    </div>
  </div>
</div>
</body>
</html>