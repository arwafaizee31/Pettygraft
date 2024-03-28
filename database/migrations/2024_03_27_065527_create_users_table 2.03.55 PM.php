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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('fname');
            $table->string('lname');
            $table->string('email')->unique();
            $table->string('phone_no')->nullable(); // Adding phone_no field
            $table->unsignedBigInteger('role_id')->nullable(); // Adding role_id field
            $table->foreign('role_id')->references('id')->on('roles'); // Adding foreign key constraint
            $table->string('avatar')->nullable(); // Adding avatar field
            $table->string('city')->nullable(); // Adding city field
            $table->string('state')->nullable(); // Adding state field
            $table->string('country')->nullable(); // Adding country field
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
