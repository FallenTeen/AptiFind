<?php

namespace Database\Factories;

use App\Models\PerguruanTinggi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProgramStudi>
 */
class ProgramStudiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenjang = $this->faker->randomElement(['S1', 'S2', 'S3', 'D3', 'D4']);
        $nama = $this->faker->randomElement([
            'Teknik Informatika',
            'Sistem Informasi',
            'Manajemen Informatika',
            'Teknik Komputer',
            'Ilmu Komputer',
            'Teknik Elektro',
            'Teknik Mesin',
            'Teknik Sipil',
            'Arsitektur',
            'Desain Komunikasi Visual',
            'Ekonomi',
            'Manajemen',
            'Akuntansi',
            'Hukum',
            'Psikologi',
            'Kedokteran',
            'Farmasi',
            'Keperawatan'
        ]);

        return [
            'nama' => $nama,
            'jenjang' => $jenjang,
            'kode_prodi' => strtoupper(substr($nama, 0, 2) . $jenjang . $this->faker->randomNumber(2)),
            'perguruan_tinggi_id' => PerguruanTinggi::factory(),
            'deskripsi' => $this->faker->paragraph(),
            'status' => 'aktif',
        ];
    }

    /**
     * Indicate that the program studi is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'nonaktif',
        ]);
    }
} 