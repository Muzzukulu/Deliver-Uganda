<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;

// --- Put receipt FIRST! ---
Route::get('/receipt/{ptn}', [OrderController::class, 'receipt']);
Route::get('/track/{ptn}', [OrderController::class, 'track']);
// --- DELIVER-UGANDA HQ FINAL ---
// This sends EVERY web page to your welcome.blade.php
// which then loads your Vue/React Admin HQ
Route::get('/{any}', function () {
  return view('welcome');
})->where('any', '.*');