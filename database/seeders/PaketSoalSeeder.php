<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaketSoalSeeder extends Seeder
{
    public function run(): void
    {
        $paketSoal = [
            [
                'nama_paket' => 'Paket Tes Minat Bakat Umum',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat secara umum di berbagai bidang',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Umum',
                'jumlah_soal' => 30,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Teknologi Informasi',
                'deskripsi' => 'Paket tes khusus untuk mengukur minat dan bakat di bidang teknologi informasi',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Teknologi',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Bisnis dan Ekonomi',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang bisnis dan ekonomi',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Bisnis',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Kesehatan dan Kedokteran',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang kesehatan dan kedokteran',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Kesehatan',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Seni dan Desain',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang seni dan desain',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Seni',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Pendidikan dan Sosial',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang pendidikan dan sosial',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Pendidikan',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Teknik dan Ilmu Alam',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang teknik dan ilmu alam',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Teknik',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Hukum dan Sosial',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang hukum dan sosial',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Hukum',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Komunikasi dan Media',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang komunikasi dan media',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Komunikasi',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
            [
                'nama_paket' => 'Paket Tes Pertanian dan Peternakan',
                'deskripsi' => 'Paket tes untuk mengukur minat dan bakat di bidang pertanian dan peternakan',
                'author' => 'System',
                'status' => 'published',
                'kategori' => 'Pertanian',
                'jumlah_soal' => 25,
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ],
        ];

        foreach ($paketSoal as $paket) {
            $paketId = DB::table('paket_soal')->insertGetId([
                'nama_paket' => $paket['nama_paket'],
                'deskripsi' => $paket['deskripsi'],
                'author' => $paket['author'],
                'status' => $paket['status'],
                'kategori' => $paket['kategori'],
                'jumlah_soal' => $paket['jumlah_soal'],
                'balance_minat' => $paket['balance_minat'],
                'balance_bakat' => $paket['balance_bakat'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Get soal IDs based on kategori
            $soalIds = $this->getSoalIdsByKategori($paket['kategori'], $paket['jumlah_soal']);
            
            // Insert detail paket soal
            foreach ($soalIds as $soalId) {
                DB::table('detail_paket_soal')->insert([
                    'paket_soal_id' => $paketId,
                    'soal_id' => $soalId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $this->command->info('Paket Soal seeder berhasil dijalankan! Total paket: ' . count($paketSoal));
    }

    private function getSoalIdsByKategori($kategori, $jumlah)
    {
        $soalIds = [];
        
        switch ($kategori) {
            case 'Umum':
                // Mix of all categories
                $soalIds = DB::table('tabel_soal')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Teknologi':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%teknologi%')
                    ->orWhere('text_soal', 'like', '%komputer%')
                    ->orWhere('text_soal', 'like', '%program%')
                    ->orWhere('text_soal', 'like', '%software%')
                    ->orWhere('text_soal', 'like', '%artificial intelligence%')
                    ->orWhere('text_soal', 'like', '%cybersecurity%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Bisnis':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%bisnis%')
                    ->orWhere('text_soal', 'like', '%ekonomi%')
                    ->orWhere('text_soal', 'like', '%investasi%')
                    ->orWhere('text_soal', 'like', '%keuangan%')
                    ->orWhere('text_soal', 'like', '%marketing%')
                    ->orWhere('text_soal', 'like', '%e-commerce%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Kesehatan':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%kesehatan%')
                    ->orWhere('text_soal', 'like', '%kedokteran%')
                    ->orWhere('text_soal', 'like', '%anatomi%')
                    ->orWhere('text_soal', 'like', '%medis%')
                    ->orWhere('text_soal', 'like', '%farmasi%')
                    ->orWhere('text_soal', 'like', '%biologi%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Seni':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%seni%')
                    ->orWhere('text_soal', 'like', '%desain%')
                    ->orWhere('text_soal', 'like', '%fotografi%')
                    ->orWhere('text_soal', 'like', '%gambar%')
                    ->orWhere('text_soal', 'like', '%arsitektur%')
                    ->orWhere('text_soal', 'like', '%interior%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Pendidikan':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%pendidikan%')
                    ->orWhere('text_soal', 'like', '%mengajar%')
                    ->orWhere('text_soal', 'like', '%anak-anak%')
                    ->orWhere('text_soal', 'like', '%psikologi%')
                    ->orWhere('text_soal', 'like', '%konseling%')
                    ->orWhere('text_soal', 'like', '%bimbingan%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Teknik':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%teknik%')
                    ->orWhere('text_soal', 'like', '%robotika%')
                    ->orWhere('text_soal', 'like', '%fisika%')
                    ->orWhere('text_soal', 'like', '%kimia%')
                    ->orWhere('text_soal', 'like', '%renewable energy%')
                    ->orWhere('text_soal', 'like', '%lingkungan%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Hukum':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%hukum%')
                    ->orWhere('text_soal', 'like', '%perundang-undangan%')
                    ->orWhere('text_soal', 'like', '%politik%')
                    ->orWhere('text_soal', 'like', '%debat%')
                    ->orWhere('text_soal', 'like', '%argumentasi%')
                    ->orWhere('text_soal', 'like', '%internasional%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Komunikasi':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%jurnalistik%')
                    ->orWhere('text_soal', 'like', '%media%')
                    ->orWhere('text_soal', 'like', '%artikel%')
                    ->orWhere('text_soal', 'like', '%wawancara%')
                    ->orWhere('text_soal', 'like', '%public relations%')
                    ->orWhere('text_soal', 'like', '%branding%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            case 'Pertanian':
                $soalIds = DB::table('tabel_soal')
                    ->where('text_soal', 'like', '%pertanian%')
                    ->orWhere('text_soal', 'like', '%peternakan%')
                    ->orWhere('text_soal', 'like', '%tanaman%')
                    ->orWhere('text_soal', 'like', '%alam%')
                    ->orWhere('text_soal', 'like', '%agribisnis%')
                    ->orWhere('text_soal', 'like', '%agroindustri%')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
                
            default:
                // Fallback to random questions
                $soalIds = DB::table('tabel_soal')
                    ->inRandomOrder()
                    ->limit($jumlah)
                    ->pluck('id')
                    ->toArray();
                break;
        }
        
        return $soalIds;
    }
} 