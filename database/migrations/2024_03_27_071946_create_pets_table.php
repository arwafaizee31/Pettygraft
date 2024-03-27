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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id');
            $table->foreign('owner_id')->references('id')->on('users');
            $table->string('pet_name');
            $table->unsignedBigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('pet_types');
            $table->unsignedBigInteger('breed');
            $table->foreign('breed')->references('id')->on('pet_breeds');
            $table->date('d_o_b');
            $table->string('gender')->nullable();
            $table->string('vaccines_done')->nullable();
            $table->date('last_vaccine_date')->nullable();
            $table->smallInteger('is_private')->default('0');
            $table->unsignedBigInteger('permanent_vendor_id')->nullable();
            $table->foreign('permanent_vendor_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
