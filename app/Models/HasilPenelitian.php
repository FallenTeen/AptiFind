<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HasilPenelitian extends Model
{
    use HasFactory;

    protected $table = 'hasil_penelitian';

    protected $fillable = [
        'user_id',
        'perguruan_tinggi_id',
        'program_studi_id',
        'skor_evaluasi_search_engine',
        'kategori_kualitas_search',
        'skor_minat',
        'skor_bakat',
        'tingkat_minat',
        'tingkat_bakat',
        'korelasi_search_minat',
        'korelasi_search_bakat',
        'pengaruh_kualitas',
        'durasi_interaksi_detik',
        'jumlah_klik',
        'jumlah_halaman_dikunjungi',
        'meningkatkan_minat',
        'meningkatkan_bakat',
        'kesimpulan',
        'rekomendasi',
        'waktu_penelitian'
    ];

    protected $casts = [
        'skor_evaluasi_search_engine' => 'integer',
        'skor_minat' => 'integer',
        'skor_bakat' => 'integer',
        'korelasi_search_minat' => 'decimal:3',
        'korelasi_search_bakat' => 'decimal:3',
        'durasi_interaksi_detik' => 'integer',
        'jumlah_klik' => 'integer',
        'jumlah_halaman_dikunjungi' => 'integer',
        'meningkatkan_minat' => 'boolean',
        'meningkatkan_bakat' => 'boolean',
        'waktu_penelitian' => 'datetime',
    ];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function perguruanTinggi(): BelongsTo
    {
        return $this->belongsTo(PerguruanTinggi::class, 'perguruan_tinggi_id');
    }

    public function programStudi(): BelongsTo
    {
        return $this->belongsTo(ProgramStudi::class, 'program_studi_id');
    }


    public function getKategoriKualitasSearchFormattedAttribute(): string
    {
        $kategoriMap = [
            'sangat_baik' => 'Sangat Baik',
            'baik' => 'Baik',
            'sedang' => 'Sedang',
            'kurang' => 'Kurang',
            'sangat_kurang' => 'Sangat Kurang'
        ];

        return $kategoriMap[$this->kategori_kualitas_search] ?? 'Tidak Diketahui';
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

    public function getPengaruhKualitasFormattedAttribute(): string
    {
        $pengaruhMap = [
            'positif_kuat' => 'Positif Kuat',
            'positif_lemah' => 'Positif Lemah',
            'netral' => 'Netral',
            'negatif_lemah' => 'Negatif Lemah',
            'negatif_kuat' => 'Negatif Kuat'
        ];

        return $pengaruhMap[$this->pengaruh_kualitas] ?? 'Tidak Diketahui';
    }

    public function getWaktuPenelitianFormattedAttribute(): string
    {
        return $this->waktu_penelitian ? $this->waktu_penelitian->format('d M Y H:i') : '-';
    }

    public function getDurasiInteraksiFormattedAttribute(): string
    {
        if (!$this->durasi_interaksi_detik) {
            return '-';
        }

        $jam = floor($this->durasi_interaksi_detik / 3600);
        $menit = floor(($this->durasi_interaksi_detik % 3600) / 60);
        $detik = $this->durasi_interaksi_detik % 60;

        if ($jam > 0) {
            return sprintf('%02d:%02d:%02d', $jam, $menit, $detik);
        }

        return sprintf('%02d:%02d', $menit, $detik);
    }

    public function getSkorTotalMinatBakatAttribute(): int
    {
        return $this->skor_minat + $this->skor_bakat;
    }

    public function getRataRataSkorMinatBakatAttribute(): float
    {
        return round(($this->skor_minat + $this->skor_bakat) / 2, 2);
    }

    public function getPersentaseEvaluasiSearchAttribute(): float
    {
        return round(($this->skor_evaluasi_search_engine / 30) * 100, 2);
    }

    public function getPersentaseMinatAttribute(): float
    {
        return round(($this->skor_minat / 100) * 100, 2);
    }

    public function getPersentaseBakatAttribute(): float
    {
        return round(($this->skor_bakat / 100) * 100, 2);
    }


    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByPT($query, $ptId)
    {
        return $query->where('perguruan_tinggi_id', $ptId);
    }

    public function scopeByProgramStudi($query, $prodiId)
    {
        return $query->where('program_studi_id', $prodiId);
    }

    public function scopeByPengaruhKualitas($query, $pengaruh)
    {
        return $query->where('pengaruh_kualitas', $pengaruh);
    }

    public function scopePositif($query)
    {
        return $query->whereIn('pengaruh_kualitas', ['positif_kuat', 'positif_lemah']);
    }

    public function scopeNegatif($query)
    {
        return $query->whereIn('pengaruh_kualitas', ['negatif_kuat', 'negatif_lemah']);
    }

    public function scopeNetral($query)
    {
        return $query->where('pengaruh_kualitas', 'netral');
    }

    public function scopeMeningkatkanMinat($query)
    {
        return $query->where('meningkatkan_minat', true);
    }

    public function scopeMeningkatkanBakat($query)
    {
        return $query->where('meningkatkan_bakat', true);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('waktu_penelitian', [$startDate, $endDate]);
    }


    public function calculateKorelasiSearchMinat(): float
    {
        $searchScore = $this->skor_evaluasi_search_engine / 30;
        $minatScore = $this->skor_minat / 100;

        $correlation = ($searchScore + $minatScore) / 2;
        return round($correlation, 3);
    }

    public function calculateKorelasiSearchBakat(): float
    {
        $searchScore = $this->skor_evaluasi_search_engine / 30;
        $bakatScore = $this->skor_bakat / 100;

        $correlation = ($searchScore + $bakatScore) / 2;
        return round($correlation, 3);
    }

    public function determinePengaruhKualitas(): string
    {
        $avgCorrelation = ($this->korelasi_search_minat + $this->korelasi_search_bakat) / 2;

        if ($avgCorrelation >= 0.7) return 'positif_kuat';
        if ($avgCorrelation >= 0.5) return 'positif_lemah';
        if ($avgCorrelation >= 0.3) return 'netral';
        if ($avgCorrelation >= 0.1) return 'negatif_lemah';
        return 'negatif_kuat';
    }

    public function isPositiveImpact(): bool
    {
        return in_array($this->pengaruh_kualitas, ['positif_kuat', 'positif_lemah']);
    }

    public function isNegativeImpact(): bool
    {
        return in_array($this->pengaruh_kualitas, ['negatif_kuat', 'negatif_lemah']);
    }

    public function isNeutralImpact(): bool
    {
        return $this->pengaruh_kualitas === 'netral';
    }

    public function hasHighSearchQuality(): bool
    {
        return in_array($this->kategori_kualitas_search, ['sangat_baik', 'baik']);
    }

    public function hasHighInterest(): bool
    {
        return in_array($this->tingkat_minat, ['sangat_tinggi', 'tinggi']);
    }

    public function hasHighTalent(): bool
    {
        return in_array($this->tingkat_bakat, ['sangat_tinggi', 'tinggi']);
    }

    public function generateKesimpulan(): string
    {
        $kesimpulan = [];

        if ($this->isPositiveImpact()) {
            $kesimpulan[] = "Kualitas search engine memiliki pengaruh positif terhadap minat dan bakat.";
        } elseif ($this->isNegativeImpact()) {
            $kesimpulan[] = "Kualitas search engine memiliki pengaruh negatif terhadap minat dan bakat.";
        } else {
            $kesimpulan[] = "Kualitas search engine tidak memiliki pengaruh signifikan terhadap minat dan bakat.";
        }

        if ($this->meningkatkan_minat) {
            $kesimpulan[] = "Search engine berhasil meningkatkan minat terhadap program studi.";
        }

        if ($this->meningkatkan_bakat) {
            $kesimpulan[] = "Search engine berhasil meningkatkan bakat terhadap program studi.";
        }

        return implode(' ', $kesimpulan);
    }

    public function generateRekomendasi(): string
    {
        $rekomendasi = [];

        if ($this->hasHighSearchQuality() && $this->isPositiveImpact()) {
            $rekomendasi[] = "Pertahankan kualitas search engine yang sudah baik.";
        } elseif (!$this->hasHighSearchQuality() && $this->isNegativeImpact()) {
            $rekomendasi[] = "Perlu peningkatan kualitas search engine untuk meningkatkan minat dan bakat.";
        }

        if ($this->durasi_interaksi_detik < 300) {
            $rekomendasi[] = "Perlu meningkatkan engagement time untuk hasil yang lebih baik.";
        }

        if ($this->jumlah_halaman_dikunjungi < 3) {
            $rekomendasi[] = "Perlu meningkatkan eksplorasi halaman website.";
        }

        return implode(' ', $rekomendasi);
    }


    protected static function boot()
    {
        parent::boot();

        static::saving(function ($hasil) {
            if (!$hasil->korelasi_search_minat) {
                $hasil->korelasi_search_minat = $hasil->calculateKorelasiSearchMinat();
            }

            if (!$hasil->korelasi_search_bakat) {
                $hasil->korelasi_search_bakat = $hasil->calculateKorelasiSearchBakat();
            }

            if (!$hasil->pengaruh_kualitas) {
                $hasil->pengaruh_kualitas = $hasil->determinePengaruhKualitas();
            }

            if (!$hasil->waktu_penelitian) {
                $hasil->waktu_penelitian = now();
            }

            if (!$hasil->kesimpulan) {
                $hasil->kesimpulan = $hasil->generateKesimpulan();
            }

            if (!$hasil->rekomendasi) {
                $hasil->rekomendasi = $hasil->generateRekomendasi();
            }
        });
    }
}
