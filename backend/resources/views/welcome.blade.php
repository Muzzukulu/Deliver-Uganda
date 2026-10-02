<!DOCTYPE html>
<html>
<head>
  <title>DeliverUganda - Tracking</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">

  <div class="text-center mb-8">
    <h1 class="text-5xl font-black text-yellow-400">DELIVER<span class="text-white">UGANDA</span></h1>
    <p class="text-gray-400 mt-2">Universal Tracking & Payment</p>
    <p class="text-xs text-gray-600 mt-1">MTN *165# / Airtel *185# — Ref: DU26-XXXX-Q10</p>
  </div>

  <div class="w-full max-w-lg bg-white rounded-[2rem] p-2 shadow-2xl shadow-yellow-500/20">
    <form id="trackForm" class="flex">
      <input
        id="trackingInput"
        type="text"
        placeholder="DU26-0001-Q10"
        value="DU26-0001-Q10"
        class="flex-1 px-6 py-4 rounded-full text-black font-bold text-lg outline-none"
      >
      <button type="submit" class="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-6 py-4 rounded-full ml-2 text-sm">
  TRACK 🚚 or 🏍️
</button>
        
    </form>
  </div>

  <div class="mt-6 flex gap-2 flex-wrap justify-center">
    <button onclick="setCode('DU26-0012-Q10')" class="bg-gray-800 px-4 py-2 rounded-full text-xs border border-yellow-400">DU26-0012-Q10</button>
    <button onclick="setCode('DU26-0013-Q10')" class="bg-gray-800 px-4 py-2 rounded-full text-xs">DU26-0013-Q10</button>
  </div>

  <script>
    function setCode(code) {
      document.getElementById('trackingInput').value = code;
    }
    document.getElementById('trackForm').addEventListener('submit', function(e){
      e.preventDefault();
      let code = document.getElementById('trackingInput').value.trim();
      if(code) window.location.href = '/track/' + code;
    });
  </script>

</body>
</html>