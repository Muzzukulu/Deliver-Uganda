<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->unique();
            $table->string('email')->unique()->nullable();
            $table->string('password');
            $table->decimal('default_gps_lat', 10, 7)->nullable();
            $table->decimal('default_gps_lng', 10, 7)->nullable();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('clients');
    }
};