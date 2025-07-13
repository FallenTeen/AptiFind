<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KriteriaEvaluasiSearchSeeder extends Seeder
{
    public function run()
    {
        DB::table('kriteria_evaluasi_search')->insert([
            ['nama_kriteria' => 'Relevansi', 'bobot_kriteria' => 0.20, 'deskripsi' => 'Kesesuaian hasil pencarian dengan kebutuhan.', 'kategori' => 'content', 'status' => true],
            ['nama_kriteria' => 'Kecepatan', 'bobot_kriteria' => 0.15, 'deskripsi' => 'Waktu yang dibutuhkan untuk menampilkan hasil.', 'kategori' => 'performance', 'status' => true],
            ['nama_kriteria' => 'Kelengkapan', 'bobot_kriteria' => 0.10, 'deskripsi' => 'Cakupan informasi yang tersedia.', 'kategori' => 'content', 'status' => true],
            ['nama_kriteria' => 'Kemudahan Navigasi', 'bobot_kriteria' => 0.10, 'deskripsi' => 'Kemudahan berpindah antar halaman.', 'kategori' => 'usability', 'status' => true],
            ['nama_kriteria' => 'Tampilan Visual', 'bobot_kriteria' => 0.10, 'deskripsi' => 'Kenyamanan dan estetika tampilan.', 'kategori' => 'design', 'status' => true],
            ['nama_kriteria' => 'Aksesibilitas', 'bobot_kriteria' => 0.10, 'deskripsi' => 'Kemudahan diakses oleh semua pengguna.', 'kategori' => 'usability', 'status' => true],
            ['nama_kriteria' => 'Keamanan', 'bobot_kriteria' => 0.10, 'deskripsi' => 'Perlindungan data dan privasi.', 'kategori' => 'performance', 'status' => true],
            ['nama_kriteria' => 'Konsistensi', 'bobot_kriteria' => 0.08, 'deskripsi' => 'Konsistensi fitur dan tampilan.', 'kategori' => 'design', 'status' => true],
            ['nama_kriteria' => 'Dukungan Pengguna', 'bobot_kriteria' => 0.07, 'deskripsi' => 'Ketersediaan bantuan dan dokumentasi.', 'kategori' => 'usability', 'status' => true],
        ]);
    }
} 