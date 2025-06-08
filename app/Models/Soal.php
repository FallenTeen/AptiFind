<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Soal extends Model
{
    use HasFactory;
    protected $table = 'tabel_soal';
    protected $fillable = [
        'text_soal', 'bobot_minat', 'bobot_bakat', 'author'
    ];
    public function detailPaketSoal() {
        return $this->hasMany(DetailPaketSoal::class, 'soal_id');
    }
    public function detailJawabanUser() {
        return $this->hasMany(DetailJawabanUser::class, 'soal_id');
    }
}
