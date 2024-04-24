<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PetTypes;

use Faker\Factory as Faker;

class PetTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Create fake data for the pet_types table
        for ($i = 0; $i < 10; $i++) {
            PetTypes::create([
                'pet_type' => $faker->word, // Generate a random word
                'pet_type_display_name' => $faker->word // Generate a random word
            ]);
        }
    }
}
