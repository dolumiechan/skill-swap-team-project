<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
     {
        Category::firstOrCreate(['slug' => 'music'], ['name' => 'Музыка']);
        Category::firstOrCreate(['slug' => 'education'], ['name' => 'Образование']);
        Category::firstOrCreate(['slug' => 'art'], ['name' => 'Искусство']);
        Category::firstOrCreate(['slug' => 'tech'], ['name' => 'Технологии']);
        Category::firstOrCreate(['slug' => 'sport'], ['name' => 'Спорт']);
     }
}
