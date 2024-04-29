<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVendorVaccinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_vaccines', function (Blueprint $table) {
            $table->unsignedBigInteger('vendor_id');
            $table->unsignedBigInteger('vaccine_id');
            $table->foreign('vendor_id')->references('id')->on('users');
            $table->foreign('vaccine_id')->references('id')->on('vaccines');
            // Add any other columns you may need for the pivot table
            // For example: $table->integer('quantity')->unsigned();
            // Add timestamps if needed: $table->timestamps();
            // Add unique constraints if needed: $table->unique(['vendor_id', 'vaccine_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_vaccines');
    }
}
