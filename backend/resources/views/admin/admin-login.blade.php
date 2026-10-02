<form method="POST" action="/admin/login" class="max-w-md mx-auto mt-10 p-6 shadow rounded">
@csrf
<h1 class="text-2xl font-bold mb-4">Admin Login</h1>
<input name="email" type="email" placeholder="Admin Email" class="w-full border p-2 mb-3" required>
<input name="password" type="password" placeholder="Password" class="w-full border p-2 mb-3" required>
<button class="w-full bg-black text-white p-2 rounded">Login</button>
</form>