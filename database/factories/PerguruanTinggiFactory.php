<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PerguruanTinggi>
 */
class PerguruanTinggiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis = $this->faker->randomElement(['negeri', 'swasta']);
        $nama = $this->faker->randomElement([
            'Universitas Indonesia',
            'Institut Teknologi Bandung',
            'Universitas Gadjah Mada',
            'Institut Pertanian Bogor',
            'Universitas Airlangga',
            'Universitas Diponegoro',
            'Universitas Brawijaya',
            'Universitas Padjadjaran',
            'Universitas Hasanuddin',
            'Universitas Andalas'
        ]);

        return [
            'nama' => $nama,
            'akronim' => strtoupper(substr($nama, 0, 2) . $this->faker->randomLetter() . $this->faker->randomLetter()),
            'jenis' => $jenis,
            'alamat' => $this->faker->address(),
            'kota' => $this->faker->city(),
            'provinsi' => $this->faker->state(),
            'kode_pos' => $this->faker->postcode(),
            'no_telp' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'website' => $this->faker->url(),
            'deskripsi' => $this->faker->paragraph(),
            'status' => 'aktif',
        ];
    }

    /**
     * Indicate that the perguruan tinggi is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'nonaktif',
        ]);
    }
} 