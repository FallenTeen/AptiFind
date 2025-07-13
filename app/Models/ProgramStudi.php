<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProgramStudi extends Model
{
    use HasFactory;

    protected $table = 'program_studi';

    protected $fillable = [
        'perguruan_tinggi_id',
        'nama',
        'jenjang',
        'kode_prodi',
        'akreditasi',
        'kuota_mahasiswa',
        'biaya_kuliah',
        'deskripsi',
        'prospek_karir',
        'status',
        'total_minat'
    ];

    protected $casts = [
        'biaya_kuliah' => 'decimal:2',
        'kuota_mahasiswa' => 'integer',
        'total_minat' => 'integer',
    ];

    // Relasi
    public function perguruanTinggi(): BelongsTo
    {
        return $this->belongsTo(PerguruanTinggi::class, 'perguruan_tinggi_id');
    }

    public function minatProgramStudi(): HasMany
    {
        return $this->hasMany(MinatProgramStudi::class, 'program_studi_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'program_studi_id');
    }

    public function hasilPenelitian(): HasMany
    {
        return $this->hasMany(HasilPenelitian::class, 'program_studi_id');
    }

    // Accessor & Mutator
    public function getNamaLengkapAttribute(): string
    {
        return $this->jenjang . ' ' . $this->nama;
    }

    public function getBiayaKuliahFormattedAttribute(): string
    {
        if ($this->biaya_kuliah) {
            return 'Rp ' . number_format((float) $this->biaya_kuliah, 0, ',', '.');
        }
        return 'Belum ditentukan';
    }

    public function getAkreditasiFormattedAttribute(): string
    {
        if ($this->akreditasi === 'belum') {
            return 'Belum Terakreditasi';
        }
        return 'Akreditasi ' . $this->akreditasi;
    }

    public function getStatusFormattedAttribute(): string
    {
        return $this->status === 'aktif' ? 'Aktif' : 'Nonaktif';
    }

    public function getJenjangFormattedAttribute(): string
    {
        $jenjangMap = [
            'D3' => 'Diploma 3',
            'D4' => 'Diploma 4',
            'S1' => 'Sarjana',
            'S2' => 'Magister',
            'S3' => 'Doktor'
        ];

        return $jenjangMap[$this->jenjang] ?? $this->jenjang;
    }

    public function getTingkatMinatAttribute(): string
    {
        if ($this->total_minat >= 50) return 'Sangat Tinggi';
        if ($this->total_minat >= 30) return 'Tinggi';
        if ($this->total_minat >= 15) return 'Sedang';
        if ($this->total_minat >= 5) return 'Rendah';
        return 'Sangat Rendah';
    }

    // Scopes
    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    public function scopeByJenjang($query, $jenjang)
    {
        return $query->where('jenjang', $jenjang);
    }

    public function scopeByAkreditasi($query, $akreditasi)
    {
        return $query->where('akreditasi', $akreditasi);
    }

    public function scopeByPT($query, $ptId)
    {
        return $query->where('perguruan_tinggi_id', $ptId);
    }

    public function scopePopular($query, $limit = 10)
    {
        return $query->orderBy('total_minat', 'desc')->limit($limit);
    }

    public function scopeS1($query)
    {
        return $query->where('jenjang', 'S1');
    }

    public function scopeD3($query)
    {
        return $query->where('jenjang', 'D3');
    }

    public function scopeD4($query)
    {
        return $query->where('jenjang', 'D4');
    }

    // Methods
    public function updateTotalMinat(): void
    {
        $total = $this->minatProgramStudi()->count();
        $this->update(['total_minat' => $total]);
    }

    public function getRataRataSkorMinatAttribute(): float
    {
        return $this->minatProgramStudi()->avg('skor_minat') ?? 0;
    }

    public function getRataRataSkorBakatAttribute(): float
    {
        return $this->minatProgramStudi()->avg('skor_bakat') ?? 0;
    }

    public function getTotalMahasiswaAttribute(): int
    {
        return $this->users()->where('status', 'mahasiswa_aktif')->count();
    }

    public function getPersentaseTerisiAttribute(): float
    {
        if ($this->kuota_mahasiswa > 0) {
            return round(($this->total_mahasiswa / $this->kuota_mahasiswa) * 100, 2);
        }
        return 0;
    }

    public function isPopular(): bool
    {
        return $this->total_minat >= 20;
    }

    public function isAvailable(): bool
    {
        return $this->status === 'aktif' && $this->persentase_terisi < 100;
    }
}
