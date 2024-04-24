<?php

namespace Database\Seeders;

use App\Models\PetTypes;
use App\Models\PetBreeds;
use Faker\Factory as Faker;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PetBreedsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $petTypeIds = PetTypes::pluck('id')->toArray();
        for ($i = 0; $i < 10; $i++) {
            PetBreeds::create([
                'pet_type_id' => $faker->randomElement($petTypeIds), // Randomly select a pet type ID
                'breed' => $faker->word, // Generate a random word
                'breed_display_name' => $faker->word // Generate a random word
            ]);
        }

    }
}
