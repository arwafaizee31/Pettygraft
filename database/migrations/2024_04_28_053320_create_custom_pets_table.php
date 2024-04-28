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
        Schema::create('custom_pets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_id');
            $table->foreign('vendor_id')->references('id')->on('users');
            $table->string('pet_name');
            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('pet_types');
            $table->unsignedBigInteger('breed');
            $table->foreign('breed')->references('id')->on('pet_breeds');
            $table->date('d_o_b');
            $table->string('gender')->nullable();
            $table->string('vaccines_done')->nullable();
            $table->date('last_vaccine_date')->nullable();
            $table->string('owner_name');
            $table->string('owner_contact');
            $table->string('owner_email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_pets');
    }
};
