<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Deliver Uganda - Admin HQ | Transporter Command Center</title>
    <meta name="description" content="Deliver Uganda Admin - Manage transporters, orders, pricing engine">
    <link rel="icon" href="/favicon.ico">
    <style>
      body{margin:0;font-family:system-ui}
      #app:empty::before{
        content:'DELIVER UGANDA • Loading Transporter HQ...';
        display:flex;align-items:center;justify-content:center;
        height:100vh;font-weight:900;letter-spacing:2px;color:#111;
        background:#FFCC00;
      }
    </style>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 antialiased">
    <div id="app"></div>
    <noscript>
      <div style="padding:40px;text-align:center;font-weight:700">
        Please enable JavaScript — Admin HQ needs it to manage transporters & orders.
      </div>
    </noscript>
</body>
</html>