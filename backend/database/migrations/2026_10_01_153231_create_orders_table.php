<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // <-- HERE! FIRST LINE
            $table->id();
            $table->string('parcel_tracker_number')->unique();
            
            $table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('transporter_id')->nullable()->constrained('transporters')->onDelete('set null');
            
            $table->string('pickup_address');
            $table->string('dropoff_address');
            $table->text('package_description')->nullable();
            
            // Prices
            $table->decimal('delivery_fee', 10, 2)->nullable();
            $table->decimal('price_ugx', 10, 2)->nullable();
            $table->decimal('delivery_fee_usd', 10, 2)->nullable();
            $table->decimal('price_usd', 10, 2)->nullable();
            
            // Extra
            $table->decimal('distance_km', 8, 2)->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->boolean('is_frozen')->default(false);
            
            $table->string('voice_note_path')->nullable();
            
            $table->enum('status', ['pending','accepted','in_transit','delivered','cancelled'])->default('pending');
            $table->enum('payment_status', ['pending','paid','failed'])->default('pending');
            $table->string('payment_method')->nullable();
            
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('orders'); }
};