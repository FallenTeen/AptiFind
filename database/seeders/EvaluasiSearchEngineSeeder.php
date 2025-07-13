<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EvaluasiSearchEngine;
use App\Models\User;
use App\Models\PerguruanTinggi;

class EvaluasiSearchEngineSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $universitas = PerguruanTinggi::first();
        if ($user && $universitas) {
            EvaluasiSearchEngine::create([
                'user_id' => $user->id,
                'universitas_id' => $universitas->id,
                'url_website' => $universitas->url_website ?? 'https://example.com',
                'skor_akurat' => 4,
                'skor_relevan' => 5,
                'skor_terpercaya' => 4,
                'komentar' => 'Informasi sangat membantu dan terpercaya.'
            ]);
        }
    }
}
