<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerguruanTinggiSeeder extends Seeder
{
    public function run()
    {
        DB::table('perguruan_tinggi')->insert([
            ['nama' => 'Universitas Jenderal Soedirman', 'akronim' => 'UNSOED', 'jenis' => 'negeri', 'alamat' => 'Jl. Prof. Dr. HR Boenyamin 708, Purwokerto', 'kota' => 'Purwokerto', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53122', 'telepon' => '0281-635292', 'email' => 'info@unsoed.ac.id', 'website' => 'https://www.unsoed.ac.id', 'logo' => null, 'no_telp' => '0281-635292', 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://www.unsoed.ac.id', 'jenis_search_engine' => 'custom'],
            ['nama' => 'Universitas Muhammadiyah Purwokerto', 'akronim' => 'UMP', 'jenis' => 'swasta', 'alamat' => 'Jl. Raya Dukuhwaluh, Purwokerto', 'kota' => 'Purwokerto', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53182', 'telepon' => '0281-636751', 'email' => 'info@ump.ac.id', 'website' => 'https://www.ump.ac.id', 'logo' => null, 'no_telp' => '0281-636751', 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://www.ump.ac.id', 'jenis_search_engine' => 'google'],
            ['nama' => 'Institut Teknologi Telkom Purwokerto', 'akronim' => 'ITTP', 'jenis' => 'swasta', 'alamat' => 'Jl. DI Panjaitan No.128, Purwokerto', 'kota' => 'Purwokerto', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53147', 'telepon' => '0281-641629', 'email' => 'info@ittelkom-pwt.ac.id', 'website' => 'https://ittelkom-pwt.ac.id', 'logo' => null, 'no_telp' => '0281-641629', 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://ittelkom-pwt.ac.id', 'jenis_search_engine' => 'custom'],
            ['nama' => 'Akademi Komunitas Negeri Purwokerto', 'akronim' => 'AKNP', 'jenis' => 'negeri', 'alamat' => 'Jl. Prof. Dr. HR Boenyamin 708, Purwokerto', 'kota' => 'Purwokerto', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53122', 'telepon' => null, 'email' => null, 'website' => null, 'logo' => null, 'no_telp' => null, 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => null, 'jenis_search_engine' => 'google'],
            ['nama' => 'STIKES Harapan Bangsa Purwokerto', 'akronim' => 'STIKES HB', 'jenis' => 'swasta', 'alamat' => 'Jl. HR Bunyamin 637, Purwokerto', 'kota' => 'Purwokerto', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53122', 'telepon' => null, 'email' => null, 'website' => 'https://stikes-hb.ac.id', 'logo' => null, 'no_telp' => null, 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://stikes-hb.ac.id', 'jenis_search_engine' => 'custom'],
            ['nama' => 'Politeknik Negeri Cilacap', 'akronim' => 'PNC', 'jenis' => 'negeri', 'alamat' => 'Jl. Dr. Soetomo No.1, Cilacap', 'kota' => 'Cilacap', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53212', 'telepon' => null, 'email' => null, 'website' => 'https://pnc.ac.id', 'logo' => null, 'no_telp' => null, 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://pnc.ac.id', 'jenis_search_engine' => 'custom'],
            ['nama' => 'Universitas AMIKOM Purwokerto', 'akronim' => 'AMIKOM', 'jenis' => 'swasta', 'alamat' => 'Jl. Letjend Pol. Soemarto No.126, Purwokerto', 'kota' => 'Purwokerto', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '53125', 'telepon' => null, 'email' => null, 'website' => 'https://amikompurwokerto.ac.id', 'logo' => null, 'no_telp' => null, 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://amikompurwokerto.ac.id', 'jenis_search_engine' => 'google'],
            ['nama' => 'Universitas Peradaban Bumiayu', 'akronim' => 'UPB', 'jenis' => 'swasta', 'alamat' => 'Jl. Raya Paguyangan, Bumiayu', 'kota' => 'Bumiayu', 'provinsi' => 'Jawa Tengah', 'kode_pos' => '52273', 'telepon' => null, 'email' => null, 'website' => 'https://peradaban.ac.id', 'logo' => null, 'no_telp' => null, 'deskripsi' => null, 'status' => 'aktif', 'rating_average' => 0, 'total_evaluasi' => 0, 'url_website' => 'https://peradaban.ac.id', 'jenis_search_engine' => 'custom'],
        ]);
    }
}
