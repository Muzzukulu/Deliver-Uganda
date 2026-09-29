<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transporters', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('name');
            $table->string('phone')->unique();
            $table->string('national_id')->unique();
            $table->string('driving_permit')->nullable();
            $table->string('password');
            $table->string('number_plate')->nullable();
            $table->string('national_id_path')->nullable();
            $table->string('driving_permit_path')->nullable();
            $table->string('lc_letter_path')->nullable();
            $table->string('passport_photo_path')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transporters');
    }
};