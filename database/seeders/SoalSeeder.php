<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SoalSeeder extends Seeder
{
    public function run(): void
    {
        $soal = [
            // === MINAT TINGGI, BAKAT RENDAH ===
            [
                'text_soal' => 'Saya sangat tertarik dengan dunia teknologi dan inovasi terbaru',
                'bobot_minat' => 1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang membaca buku tentang sains dan penemuan baru',
                'bobot_minat' => 1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan dunia bisnis dan kewirausahaan',
                'bobot_minat' => 1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang mengikuti perkembangan dunia seni dan budaya',
                'bobot_minat' => 1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan dunia kesehatan dan kedokteran',
                'bobot_minat' => 1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],

            // === MINAT RENDAH, BAKAT TINGGI ===
            [
                'text_soal' => 'Saya bisa dengan mudah memahami konsep matematika yang kompleks',
                'bobot_minat' => -1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya memiliki kemampuan analisis yang baik dalam memecahkan masalah',
                'bobot_minat' => -1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mengingat dan memahami informasi teknis',
                'bobot_minat' => -1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya memiliki kemampuan komunikasi yang baik',
                'bobot_minat' => -1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mempelajari bahasa pemrograman',
                'bobot_minat' => -1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],

            // === MINAT TINGGI, BAKAT TINGGI ===
            [
                'text_soal' => 'Saya sangat tertarik dan berbakat dalam bidang komputer dan teknologi',
                'bobot_minat' => 1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang dan mahir dalam memecahkan masalah matematika',
                'bobot_minat' => 1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dan berbakat dalam bidang desain grafis',
                'bobot_minat' => 1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang dan mahir dalam menulis dan berkomunikasi',
                'bobot_minat' => 1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dan berbakat dalam bidang penelitian ilmiah',
                'bobot_minat' => 1,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],

            // === MINAT RENDAH, BAKAT RENDAH ===
            [
                'text_soal' => 'Saya tidak terlalu tertarik dengan dunia teknologi',
                'bobot_minat' => -1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya merasa kesulitan dalam memahami konsep matematika',
                'bobot_minat' => -1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tidak terlalu tertarik dengan dunia bisnis',
                'bobot_minat' => -1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya merasa kesulitan dalam menulis laporan formal',
                'bobot_minat' => -1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tidak terlalu tertarik dengan dunia seni dan desain',
                'bobot_minat' => -1,
                'bobot_bakat' => -1,
                'author' => 'System'
            ],

            // === NEUTRAL QUESTIONS ===
            [
                'text_soal' => 'Saya senang bekerja dalam tim',
                'bobot_minat' => 0,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa mengatur waktu dengan baik',
                'bobot_minat' => 0,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang belajar hal-hal baru',
                'bobot_minat' => 0,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa beradaptasi dengan perubahan',
                'bobot_minat' => 0,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya memiliki motivasi yang tinggi untuk sukses',
                'bobot_minat' => 0,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === TEKNOLOGI INFORMASI ===
            [
                'text_soal' => 'Saya tertarik dengan perkembangan artificial intelligence',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menggunakan berbagai software komputer',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang mengikuti perkembangan teknologi terbaru',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami logika pemrograman',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan cybersecurity dan keamanan data',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === BISNIS DAN EKONOMI ===
            [
                'text_soal' => 'Saya tertarik dengan dunia investasi dan pasar modal',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menganalisis data keuangan',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang membaca berita ekonomi dan bisnis',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah membuat perencanaan bisnis',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan digital marketing dan e-commerce',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === KESEHATAN DAN KEDOKTERAN ===
            [
                'text_soal' => 'Saya tertarik dengan anatomi tubuh manusia',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mengingat istilah medis',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang membantu orang lain yang sedang sakit',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami konsep biologi',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan farmasi dan obat-obatan',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === SENI DAN DESAIN ===
            [
                'text_soal' => 'Saya tertarik dengan dunia fotografi dan videografi',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menggambar dan melukis',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang mengikuti perkembangan tren desain',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menggunakan software desain grafis',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan arsitektur dan interior design',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === PENDIDIKAN DAN SOSIAL ===
            [
                'text_soal' => 'Saya tertarik dengan dunia pendidikan dan mengajar',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menjelaskan konsep kepada orang lain',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang bekerja dengan anak-anak',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami psikologi manusia',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan konseling dan bimbingan',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === TEKNIK DAN ILMU ALAM ===
            [
                'text_soal' => 'Saya tertarik dengan dunia robotika dan otomasi',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami konsep fisika',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang melakukan eksperimen ilmiah',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami konsep kimia',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan renewable energy dan lingkungan',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === HUKUM DAN SOSIAL ===
            [
                'text_soal' => 'Saya tertarik dengan dunia hukum dan perundang-undangan',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menganalisis kasus hukum',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang membaca berita politik dan sosial',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah berdebat dan berargumentasi',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan hubungan internasional',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === KOMUNIKASI DAN MEDIA ===
            [
                'text_soal' => 'Saya tertarik dengan dunia jurnalistik dan media',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah menulis artikel dan berita',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang melakukan wawancara dan investigasi',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah berbicara di depan umum',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan public relations dan branding',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === PERTANIAN DAN PETERNAKAN ===
            [
                'text_soal' => 'Saya tertarik dengan teknologi pertanian modern',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami konsep biologi tanaman',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang bekerja di lingkungan alam',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mengelola peternakan',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan agribisnis dan agroindustri',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === KELAUTAN DAN PERIKANAN ===
            [
                'text_soal' => 'Saya tertarik dengan ekosistem laut dan biota laut',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah memahami konsep oseanografi',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang melakukan penelitian di laut',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mengelola budidaya perikanan',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan teknologi kelautan',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === PARIWISATA DAN HOSPITALITY ===
            [
                'text_soal' => 'Saya tertarik dengan dunia pariwisata dan travel',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah berkomunikasi dalam bahasa asing',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang melayani dan membantu tamu',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mengelola acara dan event',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan manajemen hotel dan resort',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],

            // === TRANSPORTASI DAN LOGISTIK ===
            [
                'text_soal' => 'Saya tertarik dengan dunia transportasi dan logistik',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah merencanakan rute transportasi',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya senang mengelola supply chain',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya bisa dengan mudah mengoptimalkan proses logistik',
                'bobot_minat' => 0,
                'bobot_bakat' => 1,
                'author' => 'System'
            ],
            [
                'text_soal' => 'Saya tertarik dengan teknologi transportasi masa depan',
                'bobot_minat' => 1,
                'bobot_bakat' => 0,
                'author' => 'System'
            ],
        ];

        foreach ($soal as $item) {
            DB::table('tabel_soal')->insert([
                'text_soal' => $item['text_soal'],
                'bobot_minat' => $item['bobot_minat'],
                'bobot_bakat' => $item['bobot_bakat'],
                'author' => $item['author'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $this->command->info('Soal seeder berhasil dijalankan! Total soal: ' . count($soal));
    }
}
