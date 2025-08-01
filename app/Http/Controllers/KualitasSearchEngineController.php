<?php

namespace App\Http\Controllers;

use App\Models\EvaluasiSearchEngine;
use App\Models\HasilPenelitian;
use App\Models\InteraksiSearchEngine;
use App\Models\MinatProgramStudi;
use App\Models\PerguruanTinggi;
use App\Models\ProgramStudi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class KualitasSearchEngineController extends Controller
{
    public function index()
    {
        $perguruanTinggi = PerguruanTinggi::where('status', 'aktif')->get();
        $totalEvaluasi = EvaluasiSearchEngine::count();
        $avgQuality = EvaluasiSearchEngine::avg('skor_total');

        return Inertia::render('evaluasi/index', [
            'perguruan_tinggi' => $perguruanTinggi,
            'statistics' => [
                'total_evaluasi' => $totalEvaluasi,
                'average_quality' => round($avgQuality, 2),
                'total_pt' => $perguruanTinggi->count()
            ]
        ]);
    }

    public function create()
    {
        $perguruanTinggi = PerguruanTinggi::where('status', 'aktif')->get();

        return Inertia::render('evaluasi/create', [
            'perguruan_tinggi' => $perguruanTinggi
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'perguruan_tinggi_id' => 'required|exists:perguruan_tinggi,id',
            'evaluasi_kualitas' => 'required|array',
            'evaluasi_kualitas.keakuratan_informasi' => 'required|integer|between:1,4',
            'evaluasi_kualitas.keakuratan_pencarian' => 'required|integer|between:1,4',
            'evaluasi_kualitas.relevansi_pencarian' => 'required|integer|between:1,4',
            'evaluasi_kualitas.kemudahan_pencarian' => 'required|integer|between:1,4',
            'evaluasi_kualitas.kelengkapan_informasi' => 'required|integer|between:1,4',
            'evaluasi_kualitas.kelengkapan_topik' => 'required|integer|between:1,4',
            'evaluasi_kualitas.informasi_terkini' => 'required|integer|between:1,4',
            'evaluasi_kualitas.akurasi_kondisi' => 'required|integer|between:1,4',
            'ketertarikan' => 'required|array',
            'ketertarikan.dorongan_cari_info' => 'required|integer|between:1,4',
            'ketertarikan.keyakinan_pilih' => 'required|integer|between:1,4',
            'ketertarikan.tertarik_daftar' => 'required|integer|between:1,4',
            'ketertarikan.rencana_daftar' => 'required|integer|between:1,4',
            'ketertarikan.rekomendasi_orang_lain' => 'required|integer|between:1,4',
            'ketertarikan.berbagi_tautan' => 'required|integer|between:1,4',
            'ketertarikan.kesan_profesional' => 'required|integer|between:1,4',
            'ketertarikan.pemahaman_positif' => 'required|integer|between:1,4',
            'ketertarikan.kunjungi_langsung' => 'required|integer|between:1,4',
            'ketertarikan.hadiri_acara' => 'required|integer|between:1,4',
            'komentar' => 'nullable|string',
            'saran_perbaikan' => 'nullable|string'
        ]);

        $interaksi = InteraksiSearchEngine::create([
            'user_id' => Auth::id(),
            'perguruan_tinggi_id' => $request->perguruan_tinggi_id,
            'session_id' => uniqid('eval_', true),
            'waktu_mulai' => now(),
            'waktu_selesai' => now(),
            'durasi_detik' => 300,
            'status' => 'selesai',
            'browser' => $request->header('User-Agent'),
            'device_type' => $this->detectDeviceType($request->header('User-Agent')),
            'ip_address' => $request->ip(),
            'jumlah_klik' => 1,
            'jumlah_halaman_dikunjungi' => 1
        ]);

        $evaluasiKualitas = $request->evaluasi_kualitas;
        $ketertarikan = $request->ketertarikan;

        $skorKualitas = array_sum($evaluasiKualitas);
        $skorKetertarikan = array_sum($ketertarikan);

        $kategoriKualitas = $this->determineKategoriKualitas($skorKualitas);
        $tingkatKetertarikan = $this->determineTingkatKetertarikan($skorKetertarikan);

        $evaluasi = EvaluasiSearchEngine::create([
            'user_id' => Auth::id(),
            'perguruan_tinggi_id' => $request->perguruan_tinggi_id,
            'kemudahan_pencarian' => $evaluasiKualitas['kemudahan_pencarian'],
            'kecepatan_loading' => 3,
            'relevansi_hasil' => $evaluasiKualitas['relevansi_pencarian'],
            'kelengkapan_informasi' => $evaluasiKualitas['kelengkapan_informasi'],
            'tampilan_visual' => 3,
            'kemudahan_navigasi' => 3,
            'skor_akurat' => $evaluasiKualitas['keakuratan_informasi'],
            'skor_relevan' => $evaluasiKualitas['relevansi_pencarian'],
            'skor_terpercaya' => $evaluasiKualitas['akurasi_kondisi'],
            'skor_total' => $skorKualitas,
            'kategori_kualitas' => $kategoriKualitas,
            'komentar' => $request->komentar,
            'saran_perbaikan' => $request->saran_perbaikan,
            'browser_used' => $request->header('User-Agent'),
            'device_type' => $this->detectDeviceType($request->header('User-Agent')),
            'waktu_evaluasi' => now()
        ]);

        $this->generateHasilPenelitian($evaluasi, $interaksi, $skorKetertarikan, $tingkatKetertarikan);

        return redirect()->route('evaluasi.show', $evaluasi->id)
            ->with('success', 'Evaluasi berhasil disimpan');
    }

    public function show($id)
    {
        $evaluasi = EvaluasiSearchEngine::with(['user', 'perguruanTinggi'])->findOrFail($id);
        $hasilPenelitian = HasilPenelitian::where('user_id', $evaluasi->user_id)
            ->where('perguruan_tinggi_id', $evaluasi->perguruan_tinggi_id)
            ->latest()
            ->first();

        return Inertia::render('evaluasi/show', [
            'evaluasi' => $evaluasi,
            'hasil_penelitian' => $hasilPenelitian
        ]);
    }

    public function dashboard()
    {
        $totalEvaluasi = EvaluasiSearchEngine::count();
        $evaluasiHariIni = EvaluasiSearchEngine::whereDate('waktu_evaluasi', today())->count();
        $avgKualitas = EvaluasiSearchEngine::avg('skor_total');

        $evaluasiTerbaru = EvaluasiSearchEngine::with(['user', 'perguruanTinggi'])
            ->latest()
            ->take(5)
            ->get();

        $distribusiKategori = EvaluasiSearchEngine::select('kategori_kualitas')
            ->selectRaw('COUNT(*) as jumlah')
            ->groupBy('kategori_kualitas')
            ->get();

        $ptTerpopuler = PerguruanTinggi::withCount('evaluasiSearchEngine')
            ->having('evaluasi_search_engine_count', '>', 0)
            ->orderBy('evaluasi_search_engine_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard/index', [
            'statistics' => [
                'total_evaluasi' => $totalEvaluasi,
                'evaluasi_hari_ini' => $evaluasiHariIni,
                'rata_kualitas' => round($avgKualitas, 2)
            ],
            'evaluasi_terbaru' => $evaluasiTerbaru,
            'distribusi_kategori' => $distribusiKategori,
            'pt_terpopuler' => $ptTerpopuler
        ]);
    }

    public function analisis()
    {
        $totalHasil = HasilPenelitian::count();
        $korelasiPositif = HasilPenelitian::whereIn('pengaruh_kualitas', ['positif_kuat', 'positif_lemah'])->count();
        $peningkatanMinat = HasilPenelitian::where('meningkatkan_minat', true)->count();

        $analisisPerPT = HasilPenelitian::with('perguruanTinggi')
            ->select('perguruan_tinggi_id')
            ->selectRaw('COUNT(*) as total_evaluasi')
            ->selectRaw('AVG(skor_evaluasi_search_engine) as rata_skor_search')
            ->selectRaw('AVG(skor_minat) as rata_skor_minat')
            ->selectRaw('SUM(CASE WHEN meningkatkan_minat = 1 THEN 1 ELSE 0 END) as peningkatan_minat')
            ->groupBy('perguruan_tinggi_id')
            ->having('total_evaluasi', '>', 0)
            ->get();

        $trenBulanan = HasilPenelitian::select(
            DB::raw('YEAR(waktu_penelitian) as tahun'),
            DB::raw('MONTH(waktu_penelitian) as bulan'),
            DB::raw('COUNT(*) as total'),
            DB::raw('AVG(skor_evaluasi_search_engine) as avg_skor')
        )
        ->groupBy('tahun', 'bulan')
        ->orderBy('tahun', 'desc')
        ->orderBy('bulan', 'desc')
        ->take(12)
        ->get();

        return Inertia::render('analisis/index', [
            'ringkasan' => [
                'total_hasil' => $totalHasil,
                'korelasi_positif' => $korelasiPositif,
                'peningkatan_minat' => $peningkatanMinat,
                'persentase_positif' => $totalHasil > 0 ? round(($korelasiPositif / $totalHasil) * 100, 1) : 0
            ],
            'analisis_per_pt' => $analisisPerPT,
            'tren_bulanan' => $trenBulanan
        ]);
    }

    public function exportData(Request $request)
    {
        $query = HasilPenelitian::with(['user', 'perguruanTinggi', 'programStudi']);

        if ($request->has('perguruan_tinggi_id')) {
            $query->where('perguruan_tinggi_id', $request->perguruan_tinggi_id);
        }

        if ($request->has('date_from') && $request->has('date_to')) {
            $query->whereBetween('waktu_penelitian', [
                Carbon::parse($request->date_from)->startOfDay(),
                Carbon::parse($request->date_to)->endOfDay()
            ]);
        }

        $data = $query->get();

        return response()->json([
            'data' => $data,
            'total' => $data->count()
        ]);
    }

    private function generateHasilPenelitian($evaluasi, $interaksi, $skorKetertarikan, $tingkatKetertarikan)
    {
        $user = $evaluasi->user;
        $minatData = MinatProgramStudi::where('user_id', $user->id)->first();

        $skorMinat = $minatData ? $minatData->skor_minat : $skorKetertarikan * 2.5;
        $skorBakat = $minatData ? $minatData->skor_bakat : ($skorKetertarikan * 2.5) - 10;

        $korelasiSearchMinat = $this->calculateCorrelation($evaluasi->skor_total, $skorMinat);
        $korelasiSearchBakat = $this->calculateCorrelation($evaluasi->skor_total, $skorBakat);
        $pengaruhKualitas = $this->determinePengaruhKualitas($korelasiSearchMinat, $korelasiSearchBakat);

        HasilPenelitian::create([
            'user_id' => $user->id,
            'perguruan_tinggi_id' => $evaluasi->perguruan_tinggi_id,
            'program_studi_id' => $minatData ? $minatData->program_studi_id : null,
            'skor_evaluasi_search_engine' => $evaluasi->skor_total,
            'kategori_kualitas_search' => $evaluasi->kategori_kualitas,
            'skor_minat' => $skorMinat,
            'skor_bakat' => $skorBakat,
            'tingkat_minat' => $this->determineTingkatMinat($skorMinat),
            'tingkat_bakat' => $this->determineTingkatBakat($skorBakat),
            'korelasi_search_minat' => $korelasiSearchMinat,
            'korelasi_search_bakat' => $korelasiSearchBakat,
            'pengaruh_kualitas' => $pengaruhKualitas,
            'durasi_interaksi_detik' => $interaksi->durasi_detik,
            'jumlah_klik' => $interaksi->jumlah_klik,
            'jumlah_halaman_dikunjungi' => $interaksi->jumlah_halaman_dikunjungi,
            'meningkatkan_minat' => $skorKetertarikan >= 30,
            'meningkatkan_bakat' => $skorKetertarikan >= 32,
            'kesimpulan' => $this->generateKesimpulan($pengaruhKualitas, $skorKetertarikan),
            'rekomendasi' => $this->generateRekomendasi($evaluasi, $skorKetertarikan),
            'waktu_penelitian' => now()
        ]);
    }

    private function determineKategoriKualitas($skor)
    {
        if ($skor >= 29) return 'sangat_baik';
        if ($skor >= 25) return 'baik';
        if ($skor >= 20) return 'sedang';
        if ($skor >= 15) return 'kurang';
        return 'sangat_kurang';
    }

    private function determineTingkatKetertarikan($skor)
    {
        if ($skor >= 35) return 'sangat_tinggi';
        if ($skor >= 30) return 'tinggi';
        if ($skor >= 25) return 'sedang';
        if ($skor >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    private function determineTingkatMinat($skor)
    {
        if ($skor >= 80) return 'sangat_tinggi';
        if ($skor >= 60) return 'tinggi';
        if ($skor >= 40) return 'sedang';
        if ($skor >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    private function determineTingkatBakat($skor)
    {
        if ($skor >= 80) return 'sangat_tinggi';
        if ($skor >= 60) return 'tinggi';
        if ($skor >= 40) return 'sedang';
        if ($skor >= 20) return 'rendah';
        return 'sangat_rendah';
    }

    private function calculateCorrelation($searchScore, $interestScore)
    {
        $normalizedSearch = $searchScore / 32;
        $normalizedInterest = $interestScore / 100;
        return round(($normalizedSearch + $normalizedInterest) / 2, 3);
    }

    private function determinePengaruhKualitas($korelasiMinat, $korelasiBakat)
    {
        $avgKorelasi = ($korelasiMinat + $korelasiBakat) / 2;

        if ($avgKorelasi >= 0.7) return 'positif_kuat';
        if ($avgKorelasi >= 0.5) return 'positif_lemah';
        if ($avgKorelasi >= 0.3) return 'netral';
        if ($avgKorelasi >= 0.1) return 'negatif_lemah';
        return 'negatif_kuat';
    }

    private function generateKesimpulan($pengaruhKualitas, $skorKetertarikan)
    {
        $kesimpulan = "Berdasarkan evaluasi, kualitas search engine memiliki pengaruh {$pengaruhKualitas} terhadap minat calon mahasiswa. ";

        if ($skorKetertarikan >= 30) {
            $kesimpulan .= "Tingkat ketertarikan responden terhadap perguruan tinggi ini cukup tinggi.";
        } else {
            $kesimpulan .= "Tingkat ketertarikan responden terhadap perguruan tinggi ini masih perlu ditingkatkan.";
        }

        return $kesimpulan;
    }

    private function generateRekomendasi($evaluasi, $skorKetertarikan)
    {
        $rekomendasi = [];

        if ($evaluasi->skor_total < 20) {
            $rekomendasi[] = "Perlu peningkatan signifikan pada kualitas search engine website";
        }

        if ($skorKetertarikan < 25) {
            $rekomendasi[] = "Tingkatkan konten dan informasi untuk meningkatkan daya tarik perguruan tinggi";
        }

        if (empty($rekomendasi)) {
            $rekomendasi[] = "Pertahankan kualitas yang sudah baik dan terus lakukan peningkatan berkelanjutan";
        }

        return implode('. ', $rekomendasi);
    }

    private function detectDeviceType($userAgent)
    {
        if (preg_match('/mobile|android|iphone|ipod/i', $userAgent)) {
            return 'mobile';
        } elseif (preg_match('/tablet|ipad/i', $userAgent)) {
            return 'tablet';
        }
        return 'desktop';
    }
}
