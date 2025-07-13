<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\KriteriaEvaluasiSearch;
use Illuminate\Foundation\Testing\RefreshDatabase;

class KriteriaEvaluasiSearchTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_kriteria()
    {
        $kriteria = KriteriaEvaluasiSearch::create([
            'nama_kriteria' => 'Relevansi',
            'bobot_kriteria' => 0.2,
            'deskripsi' => 'Tes',
            'kategori' => 'content',
            'status' => true,
        ]);
        $this->assertDatabaseHas('kriteria_evaluasi_search', [
            'nama_kriteria' => 'Relevansi',
        ]);
    }
} 