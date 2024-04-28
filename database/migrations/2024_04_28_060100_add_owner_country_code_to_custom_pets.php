<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOwnerCountryCodeToCustomPets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('custom_pets', function (Blueprint $table) {
            $table->string('owner_country_code')->nullable()->default(null); // Add the new column
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('custom_pets', function (Blueprint $table) {
            $table->dropColumn('owner_country_code'); // Rollback by dropping the column
        });
    }
}
