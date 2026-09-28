<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\RiderController;

// CLIENT - stays same
Route::post('/register', [AuthController::class, 'clientRegister']);
Route::post('/login', [AuthController::class, 'clientLogin']);

// RIDER - NEW STANDARD (Only Plural "riders" - Clean)
Route::post('/riders/register', [AuthController::class, 'riderRegister']);
Route::post('/riders/login', [AuthController::class, 'riderLogin']);
Route::post('/riders/pay-pro', [RiderController::class, 'initiateProPayment']);
Route::post('/payments/momo-callback', [RiderController::class, 'momoCallback']);

// ORDERS
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders/{id}/accept', [OrderController::class, 'accept']);
    Route::post('/orders/{id}/delivered', [OrderController::class, 'markDelivered']);
});