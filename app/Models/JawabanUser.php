<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class JawabanUser extends Model
{
    use HasFactory;
    protected $table = 'tabel_jawabanuser';
    protected $fillable = [
        'user_id', 'paket_soal_id', 'waktu_mulai', 'waktu_selesai', 'skor_minat', 'skor_bakat', 'quadrant'
    ];
    public function detailJawabanUser() {
        return $this->hasMany(DetailJawabanUser::class, 'jawaban_user_id');
    }
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function paketSoal() {
        return $this->belongsTo(PaketSoal::class, 'paket_soal_id');
    }
}
