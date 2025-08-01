<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EvaluasiSearchEngine;
use App\Models\User;
use App\Models\PerguruanTinggi;
use App\Models\ProgramStudi;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalEvaluasi = EvaluasiSearchEngine::count();
        $totalUser = User::count();
        $totalPerguruanTinggi = PerguruanTinggi::count();
        $totalProgramStudi = ProgramStudi::count();
        $statistik = [
            'total_perguruan_tinggi' => $totalPerguruanTinggi,
            'total_program_studi' => $totalProgramStudi,
            'total_user' => $totalUser,
            'total_evaluasi' => $totalEvaluasi,
            'total_minat_program_studi' => 0,
            'total_hasil_penelitian' => 0,
        ];

        $userStats = [
            'calon_mahasiswa' => 0,
            'mahasiswa_aktif' => 0,
            'sudah_tes_minat_bakat' => 0,
            'belum_tes_minat_bakat' => 0,
        ];

        return inertia('admin/dashboard', [
            'statistik' => $statistik,
            'userStats' => $userStats,
            'topPerguruanTinggi' => [],
            'evaluasiTerbaru' => [],
            'kategoriEvaluasi' => [],
            'trendEvaluasi' => [],
        ]);
    }
}
