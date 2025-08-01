<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KriteriaEvaluasiSearch extends Model
{
    protected $table = 'kriteria_evaluasi_search';

    protected $fillable = [
        'nama_kriteria',
        'bobot_kriteria',
        'deskripsi',
        'kategori',
        'status'
    ];
}

class DetailEvaluasiSearch extends Model
{
    protected $table = 'detail_evaluasi_search';

    protected $fillable = [
        'evaluasi_search_engine_id',
        'kriteria_evaluasi_search_id',
        'skor'
    ];
}

class SkenarioPencarian extends Model
{
    protected $table = 'skenario_pencarian';

    protected $fillable = [
        'nama_skenario',
        'kata_kunci_default',
        'deskripsi'
    ];
}

class HasilSkenarioPencarian extends Model
{
    protected $table = 'hasil_skenario_pencarian';

    protected $fillable = [
        'user_id',
        'perguruan_tinggi_id',
        'skenario_pencarian_id',
        'waktu_skenario',
        'skor_keberhasilan',
        'catatan'
    ];
}

class KataKunciPencarian extends Model
{
    protected $table = 'kata_kunci_pencarian';

    protected $fillable = [
        'user_id',
        'perguruan_tinggi_id',
        'kata_kunci',
        'waktu_pencarian',
        'hasil_pencarian'
    ];
}
