<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\EvaluasiSearchEngine;
use App\Models\User;
use App\Models\PerguruanTinggi;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EvaluasiSearchEngineTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_evaluasi()
    {
        $user = User::factory()->create();
        $pt = PerguruanTinggi::factory()->create();
        $evaluasi = EvaluasiSearchEngine::create([
            'user_id' => $user->id,
            'perguruan_tinggi_id' => $pt->id,
            'kemudahan_pencarian' => 4,
            'kecepatan_loading' => 4,
            'relevansi_hasil' => 4,
            'kelengkapan_informasi' => 4,
            'tampilan_visual' => 4,
            'kemudahan_navigasi' => 4,
            'skor_total' => 24,
            'kategori_kualitas' => 'baik',
            'waktu_evaluasi' => now(),
        ]);
        $this->assertDatabaseHas('evaluasi_search_engine', [
            'user_id' => $user->id,
            'perguruan_tinggi_id' => $pt->id,
        ]);
    }
} 