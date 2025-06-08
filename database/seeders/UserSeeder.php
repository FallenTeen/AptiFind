<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'username' => 'admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('123'),
                'role' => 'admin',
            ],
            [
                'name' => 'User',
                'username' => 'user',
                'email' => 'user@user.com',
                'password' => bcrypt('123'),
                'role' => 'user',
            ],
        ];
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
