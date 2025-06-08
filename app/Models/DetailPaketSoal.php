<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class DetailPaketSoal extends Model
{
    use HasFactory;
    protected $table = 'detail_paket_soal';
    protected $fillable = [
        'paket_soal_id', 'soal_id'
    ];
    public function soal() {
        return $this->belongsTo(Soal::class, 'soal_id');
    }
    public function paketSoal() {
        return $this->belongsTo(PaketSoal::class, 'paket_soal_id');
    }
}
