<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'price_usd')) {
                $table->decimal('price_usd', 8, 2)->nullable()->after('price');
            }
            if (!Schema::hasColumn('orders', 'price_ugx')) {
                $table->integer('price_ugx')->nullable();
            }
            if (!Schema::hasColumn('orders', 'rate_used')) {
                $table->decimal('rate_used', 10, 2)->nullable();
            }
            if (!Schema::hasColumn('orders', 'delivery_fee_usd')) {
                $table->decimal('delivery_fee_usd', 8, 2)->nullable();
            }
            if (!Schema::hasColumn('orders', 'driver_commission_usd')) {
                $table->decimal('driver_commission_usd', 8, 2)->nullable();
            }
            if (!Schema::hasColumn('orders', 'platform_profit_usd')) {
                $table->decimal('platform_profit_usd', 8, 2)->nullable();
            }
            if (!Schema::hasColumn('orders', 'commission_rate')) {
                $table->integer('commission_rate')->default(70);
            }
            if (!Schema::hasColumn('orders', 'payment_status')) {
                $table->string('payment_status')->default('pending');
            }
            if (!Schema::hasColumn('orders', 'driver_id')) {
                $table->unsignedBigInteger('driver_id')->nullable();
            }
            if (!Schema::hasColumn('orders', 'exchange_rate')) {
                $table->decimal('exchange_rate', 10, 2)->nullable();
            }
        });
    }

    public function down(): void
    {
        // safe rollback
    }
};