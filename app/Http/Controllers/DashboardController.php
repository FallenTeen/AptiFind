<?php

namespace App\Http\Controllers;

use App\Models\PerguruanTinggi;
use App\Models\ProgramStudi;
use App\Models\EvaluasiSearchEngine;
use App\Models\MinatProgramStudi;
use App\Models\User;
use App\Models\HasilPenelitian;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display dashboard based on user role
     */
    public function index(): Response
    {
        if (auth()->user()->isAdmin()) {
            return $this->adminDashboard();
        }

        return $this->userDashboard();
    }

    /**
     * Admin dashboard
     */
    public function adminDashboard(): Response
    {
        $statistik = [
            'total_perguruan_tinggi' => PerguruanTinggi::count(),
            'total_program_studi' => ProgramStudi::count(),
            'total_user' => User::count(),
            'total_evaluasi' => EvaluasiSearchEngine::count(),
            'total_minat_program_studi' => MinatProgramStudi::count(),
            'total_hasil_penelitian' => HasilPenelitian::count()
        ];
        $userStats = [
            'calon_mahasiswa' => User::where('status', 'calon_mahasiswa')->count(),
            'mahasiswa_aktif' => User::where('status', 'mahasiswa_aktif')->count(),
            'sudah_tes_minat_bakat' => User::where('sudah_tes_minat_bakat', true)->count(),
            'belum_tes_minat_bakat' => User::where('sudah_tes_minat_bakat', false)->count()
        ];
        $topPerguruanTinggi = PerguruanTinggi::orderBy('rating_average', 'desc')
            ->limit(5)
            ->get();

        $evaluasiTerbaru = EvaluasiSearchEngine::with(['perguruanTinggi', 'user'])
            ->latest('waktu_evaluasi')
            ->limit(10)
            ->get();

        $kategoriEvaluasi = EvaluasiSearchEngine::selectRaw('kategori_kualitas, COUNT(*) as total')
            ->groupBy('kategori_kualitas')
            ->get();

        $trendEvaluasi = EvaluasiSearchEngine::selectRaw('DATE_FORMAT(waktu_evaluasi, "%Y-%m") as bulan, COUNT(*) as total')
            ->groupBy('bulan')
            ->orderBy('bulan', 'desc')
            ->limit(6)
            ->get();

        return Inertia::render('dashboard', [
            'role' => 'admin',
            'statistik' => $statistik,
            'userStats' => $userStats,
            'topPerguruanTinggi' => $topPerguruanTinggi,
            'evaluasiTerbaru' => $evaluasiTerbaru,
            'kategoriEvaluasi' => $kategoriEvaluasi,
            'trendEvaluasi' => $trendEvaluasi
        ]);
    }

    /**
     * User dashboard
     */
    public function userDashboard(): Response
    {
        $user = auth()->user();
        $progressMinatBakat = [
            'sudah_tes' => $user->sudah_tes_minat_bakat,
            'waktu_tes' => $user->waktu_tes_minat_bakat_formatted,
            'total_minat_program_studi' => $user->total_minat_program_studi,
            'rekomendasi_program_studi' => $user->rekomendasi_program_studi
        ];
        $statistikEvaluasi = [
            'total_evaluasi' => $user->total_evaluasi,
            'waktu_evaluasi_terakhir' => $user->waktu_evaluasi_terakhir_formatted,
            'evaluasi_terbaru' => $user->evaluasiSearchEngine()
                ->with('perguruanTinggi')
                ->latest('waktu_evaluasi')
                ->limit(5)
                ->get()
        ];
        $rekomendasiPT = PerguruanTinggi::where('status', 'aktif')
            ->orderBy('rating_average', 'desc')
            ->limit(6)
            ->get();
        $programStudiPopuler = ProgramStudi::where('status', 'aktif')
            ->orderBy('total_minat', 'desc')
            ->with('perguruanTinggi')
            ->limit(8)
            ->get();
        $hasilPenelitian = $user->hasilPenelitian()
            ->with(['perguruanTinggi', 'programStudi'])
            ->latest('waktu_penelitian')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'role' => 'user',
            'progressMinatBakat' => $progressMinatBakat,
            'statistikEvaluasi' => $statistikEvaluasi,
            'rekomendasiPT' => $rekomendasiPT,
            'programStudiPopuler' => $programStudiPopuler,
            'hasilPenelitian' => $hasilPenelitian
        ]);
    }

    /**
     * Get dashboard data for charts
     */
    public function getData(Request $request): JsonResponse
    {
        $type = $request->get('type', 'general');

        switch ($type) {
            case 'evaluasi_trend':
                $data = EvaluasiSearchEngine::selectRaw('DATE_FORMAT(waktu_evaluasi, "%Y-%m") as bulan, COUNT(*) as total')
                    ->groupBy('bulan')
                    ->orderBy('bulan')
                    ->get();
                break;

            case 'kategori_evaluasi':
                $data = EvaluasiSearchEngine::selectRaw('kategori_kualitas, COUNT(*) as total')
                    ->groupBy('kategori_kualitas')
                    ->get();
                break;

            case 'pt_rating':
                $data = PerguruanTinggi::select('nama', 'rating_average')
                    ->orderBy('rating_average', 'desc')
                    ->limit(10)
                    ->get();
                break;

            case 'program_studi_popular':
                $data = ProgramStudi::select('nama', 'total_minat')
                    ->orderBy('total_minat', 'desc')
                    ->limit(10)
                    ->get();
                break;

            case 'user_stats':
                $data = [
                    'calon_mahasiswa' => User::where('status', 'calon_mahasiswa')->count(),
                    'mahasiswa_aktif' => User::where('status', 'mahasiswa_aktif')->count(),
                    'sudah_tes' => User::where('sudah_tes_minat_bakat', true)->count(),
                    'belum_tes' => User::where('sudah_tes_minat_bakat', false)->count()
                ];
                break;

            default:
                $data = [
                    'total_pt' => PerguruanTinggi::count(),
                    'total_prodi' => ProgramStudi::count(),
                    'total_user' => User::count(),
                    'total_evaluasi' => EvaluasiSearchEngine::count()
                ];
        }

        return response()->json($data);
    }

    /**
     * Export data for research
     */
    public function export(Request $request): JsonResponse
    {
        $type = $request->get('type', 'all');
        $format = $request->get('format', 'json');

        switch ($type) {
            case 'perguruan_tinggi':
                $data = PerguruanTinggi::with('programStudi')->get();
                break;
            case 'program_studi':
                $data = ProgramStudi::with('perguruanTinggi')->get();
                break;
            case 'evaluasi':
                $data = EvaluasiSearchEngine::with(['perguruanTinggi', 'user'])->get();
                break;
            case 'minat_program_studi':
                $data = MinatProgramStudi::with(['user', 'programStudi'])->get();
                break;
            case 'user':
                $data = User::with(['perguruanTinggi', 'programStudi'])->get();
                break;
            default:
                $data = [
                    'perguruan_tinggi' => PerguruanTinggi::with('programStudi')->get(),
                    'program_studi' => ProgramStudi::with('perguruanTinggi')->get(),
                    'evaluasi' => EvaluasiSearchEngine::with(['perguruanTinggi', 'user'])->get(),
                    'minat_program_studi' => MinatProgramStudi::with(['user', 'programStudi'])->get(),
                    'user' => User::with(['perguruanTinggi', 'programStudi'])->get()
                ];
        }

        if ($format === 'csv') {
            // TODO: Implement CSV export
            return response()->json(['message' => 'CSV export not implemented yet']);
        }

        return response()->json($data);
    }

    /**
     * Research dashboard for admin
     */
    public function researchDashboard(): Response
    {
        $statistik = [
            'total_perguruan_tinggi' => PerguruanTinggi::count(),
            'total_program_studi' => ProgramStudi::count(),
            'total_evaluasi' => EvaluasiSearchEngine::count(),
            'total_minat_program_studi' => MinatProgramStudi::count(),
            'total_user' => User::count(),
            'total_hasil_penelitian' => HasilPenelitian::count()
        ];
        $topPT = PerguruanTinggi::withCount('evaluasiSearchEngine')
            ->orderBy('rating_average', 'desc')
            ->limit(10)
            ->get();
        $populerProdi = ProgramStudi::with('perguruanTinggi')
            ->orderBy('total_minat', 'desc')
            ->limit(10)
            ->get();
        $trendEvaluasi = EvaluasiSearchEngine::selectRaw('DATE_FORMAT(waktu_evaluasi, "%Y-%m") as bulan, COUNT(*) as total')
            ->groupBy('bulan')
            ->orderBy('bulan', 'desc')
            ->limit(12)
            ->get();

        return Inertia::render('admin/penelitian/research-dashboard', [
            'statistik' => $statistik,
            'topPT' => $topPT,
            'populerProdi' => $populerProdi,
            'trendEvaluasi' => $trendEvaluasi
        ]);
    }

    /**
     * Research statistics
     */
    public function statistik(): Response
    {
        $evaluasiStats = [
            'total' => EvaluasiSearchEngine::count(),
            'sangat_baik' => EvaluasiSearchEngine::where('kategori_kualitas', 'sangat_baik')->count(),
            'baik' => EvaluasiSearchEngine::where('kategori_kualitas', 'baik')->count(),
            'sedang' => EvaluasiSearchEngine::where('kategori_kualitas', 'sedang')->count(),
            'kurang' => EvaluasiSearchEngine::where('kategori_kualitas', 'kurang')->count(),
            'sangat_kurang' => EvaluasiSearchEngine::where('kategori_kualitas', 'sangat_kurang')->count()
        ];
        $minatStats = [
            'total' => MinatProgramStudi::count(),
            'sangat_tinggi' => MinatProgramStudi::where('tingkat_minat', 'sangat_tinggi')->count(),
            'tinggi' => MinatProgramStudi::where('tingkat_minat', 'tinggi')->count(),
            'sedang' => MinatProgramStudi::where('tingkat_minat', 'sedang')->count(),
            'rendah' => MinatProgramStudi::where('tingkat_minat', 'rendah')->count(),
            'sangat_rendah' => MinatProgramStudi::where('tingkat_minat', 'sangat_rendah')->count()
        ];
        $userStats = [
            'total' => User::count(),
            'calon_mahasiswa' => User::where('status', 'calon_mahasiswa')->count(),
            'mahasiswa_aktif' => User::where('status', 'mahasiswa_aktif')->count(),
            'sudah_tes' => User::where('sudah_tes_minat_bakat', true)->count(),
            'belum_tes' => User::where('sudah_tes_minat_bakat', false)->count()
        ];

        return Inertia::render('admin/statistik', [
            'evaluasiStats' => $evaluasiStats,
            'minatStats' => $minatStats,
            'userStats' => $userStats
        ]);
    }
}
