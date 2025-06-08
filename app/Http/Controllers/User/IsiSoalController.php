<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\PaketSoal;
use App\Models\JawabanUser;
use App\Models\DetailJawabanUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class IsiSoalController extends Controller
{
    public function index() {
        $paket = PaketSoal::all();
        return inertia('user/isi-soal/index', compact('paket'));
    }
    public function show($paketSoalId) {
        $paket = PaketSoal::with('detailPaketSoal.soal')->findOrFail($paketSoalId);
        return inertia('user/isi-soal/show', compact('paket'));
    }
    public function store(Request $request, $paketSoalId) {
        $paket = PaketSoal::findOrFail($paketSoalId);
        $waktu_mulai = $request->waktu_mulai;
        if ($waktu_mulai && str_contains($waktu_mulai, 'T')) {
            $waktu_mulai = Carbon::parse($waktu_mulai)->format('Y-m-d H:i:s');
        }
        $skor_minat = $request->skor_minat;
        $skor_bakat = $request->skor_bakat;
        if ($skor_minat > 0 && $skor_bakat > 0) {
            $quadrant = 'I';
        } elseif ($skor_minat > 0 && $skor_bakat <= 0) {
            $quadrant = 'II';
        } elseif ($skor_minat <= 0 && $skor_bakat <= 0) {
            $quadrant = 'III';
        } else {
            $quadrant = 'IV';
        }
        $jawabanUser = JawabanUser::create([
            'user_id' => Auth::id(),
            'paket_soal_id' => $paket->id,
            'waktu_mulai' => $waktu_mulai,
            'waktu_selesai' => now(),
            'skor_minat' => $skor_minat,
            'skor_bakat' => $skor_bakat,
            'quadrant' => $quadrant,
        ]);
        foreach($request->jawaban as $item) {
            DetailJawabanUser::create([
                'jawaban_user_id' => $jawabanUser->id,
                'soal_id' => $item['soal_id'],
                'jawaban' => $item['jawaban'],
                'bobot_minat' => $item['bobot_minat'],
                'bobot_bakat' => $item['bobot_bakat'],
            ]);
        }
        return redirect()->route('user.riwayat.show', $jawabanUser->id)->with('success','Jawaban berhasil disimpan');
    }
}
