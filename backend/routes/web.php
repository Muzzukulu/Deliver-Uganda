<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\OrderController;

// --- RECEIPT SEARCH - CAPTURE PARCEL NUMBER ONCE ---
Route::get('/receipt', function () {
    return view('receipt-search');
})->name('receipt.search');

Route::post('/receipt/find', function (\Illuminate\Http\Request $request) {
    $ptn = strtoupper(trim($request->input('parcel_tracker_number')));
    return redirect("/receipt/$ptn");
})->name('receipt.find');

// --- PUBLIC TRACKING & RECEIPT PDF ---
Route::get('/receipt/{ptn}', [OrderController::class, 'receipt'])->name('receipt.pdf');
Route::get('/track/{ptn}', [OrderController::class, 'track'])->name('order.track');
Route::get('/r/{ptn}', [OrderController::class, 'receipt']);
Route::get('/t/{ptn}', [OrderController::class, 'track']);

// --- ADMIN HQ SPA ---
Route::get('/{any}', function () {
  return view('welcome');
})->where('any', '.*');