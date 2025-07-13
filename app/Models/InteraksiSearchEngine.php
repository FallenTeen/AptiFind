<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InteraksiSearchEngine extends Model
{
    use HasFactory;

    protected $table = 'interaksi_search_engine';
    
    protected $fillable = [
        'user_id',
        'perguruan_tinggi_id',
        'session_id',
        'waktu_mulai',
        'waktu_selesai',
        'durasi_detik',
        'jumlah_klik',
        'jumlah_halaman_dikunjungi',
        'jumlah_pencarian',
        'halaman_dikunjungi',
        'kata_kunci_pencarian',
        'browser',
        'device_type',
        'ip_address',
        'user_agent',
        'status'
    ];

    protected $casts = [
        'waktu_mulai' => 'datetime',
        'waktu_selesai' => 'datetime',
        'durasi_detik' => 'integer',
        'jumlah_klik' => 'integer',
        'jumlah_halaman_dikunjungi' => 'integer',
        'jumlah_pencarian' => 'integer',
        'halaman_dikunjungi' => 'array',
        'kata_kunci_pencarian' => 'array',
    ];

    // Relasi
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function perguruanTinggi(): BelongsTo
    {
        return $this->belongsTo(PerguruanTinggi::class, 'perguruan_tinggi_id');
    }

    // Accessor & Mutator
    public function getDurasiFormattedAttribute(): string
    {
        if (!$this->durasi_detik) {
            return '-';
        }
        
        $jam = floor($this->durasi_detik / 3600);
        $menit = floor(($this->durasi_detik % 3600) / 60);
        $detik = $this->durasi_detik % 60;
        
        if ($jam > 0) {
            return sprintf('%02d:%02d:%02d', $jam, $menit, $detik);
        }
        
        return sprintf('%02d:%02d', $menit, $detik);
    }

    public function getWaktuMulaiFormattedAttribute(): string
    {
        return $this->waktu_mulai ? $this->waktu_mulai->format('d M Y H:i:s') : '-';
    }

    public function getWaktuSelesaiFormattedAttribute(): string
    {
        return $this->waktu_selesai ? $this->waktu_selesai->format('d M Y H:i:s') : '-';
    }

    public function getStatusFormattedAttribute(): string
    {
        $statusMap = [
            'aktif' => 'Aktif',
            'selesai' => 'Selesai',
            'timeout' => 'Timeout'
        ];
        
        return $statusMap[$this->status] ?? 'Tidak Diketahui';
    }

    public function getDeviceTypeFormattedAttribute(): string
    {
        $deviceMap = [
            'desktop' => 'Desktop',
            'mobile' => 'Mobile',
            'tablet' => 'Tablet'
        ];
        
        return $deviceMap[$this->device_type] ?? ucfirst($this->device_type ?? 'Tidak Diketahui');
    }

    public function getBrowserFormattedAttribute(): string
    {
        return ucfirst($this->browser ?? 'Tidak Diketahui');
    }

    public function getHalamanDikunjungiListAttribute(): array
    {
        return $this->halaman_dikunjungi ?? [];
    }

    public function getKataKunciPencarianListAttribute(): array
    {
        return $this->kata_kunci_pencarian ?? [];
    }

    public function getRataRataKlikPerHalamanAttribute(): float
    {
        if ($this->jumlah_halaman_dikunjungi > 0) {
            return round($this->jumlah_klik / $this->jumlah_halaman_dikunjungi, 2);
        }
        return 0;
    }

    public function getRataRataPencarianPerHalamanAttribute(): float
    {
        if ($this->jumlah_halaman_dikunjungi > 0) {
            return round($this->jumlah_pencarian / $this->jumlah_halaman_dikunjungi, 2);
        }
        return 0;
    }

    // Scopes
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByPT($query, $ptId)
    {
        return $query->where('perguruan_tinggi_id', $ptId);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeAktif($query)
    {
        return $query->where('status', 'aktif');
    }

    public function scopeSelesai($query)
    {
        return $query->where('status', 'selesai');
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('waktu_mulai', [$startDate, $endDate]);
    }

    public function scopeByDeviceType($query, $deviceType)
    {
        return $query->where('device_type', $deviceType);
    }

    public function scopeByBrowser($query, $browser)
    {
        return $query->where('browser', $browser);
    }

    public function scopeLongDuration($query, $minutes = 10)
    {
        return $query->where('durasi_detik', '>=', $minutes * 60);
    }

    public function scopeHighEngagement($query)
    {
        return $query->where('jumlah_klik', '>=', 10)
                    ->where('jumlah_halaman_dikunjungi', '>=', 5);
    }

    // Methods
    public function calculateDuration(): int
    {
        if ($this->waktu_mulai && $this->waktu_selesai) {
            return $this->waktu_mulai->diffInSeconds($this->waktu_selesai);
        }
        return 0;
    }

    public function finishSession(): void
    {
        $this->update([
            'waktu_selesai' => now(),
            'durasi_detik' => $this->calculateDuration(),
            'status' => 'selesai'
        ]);
    }

    public function timeoutSession(): void
    {
        $this->update([
            'waktu_selesai' => now(),
            'durasi_detik' => $this->calculateDuration(),
            'status' => 'timeout'
        ]);
    }

    public function addPageVisit(string $page): void
    {
        $pages = $this->halaman_dikunjungi ?? [];
        if (!in_array($page, $pages)) {
            $pages[] = $page;
            $this->update([
                'halaman_dikunjungi' => $pages,
                'jumlah_halaman_dikunjungi' => count($pages)
            ]);
        }
    }

    public function addSearchKeyword(string $keyword): void
    {
        $keywords = $this->kata_kunci_pencarian ?? [];
        if (!in_array($keyword, $keywords)) {
            $keywords[] = $keyword;
            $this->update([
                'kata_kunci_pencarian' => $keywords,
                'jumlah_pencarian' => count($keywords)
            ]);
        }
    }

    public function incrementClicks(): void
    {
        $this->increment('jumlah_klik');
    }

    public function isActive(): bool
    {
        return $this->status === 'aktif';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'selesai';
    }

    public function isTimeout(): bool
    {
        return $this->status === 'timeout';
    }

    public function getEngagementLevel(): string
    {
        if ($this->jumlah_klik >= 20 && $this->durasi_detik >= 600) {
            return 'Sangat Tinggi';
        }
        if ($this->jumlah_klik >= 10 && $this->durasi_detik >= 300) {
            return 'Tinggi';
        }
        if ($this->jumlah_klik >= 5 && $this->durasi_detik >= 120) {
            return 'Sedang';
        }
        return 'Rendah';
    }

    // Boot method
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($interaksi) {
            if (!$interaksi->waktu_mulai) {
                $interaksi->waktu_mulai = now();
            }
            
            if (!$interaksi->session_id) {
                $interaksi->session_id = uniqid('session_', true);
            }
        });
    }
}
