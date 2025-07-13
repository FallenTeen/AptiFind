<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MinatProgramStudi extends Model
{
    use HasFactory;

    protected $table = 'minat_program_studi';
    
    protected $fillable = [
        'user_id',
        'program_studi_id',
        'skor_minat',
        'skor_bakat',
        'tingkat_minat',
        'tingkat_bakat',
        'alasan_minat',
        'alasan_bakat',
        'is_rekomendasi',
        'urutan_prioritas',
        'waktu_tes'
    ];

    protected $casts = [
        'skor_minat' => 'integer',
        'skor_bakat' => 'integer',
        'is_rekomendasi' => 'boolean',
        'urutan_prioritas' => 'integer',
        'waktu_tes' => 'datetime',
    ];

    // Relasi
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(ProgramStudi::class, 'program_studi_id');
    }

    // Accessor & Mutator
    public function getTingkatMinatAttribute($value): string
    {
        if ($value) {
            return $value;
        }
        
        // Auto-calculate tingkat minat
        if ($this->skor_minat >= 80) return 'sangat_tinggi';
        if ($this->skor_minat >= 60) return 'tinggi';
        if ($this->skor_minat >= 40) return 'sedang';
        if ($this->skor_minat >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    public function getTingkatBakatAttribute($value): string
    {
        if ($value) {
            return $value;
        }
        
        // Auto-calculate tingkat bakat
        if ($this->skor_bakat >= 80) return 'sangat_tinggi';
        if ($this->skor_bakat >= 60) return 'tinggi';
        if ($this->skor_bakat >= 40) return 'sedang';
        if ($this->skor_bakat >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    public function getTingkatMinatFormattedAttribute(): string
    {
        $tingkatMap = [
            'sangat_tinggi' => 'Sangat Tinggi',
            'tinggi' => 'Tinggi',
            'sedang' => 'Sedang',
            'rendah' => 'Rendah',
            'sangat_rendah' => 'Sangat Rendah'
        ];
        
        return $tingkatMap[$this->tingkat_minat] ?? 'Tidak Diketahui';
    }

    public function getTingkatBakatFormattedAttribute(): string
    {
        $tingkatMap = [
            'sangat_tinggi' => 'Sangat Tinggi',
            'tinggi' => 'Tinggi',
            'sedang' => 'Sedang',
            'rendah' => 'Rendah',
            'sangat_rendah' => 'Sangat Rendah'
        ];
        
        return $tingkatMap[$this->tingkat_bakat] ?? 'Tidak Diketahui';
    }

    public function getWaktuTesFormattedAttribute(): string
    {
        return $this->waktu_tes ? $this->waktu_tes->format('d M Y H:i') : '-';
    }

    public function getSkorTotalAttribute(): int
    {
        return $this->skor_minat + $this->skor_bakat;
    }

    public function getRataRataSkorAttribute(): float
    {
        return round(($this->skor_minat + $this->skor_bakat) / 2, 2);
    }

    public function getPersentaseMinatAttribute(): float
    {
        return round(($this->skor_minat / 100) * 100, 2);
    }

    public function getPersentaseBakatAttribute(): float
    {
        return round(($this->skor_bakat / 100) * 100, 2);
    }

    // Scopes
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByProgramStudi($query, $prodiId)
    {
        return $query->where('program_studi_id', $prodiId);
    }

    public function scopeRekomendasi($query)
    {
        return $query->where('is_rekomendasi', true);
    }

    public function scopeByTingkatMinat($query, $tingkat)
    {
        return $query->where('tingkat_minat', $tingkat);
    }

    public function scopeByTingkatBakat($query, $tingkat)
    {
        return $query->where('tingkat_bakat', $tingkat);
    }

    public function scopeSangatTinggi($query)
    {
        return $query->where(function($q) {
            $q->where('tingkat_minat', 'sangat_tinggi')
              ->orWhere('tingkat_bakat', 'sangat_tinggi');
        });
    }

    public function scopeTinggi($query)
    {
        return $query->where(function($q) {
            $q->where('tingkat_minat', 'tinggi')
              ->orWhere('tingkat_bakat', 'tinggi');
        });
    }

    // Methods
    public function calculateTingkatMinat(): string
    {
        if ($this->skor_minat >= 80) return 'sangat_tinggi';
        if ($this->skor_minat >= 60) return 'tinggi';
        if ($this->skor_minat >= 40) return 'sedang';
        if ($this->skor_minat >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    public function calculateTingkatBakat(): string
    {
        if ($this->skor_bakat >= 80) return 'sangat_tinggi';
        if ($this->skor_bakat >= 60) return 'tinggi';
        if ($this->skor_bakat >= 40) return 'sedang';
        if ($this->skor_bakat >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    public function isHighInterest(): bool
    {
        return in_array($this->tingkat_minat, ['sangat_tinggi', 'tinggi']);
    }

    public function isHighTalent(): bool
    {
        return in_array($this->tingkat_bakat, ['sangat_tinggi', 'tinggi']);
    }

    public function isRecommended(): bool
    {
        return $this->is_rekomendasi;
    }

    public function getPriorityLevel(): string
    {
        if ($this->urutan_prioritas <= 3) return 'Tinggi';
        if ($this->urutan_prioritas <= 6) return 'Sedang';
        return 'Rendah';
    }

    // Boot method untuk auto-calculate
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($minat) {
            if (!$minat->tingkat_minat) {
                $minat->tingkat_minat = $minat->calculateTingkatMinat();
            }
            
            if (!$minat->tingkat_bakat) {
                $minat->tingkat_bakat = $minat->calculateTingkatBakat();
            }
            
            if (!$minat->waktu_tes) {
                $minat->waktu_tes = now();
            }
        });

        static::saved(function ($minat) {
            // Update program studi total minat
            $minat->programStudi->updateTotalMinat();
        });
    }
}
