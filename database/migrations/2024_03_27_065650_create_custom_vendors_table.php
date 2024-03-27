<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('custom_vendors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_id');
            $table->foreign('vendor_id')->references('id')->on('users');
            $table->string('address');
            $table->string('pincode');
            $table->boolean('is_company')->default(0); // Adding is_company field with boolean datatype
            $table->string('company_name')->nullable(); // Adding company_name field
            $table->tinyInteger('is_premium')->unsigned()->default(0); // Adding is_premium field with tiny integer datatype
            $table->integer('yrs_of_exp')->nullable(); // Adding yrs_of_exp field
            $table->integer('no_of_pets_treated')->nullable(); // Adding no_of_pets_treated field
            $table->string('vaccines_available')->nullable(); // Adding vaccines_available field
            $table->string('license')->nullable(); // Adding license field
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_vendors');
    }
};
