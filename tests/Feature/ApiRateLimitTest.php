<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class ApiRateLimitTest extends TestCase
{
    use RefreshDatabase;

    public function test_evaluation_limit()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        for ($i = 0; $i < 10; $i++) {
            $this->postJson('/api/v1/evaluasi', [
                'perguruan_tinggi_id' => 1,
                'skenario_pencarian_id' => 1,
                'kriteria' => [
                    ['id' => 1, 'skor' => 4],
                ],
            ]);
        }
        $response = $this->postJson('/api/v1/evaluasi', [
            'perguruan_tinggi_id' => 1,
            'skenario_pencarian_id' => 1,
            'kriteria' => [
                ['id' => 1, 'skor' => 4],
            ],
        ]);
        $response->assertStatus(429);
    }
} 