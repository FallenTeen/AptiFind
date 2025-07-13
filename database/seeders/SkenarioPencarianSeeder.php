<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkenarioPencarianSeeder extends Seeder
{
    public function run()
    {
        DB::table('skenario_pencarian')->insert([
            ['nama_skenario' => 'Cari Program Studi', 'kata_kunci_default' => json_encode(['Teknik Informatika', 'Manajemen', 'Kedokteran']), 'deskripsi' => 'Mencari program studi tertentu di website PTN/PTS.'],
            ['nama_skenario' => 'Cari Beasiswa', 'kata_kunci_default' => json_encode(['Beasiswa Bidikmisi', 'Beasiswa Unggulan']), 'deskripsi' => 'Mencari informasi beasiswa yang tersedia.'],
            ['nama_skenario' => 'Cari Fasilitas Kampus', 'kata_kunci_default' => json_encode(['Laboratorium', 'Perpustakaan', 'Asrama']), 'deskripsi' => 'Mencari fasilitas kampus di website.'],
            ['nama_skenario' => 'Cari Jadwal Pendaftaran', 'kata_kunci_default' => json_encode(['Jadwal PMB', 'Pendaftaran Mahasiswa Baru']), 'deskripsi' => 'Mencari jadwal pendaftaran mahasiswa baru.'],
            ['nama_skenario' => 'Cari Kontak Kampus', 'kata_kunci_default' => json_encode(['Kontak Humas', 'Nomor Telepon Kampus']), 'deskripsi' => 'Mencari kontak resmi kampus.'],
            ['nama_skenario' => 'Cari Akreditasi', 'kata_kunci_default' => json_encode(['Akreditasi BAN-PT', 'Akreditasi Program Studi']), 'deskripsi' => 'Mencari status akreditasi kampus atau prodi.'],
        ]);
    }
} 