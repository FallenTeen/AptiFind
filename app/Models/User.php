<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'status',
        'perguruan_tinggi_id',
        'program_studi_id',
        'angkatan',
        'nim',
        'asal_sekolah',
        'jurusan_sekolah',
        'tahun_lulus_sekolah',
        'nilai_un',
        'nilai_rapor',
        'jenis_kelamin',
        'tanggal_lahir',
        'tempat_lahir',
        'alamat',
        'kota',
        'provinsi',
        'kode_pos',
        'no_hp',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'tanggal_lahir' => 'date',
            'waktu_tes_minat_bakat' => 'datetime',
            'waktu_evaluasi_terakhir' => 'datetime',
            'nilai_un' => 'decimal:2',
            'nilai_rapor' => 'decimal:2',
            'sudah_tes_minat_bakat' => 'boolean',
            'total_evaluasi_search_engine' => 'integer',
        ];
    }

    // Relasi
    public function perguruanTinggi()
    {
        return $this->belongsTo(PerguruanTinggi::class, 'perguruan_tinggi_id');
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'program_studi_id');
    }

    public function jawabanUser()
    {
        return $this->hasMany(JawabanUser::class, 'user_id');
    }

    public function evaluasiSearchEngine()
    {
        return $this->hasMany(EvaluasiSearchEngine::class, 'user_id');
    }

    public function minatProgramStudi()
    {
        return $this->hasMany(MinatProgramStudi::class, 'user_id');
    }

    public function interaksiSearchEngine()
    {
        return $this->hasMany(InteraksiSearchEngine::class, 'user_id');
    }

    public function hasilPenelitian()
    {
        return $this->hasMany(HasilPenelitian::class, 'user_id');
    }

    // Accessor & Mutator
    public function getFullNameWithStatusAttribute(): string
    {
        $status = $this->status === 'mahasiswa_aktif' ? ' (Mahasiswa)' : ' (Calon Mahasiswa)';
        return $this->name . $status;
    }

    public function getDashboardRouteAttribute(): string
    {
        if ($this->role === 'admin') {
            return route('admin.dashboard');
        }
        return route('user.dashboard');
    }

    public function getStatusMahasiswaFormattedAttribute(): string
    {
        return $this->status === 'mahasiswa_aktif' ? 'Mahasiswa Aktif' : 'Calon Mahasiswa';
    }

    public function getJenisKelaminFormattedAttribute(): string
    {
        return $this->jenis_kelamin === 'laki_laki' ? 'Laki-laki' : 'Perempuan';
    }

    public function getTanggalLahirFormattedAttribute(): string
    {
        return $this->tanggal_lahir ? $this->tanggal_lahir->format('d M Y') : '-';
    }

    public function getWaktuTesMinatBakatFormattedAttribute(): string
    {
        return $this->waktu_tes_minat_bakat ? $this->waktu_tes_minat_bakat->format('d M Y H:i') : '-';
    }

    public function getWaktuEvaluasiTerakhirFormattedAttribute(): string
    {
        return $this->waktu_evaluasi_terakhir ? $this->waktu_evaluasi_terakhir->format('d M Y H:i') : '-';
    }

    public function getNilaiUnFormattedAttribute(): string
    {
        return $this->nilai_un ? number_format($this->nilai_un, 2) : '-';
    }

    public function getNilaiRaporFormattedAttribute(): string
    {
        return $this->nilai_rapor ? number_format($this->nilai_rapor, 2) : '-';
    }

    // Scopes
    public function scopeCalonMahasiswa($query)
    {
        return $query->where('status', 'calon_mahasiswa');
    }

    public function scopeMahasiswaAktif($query)
    {
        return $query->where('status', 'mahasiswa_aktif');
    }

    public function scopeByPT($query, $ptId)
    {
        return $query->where('perguruan_tinggi_id', $ptId);
    }

    public function scopeByProgramStudi($query, $prodiId)
    {
        return $query->where('program_studi_id', $prodiId);
    }

    public function scopeSudahTesMinatBakat($query)
    {
        return $query->where('sudah_tes_minat_bakat', true);
    }

    public function scopeBelumTesMinatBakat($query)
    {
        return $query->where('sudah_tes_minat_bakat', false);
    }

    // Methods
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }

    public function isCalonMahasiswa(): bool
    {
        return $this->status === 'calon_mahasiswa';
    }

    public function isMahasiswaAktif(): bool
    {
        return $this->status === 'mahasiswa_aktif';
    }

    public function hasCompletedMinatBakatTest(): bool
    {
        return $this->sudah_tes_minat_bakat;
    }

    public function hasEvaluatedSearchEngine(): bool
    {
        return $this->total_evaluasi_search_engine > 0;
    }

    public function getTotalEvaluasiAttribute(): int
    {
        return $this->evaluasiSearchEngine()->count();
    }

    public function getTotalMinatProgramStudiAttribute(): int
    {
        return $this->minatProgramStudi()->count();
    }

    public function getTotalInteraksiAttribute(): int
    {
        return $this->interaksiSearchEngine()->count();
    }

    public function getTotalHasilPenelitianAttribute(): int
    {
        return $this->hasilPenelitian()->count();
    }

    public function getRekomendasiProgramStudiAttribute()
    {
        return $this->minatProgramStudi()
            ->where('is_rekomendasi', true)
            ->orderBy('urutan_prioritas')
            ->get();
    }

    public function getProgramStudiNamaAttribute(): string
    {
        return $this->programStudi ? $this->programStudi->nama : '-';
    }

    public function getPerguruanTinggiNamaAttribute(): string
    {
        return $this->perguruanTinggi ? $this->perguruanTinggi->nama : '-';
    }
}
