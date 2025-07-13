<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramStudiSeeder extends Seeder
{
    public function run()
    {
        DB::table('program_studi')->insert([
            ['perguruan_tinggi_id' => 1, 'nama' => 'Teknik Informatika', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 1, 'nama' => 'Manajemen', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 1, 'nama' => 'Kedokteran', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 2, 'nama' => 'Farmasi', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 2, 'nama' => 'Teknik Sipil', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 3, 'nama' => 'Teknik Telekomunikasi', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 3, 'nama' => 'Teknik Informatika', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 4, 'nama' => 'Teknik Mesin', 'jenjang' => 'D3'],
            ['perguruan_tinggi_id' => 5, 'nama' => 'Keperawatan', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 6, 'nama' => 'Teknik Elektro', 'jenjang' => 'D3'],
            ['perguruan_tinggi_id' => 7, 'nama' => 'Sistem Informasi', 'jenjang' => 'S1'],
            ['perguruan_tinggi_id' => 8, 'nama' => 'Teknik Industri', 'jenjang' => 'S1'],
        ]);
    }
}
