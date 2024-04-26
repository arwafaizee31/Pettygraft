<?php

namespace Database\Seeders;

use App\Models\Vaccines;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class VaccinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Assuming you have pet type IDs available
        $petTypeIds = [1, 2]; // Example pet type IDs

        for ($i = 0; $i < 10; $i++) {
            Vaccines::create([
                'pet_type_id' => $faker->randomElement($petTypeIds), // Randomly select a pet type ID
                'vaccine_name' => $faker->word, // Generate a random word
                'min_age' => $faker->numberBetween(1, 12), // Generate a random age between 1 and 12 months
                'max_age' => $faker->numberBetween(13, 60), // Generate a random age between 13 and 60 months
            ]);
        }
    }
}
