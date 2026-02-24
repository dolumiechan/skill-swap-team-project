<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Service;
use App\Models\Category;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Предполагаем, что категории уже есть
        $categories = [
            'music' => Category::where('slug', 'music')->first()->id ?? 1,
            'education' => Category::where('slug', 'education')->first()->id ?? 2,
            'art' => Category::where('slug', 'art')->first()->id ?? 3,
            'tech' => Category::where('slug', 'tech')->first()->id ?? 4,
            'sport' => Category::where('slug', 'sport')->first()->id ?? 5,
        ];

        // Создаем пользователей (если их нет)
        $users = [
            1 => User::firstOrCreate(['id' => 1], [
                'name' => 'Александр Петров',
                'email' => 'alexander@example.com',
                'password' => bcrypt('password'),
                'coins' => 1000,
            ]),
            2 => User::firstOrCreate(['id' => 2], [
                'name' => 'Мария Иванова',
                'email' => 'maria@example.com',
                'password' => bcrypt('password'),
                'coins' => 500,
            ]),
            3 => User::firstOrCreate(['id' => 3], [
                'name' => 'Дмитрий Соколов',
                'email' => 'dmitry@example.com',
                'password' => bcrypt('password'),
                'coins' => 700,
            ]),
            4 => User::firstOrCreate(['id' => 4], [
                'name' => 'Анна Кузнецова',
                'email' => 'anna@example.com',
                'password' => bcrypt('password'),
                'coins' => 800,
            ]),
            5 => User::firstOrCreate(['id' => 5], [
                'name' => 'Сергей Волков',
                'email' => 'sergey@example.com',
                'password' => bcrypt('password'),
                'coins' => 600,
            ]),
            6 => User::firstOrCreate(['id' => 6], [
                'name' => 'Елена Попова',
                'email' => 'elena@example.com',
                'password' => bcrypt('password'),
                'coins' => 900,
            ]),
        ];

        // Массив офферов из mockData.js
        $offers = [
            [
                'user_id' => 2,
                'category_id' => $categories['music'],
                'title' => 'Научу играть на гитаре',
                'description' => 'Базовые аккорды, переборы, простые песни. 5 занятий по часу каждое. Для начинающих.',
                'price' => 150,
                'is_active' => true,
            ],
            [
                'user_id' => 3,
                'category_id' => $categories['education'] ?? $categories['tech'],
                'title' => 'Объясню производные и интегралы',
                'description' => 'Математический анализ для школьников и студентов. Помогу разобраться с производными, интегралами, пределами.',
                'price' => 200,
                'is_active' => true,
            ],
            [
                'user_id' => 4,
                'category_id' => $categories['art'],
                'title' => 'Уроки рисования акварелью',
                'description' => 'Научу основам акварельной живописи. Материалы не нужны - всё предоставлю.',
                'price' => 180,
                'is_active' => true,
            ],
            [
                'user_id' => 5,
                'category_id' => $categories['tech'],
                'title' => 'Программирование на Python',
                'description' => 'Базовый курс Python. Переменные, циклы, функции, работа с файлами. 3 занятия.',
                'price' => 250,
                'is_active' => true,
            ],
            [
                'user_id' => 6,
                'category_id' => $categories['sport'],
                'title' => 'Йога для начинающих',
                'description' => 'Асаны, дыхательные практики, расслабление. Онлайн или офлайн в парке.',
                'price' => 120,
                'is_active' => true,
            ],
            [
                'user_id' => 1,
                'category_id' => $categories['art'],
                'title' => 'Фотография для начинающих',
                'description' => 'Композиция, свет, настройки камеры. Помогу разобраться с ручным режимом.',
                'price' => 160,
                'is_active' => true,
            ],
        ];

        foreach ($offers as $offer) {
            Service::create($offer);
        }
    }
}
