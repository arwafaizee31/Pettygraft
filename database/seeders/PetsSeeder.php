<?php

namespace Database\Seeders;

use App\Models\Pets;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PetsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        
        // Assuming you have owner IDs available
        $ownerIds = [1, 2, 3]; // Example owner IDs
        
        // Assuming you have pet type IDs available
        $petTypeIds = [1, 2, 3]; // Example pet type IDs
        $petBreedIds = [1,2,3];
        $PermanentvendorIds = [1, 2, 3];
        for ($i = 0; $i < 10; $i++) {
            Pets::create([
                'owner_id' => $faker->randomElement($ownerIds), // Randomly select an owner ID
                'pet_name' => $faker->firstName, // Generate a random first name
                'type_id' => $faker->randomElement($petTypeIds), // Randomly select a pet type ID
                'breed' => $faker->randomElement($petBreedIds), // Generate a random word
                'd_o_b' => $faker->date(), // Generate a random date of birth
                'vaccines_done' => $faker->boolean, // Generate a random boolean value
                'gender' => $faker->randomElement(['male', 'female']), // Randomly select a gender
                'last_vaccine_date' => $faker->date(), // Generate a random last vaccine date
                'is_private' => $faker->boolean, // Generate a random boolean value
                'permanent_vendor_id' => $faker->randomElement($PermanentvendorIds) // Generate a random permanent vendor ID
            ]);
        }
    }
}
