<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Models\PerguruanTinggi;
use App\Models\ProgramStudi;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_page_can_be_rendered(): void
    {
        $response = $this->get(route('register'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('auth/register'));
    }

    public function test_new_users_can_register_as_calon_mahasiswa(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'calon_mahasiswa',
            'jenis_kelamin' => 'laki_laki',
            'tanggal_lahir' => '2000-01-01',
            'tempat_lahir' => 'Jakarta',
            'alamat' => 'Jl. Test No. 123',
            'kota' => 'Jakarta',
            'provinsi' => 'DKI Jakarta',
            'kode_pos' => '12345',
            'no_hp' => '08123456789',
            'asal_sekolah' => 'SMA Test',
            'jurusan_sekolah' => 'IPA',
            'tahun_lulus_sekolah' => '2023',
            'nilai_un' => '85.5',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'status' => 'calon_mahasiswa',
            'asal_sekolah' => 'SMA Test',
            'jurusan_sekolah' => 'IPA',
            'tahun_lulus_sekolah' => '2023',
            'nilai_un' => '85.5',
        ]);

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user->username);
        $this->assertEquals('test', $user->username);
    }

    public function test_new_users_can_register_as_mahasiswa_aktif(): void
    {
        // Create perguruan tinggi and program studi for testing
        $perguruanTinggi = PerguruanTinggi::factory()->create([
            'status' => 'aktif'
        ]);
        
        $programStudi = ProgramStudi::factory()->create([
            'perguruan_tinggi_id' => $perguruanTinggi->id,
            'status' => 'aktif'
        ]);

        $response = $this->post(route('register'), [
            'name' => 'Test Mahasiswa',
            'email' => 'mahasiswa@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'mahasiswa_aktif',
            'jenis_kelamin' => 'perempuan',
            'tanggal_lahir' => '2000-01-01',
            'tempat_lahir' => 'Bandung',
            'alamat' => 'Jl. Mahasiswa No. 456',
            'kota' => 'Bandung',
            'provinsi' => 'Jawa Barat',
            'kode_pos' => '54321',
            'no_hp' => '08987654321',
            'perguruan_tinggi_id' => $perguruanTinggi->id,
            'program_studi_id' => $programStudi->id,
            'nim' => '2023001',
            'angkatan' => '2023',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'name' => 'Test Mahasiswa',
            'email' => 'mahasiswa@example.com',
            'status' => 'mahasiswa_aktif',
            'perguruan_tinggi_id' => $perguruanTinggi->id,
            'program_studi_id' => $programStudi->id,
            'nim' => '2023001',
            'angkatan' => '2023',
        ]);

        $user = User::where('email', 'mahasiswa@example.com')->first();
        $this->assertNotNull($user->username);
        $this->assertEquals('mahasiswa', $user->username);
    }

    public function test_registration_requires_valid_email(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'invalid-email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'calon_mahasiswa',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_registration_requires_unique_email(): void
    {
        User::factory()->create(['email' => 'test@example.com']);

        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'calon_mahasiswa',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    public function test_registration_requires_password_confirmation(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'different-password',
            'status' => 'calon_mahasiswa',
        ]);

        $response->assertSessionHasErrors(['password']);
        $this->assertGuest();
    }

    public function test_mahasiswa_aktif_requires_perguruan_tinggi_and_program_studi(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'mahasiswa_aktif',
            // Missing perguruan_tinggi_id and program_studi_id
        ]);

        $response->assertSessionHasErrors(['perguruan_tinggi_id', 'program_studi_id']);
        $this->assertGuest();
    }

    public function test_mahasiswa_aktif_requires_valid_perguruan_tinggi(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'mahasiswa_aktif',
            'perguruan_tinggi_id' => 999, // Non-existent ID
            'program_studi_id' => 1,
        ]);

        $response->assertSessionHasErrors(['perguruan_tinggi_id']);
        $this->assertGuest();
    }

    public function test_mahasiswa_aktif_requires_valid_program_studi(): void
    {
        $perguruanTinggi = PerguruanTinggi::factory()->create();

        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'mahasiswa_aktif',
            'perguruan_tinggi_id' => $perguruanTinggi->id,
            'program_studi_id' => 999, // Non-existent ID
        ]);

        $response->assertSessionHasErrors(['program_studi_id']);
        $this->assertGuest();
    }

    public function test_username_is_generated_automatically(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'calon_mahasiswa',
        ]);

        $response->assertRedirect(route('dashboard'));

        $user = User::where('email', 'test@example.com')->first();
        $this->assertNotNull($user->username);
        $this->assertEquals('test', $user->username);
    }

    public function test_username_is_unique_when_duplicate_email_base(): void
    {
        // Create first user
        User::factory()->create(['email' => 'test@example.com', 'username' => 'test']);

        // Try to register with similar email
        $response = $this->post(route('register'), [
            'name' => 'Test User 2',
            'email' => 'test@different.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'calon_mahasiswa',
        ]);

        $response->assertRedirect(route('dashboard'));

        $user = User::where('email', 'test@different.com')->first();
        $this->assertNotNull($user->username);
        $this->assertEquals('test1', $user->username); // Should append number
    }

    public function test_calon_mahasiswa_optional_fields_are_saved(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'calon_mahasiswa',
            'asal_sekolah' => 'SMA Negeri 1',
            'jurusan_sekolah' => 'IPA',
            'tahun_lulus_sekolah' => '2023',
            'nilai_un' => '85.5',
            'nilai_rapor' => '88.0',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'asal_sekolah' => 'SMA Negeri 1',
            'jurusan_sekolah' => 'IPA',
            'tahun_lulus_sekolah' => '2023',
            'nilai_un' => '85.5',
            'nilai_rapor' => '88.0',
        ]);
    }

    public function test_mahasiswa_aktif_optional_fields_are_saved(): void
    {
        $perguruanTinggi = PerguruanTinggi::factory()->create(['status' => 'aktif']);
        $programStudi = ProgramStudi::factory()->create([
            'perguruan_tinggi_id' => $perguruanTinggi->id,
            'status' => 'aktif'
        ]);

        $response = $this->post(route('register'), [
            'name' => 'Test Mahasiswa',
            'email' => 'mahasiswa@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'status' => 'mahasiswa_aktif',
            'perguruan_tinggi_id' => $perguruanTinggi->id,
            'program_studi_id' => $programStudi->id,
            'nim' => '2023001',
            'jenis_kelamin' => 'laki_laki',
            'tanggal_lahir' => '2000-01-01 00:00:00',
            'tempat_lahir' => 'Jakarta',
            'alamat' => 'Jl. Test No. 123',
            'kota' => 'Jakarta',
            'provinsi' => 'DKI Jakarta',
            'kode_pos' => '12345',
            'no_hp' => '08123456789',
            'angkatan' => '2023',
        ]);

        $response->assertRedirect(route('dashboard'));

        $this->assertDatabaseHas('users', [
            'email' => 'mahasiswa@example.com',
            'nim' => '2023001',
            'jenis_kelamin' => 'laki_laki',
            'tanggal_lahir' => '2000-01-01 00:00:00',
            'tempat_lahir' => 'Jakarta',
            'alamat' => 'Jl. Test No. 123',
            'kota' => 'Jakarta',
            'provinsi' => 'DKI Jakarta',
            'kode_pos' => '12345',
            'no_hp' => '08123456789',
            'angkatan' => '2023',
        ]);
    }
}