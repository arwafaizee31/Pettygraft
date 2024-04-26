<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PetVaccines;

use Faker\Factory as Faker;

class PetVaccinesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Create fake data for the pet_vaccines table
        for ($i = 0; $i < 10; $i++) {
            PetVaccines::create([
                'pet_id' => $faker->numberBetween(9, 10),
                'vaccine_id' => $faker->numberBetween(1, 10)
            ]);
        }
    }
}
