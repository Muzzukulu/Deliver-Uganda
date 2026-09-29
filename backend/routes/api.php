<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\TransporterController;

// CLIENT - stays same
Route::post('/register', [AuthController::class, 'clientRegister']);
Route::post('/login', [AuthController::class, 'clientLogin']);

// TRANSPORTER - NEW STANDARD 100% TRANSPORTER (Only Plural "transporters" - Clean)
Route::post('/transporters/register', [AuthController::class, 'transporterRegister']);
Route::post('/transporters/login', [AuthController::class, 'transporterLogin']);
Route::post('/transporters/pay-pro', [TransporterController::class, 'initiateProPayment']);
Route::post('/payments/momo-callback', [TransporterController::class, 'momoCallback']);

// ORDERS
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders/{id}/accept', [OrderController::class, 'accept']);
    Route::post('/orders/{id}/delivered', [OrderController::class, 'markDelivered']);
    
    // TRANSPORTER PROTECTED
    Route::get('/transporters/me', [TransporterController::class, 'me']);
    Route::get('/transporters/orders', [OrderController::class, 'transporterOrders']);
});