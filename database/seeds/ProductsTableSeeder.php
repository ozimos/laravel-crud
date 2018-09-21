<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::truncate();
        
        $faker = \Faker\Factory::create('en_NG');
 
        // Create 50 product records
        for ($i = 0; $i < 50; $i++) {
            Product::create([
                'title' => $faker->word,
                'description' => $faker->paragraph,
                'price' => $faker->randomNumber(2),
                'availability' => $faker->boolean(50)
            ]);
        }
    }
}
