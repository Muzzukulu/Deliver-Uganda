<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            
            // Who ordered?
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            
            // Which driver? (nullable at first)
            $table->foreignId('driver_id')->nullable()->constrained('drivers')->onDelete('set null');

            $table->string('pickup_address');
            $table->decimal('pickup_lat', 10, 7);
            $table->decimal('pickup_lng', 10, 7);
            
            $table->string('dropoff_address');
            $table->decimal('dropoff_lat', 10, 7);
            $table->decimal('dropoff_lng', 10, 7);

            $table->string('package_description');
            $table->decimal('price', 10, 2)->nullable();

            $table->enum('status', ['pending', 'accepted', 'picked', 'on_the_way', 'delivered', 'cancelled'])->default('pending');
            
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};