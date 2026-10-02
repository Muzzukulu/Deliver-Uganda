<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Register - Deliver Uganda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-light">
<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-5">
      <div class="card shadow-lg border-0 rounded-4 p-4">
        <h1 class="text-center fw-bold display-5" style="color: #6f42c1;">Deliver Uganda</h1>
		<p class="text-center text-muted mb-4 fs-5">Client Registration</p>
        
        @if($errors->any())
          <div class="alert alert-danger">{{ $errors->first() }}</div>
        @endif

       <form method="POST" action="/client/register">
          @csrf
          <div class="mb-3"><input type="text" name="name" class="form-control form-control-lg rounded-3" placeholder="Full Name" required></div>
          <div class="mb-3"><input type="text" name="phone" class="form-control form-control-lg rounded-3" placeholder="Phone e.g. 077..." required></div>
          <div class="mb-3"><input type="email" name="email" class="form-control form-control-lg rounded-3" placeholder="Email (optional)"></div>
          <div class="mb-3"><input type="password" name="password" class="form-control form-control-lg rounded-3" placeholder="Password" required></div>
          <div class="mb-4"><input type="password" name="password_confirmation" class="form-control form-control-lg rounded-3" placeholder="Confirm Password" required></div>
          <button class="btn btn-warning btn-lg w-100 fw-bold rounded-3 py-3">Register as Client</button>
        </form>
        <p class="text-center mt-3">Already have account? <a href="/login">Login</a></p>
      </div>
    </div>
  </div>
</div>
</body>
</html>