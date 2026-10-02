<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WebOrderController;

// PUBLIC GATE
Route::get('/', fn()=> redirect('/client/register'));
Route::get('/login', [AuthController::class,'showLogin'])->name('login');
Route::post('/login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class,'logout'])->name('logout');

// CLIENT HOUSE
Route::get('/client/register', [AuthController::class,'showClientRegister'])->name('client.register');
Route::post('/client/register', [AuthController::class,'clientRegister']);
Route::get('/client/login', [AuthController::class,'showClientLogin'])->name('client.login');
Route::post('/client/login', [AuthController::class,'login']);

// TRANSPORTER HOUSE - YOUR TRUCKS TO TZ, CONGO, KENYA etc
Route::get('/transporter/register', [AuthController::class,'showTransporterRegister'])->name('transporter.register');
Route::post('/transporter/register', [AuthController::class,'registerTransporter']);
Route::get('/transporter/login', [AuthController::class,'showTransporterLogin'])->name('transporter.login');
Route::post('/transporter/login', [AuthController::class,'login']);

// DASHBOARDS
Route::middleware('auth')->group(function(){
    Route::get('/client/dashboard', [WebOrderController::class,'clientDashboard'])->name('client.dashboard');
    Route::get('/transporter/dashboard', fn()=>view('transporter.dashboard'))->name('transporter.dashboard');
    Route::get('/transporter/pending', fn()=>view('transporter.pending'))->name('transporter.pending');
    Route::get('/admin/dashboard', fn()=>view('admin.dashboard'))->name('admin.dashboard');
});