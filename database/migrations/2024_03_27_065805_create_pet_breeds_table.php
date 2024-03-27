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
        Schema::create('pet_breeds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pet_type_id');
            $table->foreign('pet_type_id')->references('id')->on('pet_types');
            $table->string('breed');
            $table->string('breed_display_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pet_breeds');
    }
};
