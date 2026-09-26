<?php
use Illuminate\Support\Facades\Route;

// --- DELIVER-UGANDA HQ FINAL ---
// This sends EVERY web page to your welcome.blade.php
// which then loads your Vue/React Admin HQ
Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');