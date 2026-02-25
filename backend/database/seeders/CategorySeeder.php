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
        Category::create(['name' => 'Музыка', 'slug' => 'music']);
        Category::create(['name' => 'Программирование', 'slug' => 'programming']);
        Category::create(['name' => 'Математика', 'slug' => 'math']);
        Category::create(['name' => 'Языки', 'slug' => 'languages']);
    }
}
