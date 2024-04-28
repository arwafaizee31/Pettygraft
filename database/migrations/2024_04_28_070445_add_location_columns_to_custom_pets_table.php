<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationColumnsToCustomPetsTable extends Migration
{
    public function up()
    {
        Schema::table('custom_pets', function (Blueprint $table) {
            // Add country column
            $table->string('country')->nullable();

            // Add state column
            $table->string('state')->nullable();

            // Add city column
            $table->string('city')->nullable();
        });
    }

    public function down()
    {
        Schema::table('custom_pets', function (Blueprint $table) {
            // Drop country column
            $table->dropColumn('country');

            // Drop state column
            $table->dropColumn('state');

            // Drop city column
            $table->dropColumn('city');
        });
    }
}
