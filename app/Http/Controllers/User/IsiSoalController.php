<?php
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\PaketSoal;
use App\Models\JawabanUser;
use App\Models\DetailJawabanUser;
use App\Models\Soal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class IsiSoalController extends Controller
{
    public function index() {
        $user = Auth::user()->load(['perguruanTinggi', 'programStudi']);

        if ($user->status === 'mahasiswa_aktif') {
            $paket = $this->getRelevantPaketForMahasiswa($user);
        } else {
            $paket = PaketSoal::with('detailPaketSoal.soal')->get();
        }

        return inertia('user/isi-soal/index', compact('paket'));
    }

    public function show($paketSoalId) {
        $user = Auth::user();
        $paket = PaketSoal::with('detailPaketSoal.soal')->findOrFail($paketSoalId);
        if ($user->status === 'mahasiswa_aktif') {
            $relevantPaket = $this->getRelevantPaketForMahasiswa($user);
            $canAccess = $relevantPaket->contains('id', $paketSoalId);

            if (!$canAccess) {
                abort(403, 'Anda tidak berhak mengakses paket soal ini');
            }
        }

        return inertia('user/isi-soal/show', compact('paket'));
    }

    public function store(Request $request, $paketSoalId) {
        $user = Auth::user();
        $paket = PaketSoal::findOrFail($paketSoalId);
        if ($user->status === 'mahasiswa_aktif') {
            $relevantPaket = $this->getRelevantPaketForMahasiswa($user);
            $canAccess = $relevantPaket->contains('id', $paketSoalId);

            if (!$canAccess) {
                abort(403, 'Anda tidak berhak mengakses paket soal ini');
            }
        }

        $waktu_mulai = $request->waktu_mulai;
        if ($waktu_mulai && str_contains($waktu_mulai, 'T')) {
            $waktu_mulai = Carbon::parse($waktu_mulai)->format('Y-m-d H:i:s');
        }
        $jawabanUser = JawabanUser::create([
            'user_id' => Auth::id(),
            'paket_soal_id' => $paket->id,
            'waktu_mulai' => $waktu_mulai,
            'waktu_selesai' => now(),
            'skor_minat' => 0,
            'skor_bakat' => 0,
            'quadrant' => null,
        ]);
        $skor_minat = 0;
        $skor_bakat = 0;
        foreach($request->jawaban as $item) {
            DetailJawabanUser::create([
                'jawaban_user_id' => $jawabanUser->id,
                'soal_id' => $item['soal_id'],
                'jawaban' => $item['jawaban'],
                'bobot_minat' => $item['bobot_minat'],
                'bobot_bakat' => $item['bobot_bakat'],
            ]);
            if ($item['jawaban'] === 'yes') {
                $skor_minat += $item['bobot_minat'];
                $skor_bakat += $item['bobot_bakat'];
            }
        }
        if ($skor_minat > 0 && $skor_bakat > 0) {
            $quadrant = 'I';
        } elseif ($skor_minat > 0 && $skor_bakat <= 0) {
            $quadrant = 'II';
        } elseif ($skor_minat <= 0 && $skor_bakat <= 0) {
            $quadrant = 'III';
        } else {
            $quadrant = 'IV';
        }
        $jawabanUser->update([
            'skor_minat' => $skor_minat,
            'skor_bakat' => $skor_bakat,
            'quadrant' => $quadrant,
        ]);

        $user->update([
            'sudah_tes_minat_bakat' => true,
            'waktu_tes_minat_bakat' => now()
        ]);

        return redirect()->route('user.riwayat.show', $jawabanUser->id)->with('success','Jawaban berhasil disimpan');
    }

    /**
     * Mendapatkan paket soal yang relevan untuk mahasiswa aktif
     */
    private function getRelevantPaketForMahasiswa($user) {
        if (!$user->program_studi_id) {
            return PaketSoal::with('detailPaketSoal.soal')
                ->where('nama_paket', 'like', '%Umum%')
                ->orWhere('nama_paket', 'like', '%General%')
                ->get();
        }
        $programStudi = $user->programStudi;
        if (!$programStudi) {
            return collect();
        }
        $kategoriSoal = $this->getKategoriSoalByProgramStudi($programStudi->nama);

        $paket = PaketSoal::with('detailPaketSoal.soal')
            ->where(function($query) use ($kategoriSoal) {
                foreach ($kategoriSoal as $kategori) {
                    $query->orWhere('nama_paket', 'like', "%{$kategori}%");
                }
            })
            ->orWhere('nama_paket', 'like', '%Umum%')
            ->get();

        return $paket;
    }

    /**
     * Menentukan kategori soal berdasarkan nama program studi
     */
    private function getKategoriSoalByProgramStudi($namaProgramStudi) {
        $namaLower = strtolower($namaProgramStudi);
        $kategori = [];
        if (str_contains($namaLower, 'informatika') ||
            str_contains($namaLower, 'sistem informasi') ||
            str_contains($namaLower, 'teknik komputer') ||
            str_contains($namaLower, 'ilmu komputer')) {
            $kategori[] = 'Teknologi Informasi';
        }
        if (str_contains($namaLower, 'manajemen') ||
            str_contains($namaLower, 'akuntansi') ||
            str_contains($namaLower, 'ekonomi') ||
            str_contains($namaLower, 'bisnis')) {
            $kategori[] = 'Bisnis dan Ekonomi';
        }
        if (str_contains($namaLower, 'kedokteran') ||
            str_contains($namaLower, 'farmasi') ||
            str_contains($namaLower, 'kesehatan') ||
            str_contains($namaLower, 'gizi') ||
            str_contains($namaLower, 'keperawatan')) {
            $kategori[] = 'Kesehatan dan Kedokteran';
        }
        if (str_contains($namaLower, 'desain') ||
            str_contains($namaLower, 'seni') ||
            str_contains($namaLower, 'arsitektur') ||
            str_contains($namaLower, 'visual')) {
            $kategori[] = 'Seni dan Desain';
        }
        if (str_contains($namaLower, 'pendidikan') ||
            str_contains($namaLower, 'psikologi') ||
            str_contains($namaLower, 'sosiologi') ||
            str_contains($namaLower, 'konseling')) {
            $kategori[] = 'Pendidikan dan Sosial';
        }
        if (str_contains($namaLower, 'teknik') ||
            str_contains($namaLower, 'fisika') ||
            str_contains($namaLower, 'kimia') ||
            str_contains($namaLower, 'matematika') ||
            str_contains($namaLower, 'biologi')) {
            $kategori[] = 'Teknik dan Ilmu Alam';
        }
        if (str_contains($namaLower, 'hukum') ||
            str_contains($namaLower, 'politik') ||
            str_contains($namaLower, 'hubungan internasional') ||
            str_contains($namaLower, 'administrasi')) {
            $kategori[] = 'Hukum dan Sosial';
        }
        if (str_contains($namaLower, 'komunikasi') ||
            str_contains($namaLower, 'jurnalistik') ||
            str_contains($namaLower, 'broadcasting') ||
            str_contains($namaLower, 'public relations')) {
            $kategori[] = 'Komunikasi dan Media';
        }
        if (str_contains($namaLower, 'pertanian') ||
            str_contains($namaLower, 'peternakan') ||
            str_contains($namaLower, 'agribisnis') ||
            str_contains($namaLower, 'kehutanan')) {
            $kategori[] = 'Pertanian dan Peternakan';
        }

        return $kategori;
    }
}
