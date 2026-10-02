<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\TransporterController;
use App\Http\Controllers\AdminAuthController;

// === CLIENT - Singular only ===
Route::post('/client/register', [AuthController::class, 'clientRegister']);
Route::post('/register', [AuthController::class, 'clientRegister']);

Route::post('/client/login', [AuthController::class, 'clientLogin']);
Route::post('/login', [AuthController::class, 'clientLogin']);

Route::get('/orders/track/{tracker}', [OrderController::class, 'track']);
Route::post('/orders/{id}/location', [OrderController::class, 'updateLocation']);

// === TRANSPORTER - Singular only, matches your folder! ===
Route::post('/transporter/register', [AuthController::class, 'transporterRegister']);
Route::post('/transporter/login', [AuthController::class, 'transporterLogin']);
Route::post('/transporter/pay-pro', [TransporterController::class, 'initiateProPayment']);
Route::post('/payments/momo-callback', [TransporterController::class, 'momoCallback']);

// === ADMIN ===
Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/transporter/pending', [AdminAuthController::class, 'pendingTransporters']);
    Route::post('/admin/transporter/{id}/approve', [AdminAuthController::class, 'approveTransporter']);
});

// === ORDERS - DU-XXXX TRACKER - PUBLIC FOR TESTING ===
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders/{id}/accept', [OrderController::class, 'accept']);
Route::post('/orders/{id}/delivered', [OrderController::class, 'markDelivered']);
Route::get('/transporter/orders', [OrderController::class, 'transporterOrders']);

// === PROTECTED PROFILE ===
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/transporter/me', [TransporterController::class, 'me']);
    Route::get('/client/me', [AuthController::class, 'clientMe']);
    Route::post('/logout', [AuthController::class, 'logout']);
});