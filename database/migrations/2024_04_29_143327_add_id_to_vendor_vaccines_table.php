<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdToVendorVaccinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vendor_vaccines', function (Blueprint $table) {
            // Add the id column
            $table->bigIncrements('id')->before('vendor_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vendor_vaccines', function (Blueprint $table) {
            // Drop the id column if the migration is rolled back
            $table->dropColumn('id');
        });
    }
}
