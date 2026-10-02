<form method="POST" action="/transporter/login" class="max-w-md mx-auto mt-10 p-6 shadow rounded">
@csrf
<h1 class="text-2xl font-bold mb-4">Transporter Login</h1>
<input name="phone" placeholder="Phone" class="w-full border p-2 mb-3" required>
<input name="password" type="password" placeholder="Password" class="w-full border p-2 mb-3" required>
<button class="w-full bg-green-600 text-white p-2 rounded">Login</button>
<a href="/transporter/register" class="block mt-3 text-green-600">New transporter? Register</a>
</form>