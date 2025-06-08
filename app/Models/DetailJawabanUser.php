<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class DetailJawabanUser extends Model
{
    use HasFactory;
    protected $table = 'detail_jawaban_user';
    protected $fillable = [
        'jawaban_user_id', 'soal_id', 'jawaban', 'bobot_minat', 'bobot_bakat'
    ];
    public function soal() {
        return $this->belongsTo(Soal::class, 'soal_id');
    }
    public function jawabanUser() {
        return $this->belongsTo(JawabanUser::class, 'jawaban_user_id');
    }
}
