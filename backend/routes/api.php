<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\DriverController; // We will rename this later

// CLIENT - stays same
Route::post('/register', [AuthController::class, 'clientRegister']);
Route::post('/login', [AuthController::class, 'clientLogin']);

// RIDER - NEW STANDARD
Route::post('/rider/register', [AuthController::class, 'riderRegister']);
Route::post('/rider/login', [AuthController::class, 'riderLogin']);

// DRIVER - OLD, keep as alias for backward compatibility
Route::post('/driver/register', [AuthController::class, 'riderRegister']);
Route::post('/driver/login', [AuthController::class, 'riderLogin']);
Route::post('/drivers/register', [DriverController::class, 'register']);
Route::post('/drivers/login', [AuthController::class, 'riderLogin']);
Route::post('/drivers/pay-pro', [DriverController::class, 'initiateProPayment']);
Route::post('/payments/momo-callback', [DriverController::class, 'momoCallback']);

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders/{id}/accept', [OrderController::class, 'accept']);
    Route::post('/orders/{id}/delivered', [OrderController::class, 'markDelivered']);
});