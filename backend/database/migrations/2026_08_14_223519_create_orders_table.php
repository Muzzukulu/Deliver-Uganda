<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            
            // Who ordered?
            $table->foreignId('client_id')->nullable()->constrained('users')->onDelete('cascade');
            
            // Which transporter? (nullable at first)
            $table->foreignId('transporter_id')->nullable()->constrained('transporters')->onDelete('set null');

            $table->string('pickup_address');
            $table->decimal('pickup_lat', 10, 7);
            $table->decimal('pickup_lng', 10, 7);
            
            $table->string('dropoff_address');
            $table->decimal('dropoff_lat', 10, 7);
            $table->decimal('dropoff_lng', 10, 7);

            $table->string('package_description');
            
            // PRICE ENGINE - USD is source of truth
            $table->decimal('price_usd', 10, 2)->default(6.50);
            $table->decimal('price_ugx', 10, 2)->default(25000);
            $table->integer('rate_used')->default(3850);
            $table->decimal('exchange_rate', 10, 2)->default(3850);
            
            // Keep old price for backward compat
            $table->decimal('price', 10, 2)->nullable();

            // DISTANCE & FEES - NEW TRANSPORTER ENGINE
            $table->decimal('distance_km', 10, 2)->nullable();
            $table->decimal('delivery_fee', 10, 2)->nullable();
            $table->decimal('delivery_fee_usd', 10, 2)->nullable();
            $table->decimal('transporter_payout', 10, 2)->nullable();
            $table->decimal('transporter_commission_usd', 10, 2)->nullable();
            $table->decimal('platform_fee', 10, 2)->nullable();
            $table->decimal('platform_profit_usd', 10, 2)->nullable();
            $table->decimal('commission_rate', 5, 2)->default(20.00);

            // TRACKING & PAYMENT
            $table->string('parcel_tracker_number')->unique()->nullable();
            $table->enum('payment_status', ['pending', 'paid', 'failed'])->default('pending');

            $table->enum('status', ['pending', 'accepted', 'picked', 'on_the_way', 'delivered', 'cancelled'])->default('pending');
            
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('orders');
    }
};