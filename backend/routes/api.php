<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\TransporterController;

Route::post('/login', [AuthController::class,'login']);
Route::post('/register', [AuthController::class,'register']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', [AuthController::class,'user']);
    
    // ORDERS - ALL PROTECTED NOW
    Route::post('/orders', [OrderController::class,'store']);
    Route::get('/orders', [OrderController::class,'index']);
    Route::post('/orders/{id}/accept', [OrderController::class,'accept']);
    Route::post('/orders/{id}/deliver', [OrderController::class,'markDelivered']);
    Route::get('/transporter/orders', [OrderController::class,'transporterOrders']);
    Route::post('/transporter/location', [OrderController::class,'updateLocation']);

    Route::get('/transporters', [TransporterController::class,'index']);
    Route::get('/transporters/{id}', [TransporterController::class,'show']);
});

Route::get('/track/{tracker}', [OrderController::class,'track']);
Route::post('/track/{tracker}/confirm-payment', [OrderController::class,'confirmPayment'] ?? [OrderController::class,'track']);