<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class PaketSoal extends Model
{
    use HasFactory;
    protected $table = 'paket_soal';
    protected $fillable = [
        'nama_paket', 'deskripsi', 'author', 'status', 'kategori', 'jumlah_soal', 'balance_minat', 'balance_bakat'
    ];
    public function detailPaketSoal() {
        return $this->hasMany(DetailPaketSoal::class, 'paket_soal_id');
    }
    public function jawabanUser() {
        return $this->hasMany(JawabanUser::class, 'paket_soal_id');
    }
}
