<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class MultiStepRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_step1_register_basic_info()
    {
        $response = $this->postJson('/api/v1/register/step1', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);
        $response->assertStatus(200)->assertJsonStructure(['step', 'user_id']);
    }

    public function test_step2_register_university_and_program()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->postJson('/api/v1/register/step2', [
            'perguruan_tinggi_id' => 1,
            'program_studi_id' => 1,
        ]);
        $response->assertStatus(200)->assertJson(['step' => 3]);
    }

    public function test_step3_register_tech_profile()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->postJson('/api/v1/register/step3', [
            'tech_profile' => ['os' => 'Windows', 'browser' => 'Chrome'],
        ]);
        $response->assertStatus(200)->assertJson(['step' => 4]);
    }

    public function test_complete_registration()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $response = $this->postJson('/api/v1/register/complete');
        $response->assertStatus(200)->assertJson(['success' => true]);
    }
} 