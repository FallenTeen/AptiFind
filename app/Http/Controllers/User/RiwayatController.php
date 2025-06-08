<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\JawabanUser;
use Illuminate\Support\Facades\Auth;

class RiwayatController extends Controller
{
    public function index() {
        $riwayat = JawabanUser::with('paketSoal')->where('user_id', Auth::id())->latest()->get();
        return inertia('user/riwayat/index', compact('riwayat'));
    }
    public function show($id) {
        $jawaban = JawabanUser::with('detailJawabanUser.soal','paketSoal','user')->where('user_id', Auth::id())->findOrFail($id);
        $riwayat = [
            'id' => $jawaban->id,
            'paket_nama' => $jawaban->paketSoal->nama_paket ?? '',
            'tanggal' => $jawaban->waktu_selesai,
            'skor_minat' => $jawaban->skor_minat,
            'skor_bakat' => $jawaban->skor_bakat,
            'quadrant' => $jawaban->quadrant,
            'user' => [
                'name' => $jawaban->user->name ?? '-',
                'email' => $jawaban->user->email ?? '-',
            ],
            'jawaban' => $jawaban->detailJawabanUser->map(function($d) {
                return [
                    'soal' => [
                        'id' => $d->soal->id,
                        'text_soal' => $d->soal->text_soal,
                        'bobot_minat' => $d->bobot_minat,
                        'bobot_bakat' => $d->bobot_bakat,
                    ],
                    'jawaban' => $d->jawaban,
                ];
            }),
        ];
        return inertia('user/riwayat/show', compact('riwayat'));
    }
}
