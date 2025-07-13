<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\PerguruanTinggi;
use App\Models\SkenarioPencarian;
use App\Models\KriteriaEvaluasiSearch;

class EvaluasiSearchEngineTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_evaluasi()
    {
        $user = User::factory()->create();
        $pt = PerguruanTinggi::factory()->create();
        $skenario = SkenarioPencarian::factory()->create();
        $kriteria = KriteriaEvaluasiSearch::factory()->count(3)->create();
        $this->actingAs($user);
        $response = $this->postJson('/api/v1/evaluasi', [
            'perguruan_tinggi_id' => $pt->id,
            'skenario_pencarian_id' => $skenario->id,
            'kriteria' => $kriteria->map(fn($k) => ['id' => $k->id, 'skor' => 4])->toArray(),
        ]);
        $response->assertStatus(200)->assertJsonStructure(['id', 'user', 'perguruan_tinggi', 'skenario', 'skor_total', 'kategori_kualitas', 'waktu_evaluasi', 'detail']);
    }
} 