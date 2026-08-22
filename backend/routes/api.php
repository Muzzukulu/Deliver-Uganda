<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\DriverController;

Route::post('/register', [AuthController::class, 'clientRegister']);
Route::post('/login', [AuthController::class, 'clientLogin']);

Route::post('/driver/register', [AuthController::class, 'driverRegister']);
Route::post('/driver/login', [AuthController::class, 'driverLogin']);
Route::post('/drivers/login', [AuthController::class, 'driverLogin']);
Route::post('/drivers/register', [DriverController::class, 'register']);

Route::post('/drivers/pay-pro', [DriverController::class, 'initiateProPayment']);
Route::post('/payments/momo-callback', [DriverController::class, 'momoCallback']);

Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders/{id}/accept', [OrderController::class, 'accept']);
    Route::post('/orders/{id}/delivered', [OrderController::class, 'markDelivered']);
});