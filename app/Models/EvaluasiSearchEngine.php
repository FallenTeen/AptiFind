<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluasiSearchEngine extends Model
{
    protected $table = 'evaluasi_search_engine';
    protected $guarded = [];
    protected $with = ['user', 'perguruanTinggi', 'skenario', 'detail'];
    public function user() { return $this->belongsTo(User::class); }
    public function perguruanTinggi() { return $this->belongsTo(PerguruanTinggi::class, 'perguruan_tinggi_id'); }
    public function skenario() { return $this->belongsTo(SkenarioPencarian::class, 'skenario_pencarian_id'); }
    public function detail() { return $this->hasMany(DetailEvaluasiSearch::class, 'evaluasi_search_engine_id'); }
    public function scopeFilter($query, $filters) {
        if (isset($filters['perguruan_tinggi_id'])) {
            $query->where('perguruan_tinggi_id', $filters['perguruan_tinggi_id']);
        }
        if (isset($filters['kategori_kualitas'])) {
            $query->where('kategori_kualitas', $filters['kategori_kualitas']);
        }
        return $query;
    }
}
