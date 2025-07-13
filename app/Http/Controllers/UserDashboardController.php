<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EvaluasiSearchEngine;
use Illuminate\Support\Facades\Auth;

class UserDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $progress = EvaluasiSearchEngine::where('user_id', $user->id)->count();
        $last = EvaluasiSearchEngine::where('user_id', $user->id)->latest()->first();

        // Dummy data for all required props
        $progressMinatBakat = [
            'sudah_tes' => false,
            'waktu_tes' => null,
            'total_minat_program_studi' => 0,
            'rekomendasi_program_studi' => [],
        ];
        $statistikEvaluasi = [
            'total_evaluasi' => $progress,
            'waktu_evaluasi_terakhir' => $last ? $last->created_at->toDateTimeString() : null,
            'evaluasi_terbaru' => [],
        ];
        $rekomendasiPT = [];
        $programStudiPopuler = [];
        $hasilPenelitian = [];

        return inertia('user/dashboard', [
            'progressMinatBakat' => $progressMinatBakat,
            'statistikEvaluasi' => $statistikEvaluasi,
            'rekomendasiPT' => $rekomendasiPT,
            'programStudiPopuler' => $programStudiPopuler,
            'hasilPenelitian' => $hasilPenelitian,
        ]);
    }
}
