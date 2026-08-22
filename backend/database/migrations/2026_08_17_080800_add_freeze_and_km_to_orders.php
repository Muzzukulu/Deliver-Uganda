<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFreezeAndKmToOrders extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->integer('exchange_rate')->default(3850)->after('price');
            $table->float('distance_km')->default(3)->after('exchange_rate');
            $table->integer('delivery_fee')->default(2500)->after('distance_km');
            $table->integer('rider_payout')->default(2000)->after('delivery_fee');
            $table->integer('platform_fee')->default(500)->after('rider_payout');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['exchange_rate','distance_km','delivery_fee','rider_payout','platform_fee']);
        });
    }
}