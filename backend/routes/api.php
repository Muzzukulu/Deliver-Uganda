<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\TransporterController;
use App\Http\Controllers\AdminAuthController;

// === CLIENT ===
Route::post('/clients/register', [AuthController::class, 'clientRegister']);
Route::post('/clients/login', [AuthController::class, 'clientLogin']);
Route::post('/register', [AuthController::class, 'clientRegister']);
Route::post('/login', [AuthController::class, 'clientLogin']);

Route::get('/orders/track/{tracker}', [App\Http\Controllers\Api\OrderController::class, 'track']);
Route::post('/orders/{id}/location', [App\Http\Controllers\Api\OrderController::class, 'updateLocation']);

// === TRANSPORTER ===
Route::post('/transporters/register', [AuthController::class, 'transporterRegister']);
Route::post('/transporters/login', [AuthController::class, 'transporterLogin']);
Route::post('/transporters/pay-pro', [TransporterController::class, 'initiateProPayment']);
Route::post('/payments/momo-callback', [TransporterController::class, 'momoCallback']);

// === ADMIN ===
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/transporters/pending', [AdminAuthController::class, 'pendingTransporters']);
    Route::post('/admin/transporters/{id}/approve', [AdminAuthController::class, 'approveTransporter']);
});

// === ORDERS - DU-XXXX TRACKER - PUBLIC FOR TESTING (NO MORE LOGIN LOOP!) ===
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders/{id}/accept', [OrderController::class, 'accept']); // FIXED: Outside auth
Route::post('/orders/{id}/delivered', [OrderController::class, 'markDelivered']); // FIXED: Outside auth
Route::get('/transporters/orders', [OrderController::class, 'transporterOrders']); // FIXED: Outside auth

// === PROTECTED PROFILE ROUTES (Keep auth here) ===
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/transporters/me', [TransporterController::class, 'me']);
    Route::get('/clients/me', [AuthController::class, 'clientMe']);
});