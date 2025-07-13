<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PerguruanTinggi extends Model
{
    use HasFactory;

    protected $table = 'perguruan_tinggi';
    
    protected $fillable = [
        'nama',
        'akronim',
        'jenis',
        'alamat',
        'kota',
        'provinsi',
        'kode_pos',
        'telepon',
        'email',
        'website',
        'logo',
        'deskripsi',
        'status',
        'rating_average',
        'total_evaluasi'
    ];

    protected $casts = [
        'rating_average' => 'decimal:2',
        'total_evaluasi' => 'integer',
    ];

    // Relasi
    public function programStudi(): HasMany
    {
        return $this->hasMany(ProgramStudi::class, 'perguruan_tinggi_id');
    }

    public function evaluasiSearchEngine(): HasMany
    {
        return $this->hasMany(EvaluasiSearchEngine::class, 'perguruan_tinggi_id');
    }

    public function interaksiSearchEngine(): HasMany
    {
        return $this->hasMany(InteraksiSearchEngine::class, 'perguruan_tinggi_id');
    }

    public function hasilPenelitian(): HasMany
    {
        return $this->hasMany(HasilPenelitian::class, 'perguruan_tinggi_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class, 'perguruan_tinggi_id');
    }

    // Accessor & Mutator
    public function getLogoUrlAttribute(): string
    {
        if ($this->logo) {
            return asset('storage/' . $this->logo);
        }
        return asset('images/default-logo.png');
    }

    public function getWebsiteUrlAttribute(): string
    {
        if ($this->website) {
            if (!str_starts_with($this->website, 'http')) {
                return 'https://' . $this->website;
            }
            return $this->website;
        }
        return '#';
    }

    public function getRatingAverageAttribute($value): float
    {
        return round($value, 2);
    }

    public function getKategoriRatingAttribute(): string
    {
        $rating = $this->rating_average;
        
        if ($rating >= 4.5) return 'Sangat Baik';
        if ($rating >= 3.5) return 'Baik';
        if ($rating >= 2.5) return 'Sedang';
        if ($rating >= 1.5) return 'Kurang';
        return 'Sangat Kurang';
    }

    public function getJenisFormattedAttribute(): string
    {
        return ucfirst($this->jenis);
    }

    public function getStatusFormattedAttribute(): string
    {
        return $this->status === 'aktif' ? 'Aktif' : 'Nonaktif';
    }

    public function getAlamatLengkapAttribute(): string
    {
        $alamat = $this->alamat;
        if ($this->kota) {
            $alamat .= ', ' . $this->kota;
        }
        if ($this->provinsi) {
            $alamat .= ', ' . $this->provinsi;
        }
        if ($this->kode_pos) {
            $alamat .= ' ' . $this->kode_pos;
        }
        return $alamat;
    }

    // Scopes
    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    public function scopeNegeri($query)
    {
        return $query->where('jenis', 'negeri');
    }

    public function scopeSwasta($query)
    {
        return $query->where('jenis', 'swasta');
    }

    public function scopeByKota($query, $kota)
    {
        return $query->where('kota', $kota);
    }

    public function scopeByProvinsi($query, $provinsi)
    {
        return $query->where('provinsi', $provinsi);
    }

    public function scopeTopRated($query, $limit = 10)
    {
        return $query->orderBy('rating_average', 'desc')->limit($limit);
    }

    // Methods
    public function updateRatingAverage(): void
    {
        $average = $this->evaluasiSearchEngine()
            ->whereNotNull('skor_total')
            ->avg('skor_total');
        
        $this->update([
            'rating_average' => $average ? round($average / 6, 2) : 0,
            'total_evaluasi' => $this->evaluasiSearchEngine()->count()
        ]);
    }

    public function getProgramStudiAktifAttribute()
    {
        return $this->programStudi()->where('status', 'aktif')->get();
    }

    public function getTotalProgramStudiAttribute(): int
    {
        return $this->programStudi()->where('status', 'aktif')->count();
    }

    public function getTotalMahasiswaAttribute(): int
    {
        return $this->users()->where('status', 'mahasiswa_aktif')->count();
    }
}
