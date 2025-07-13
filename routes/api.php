<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\EvaluasiSearchEngineController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\AnalyticsController;

Route::prefix('v1')->group(function () {
    Route::post('register/step1', [RegisterController::class, 'step1']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('register/step2', [RegisterController::class, 'step2']);
        Route::post('register/step3', [RegisterController::class, 'step3']);
        Route::post('register/complete', [RegisterController::class, 'complete']);
        Route::get('dashboard/admin', [AdminDashboardController::class, 'index'])->middleware('analytics.permission');
        Route::get('dashboard/user', [UserDashboardController::class, 'index']);
    // Evaluasi Search Engine
    Route::get('evaluasi-search-engine', [EvaluasiSearchEngineController::class, 'index']);
    Route::get('evaluasi-search-engine/create', [EvaluasiSearchEngineController::class, 'create']);
    Route::post('evaluasi-search-engine', [EvaluasiSearchEngineController::class, 'store']);
    Route::get('evaluasi-search-engine/{id}', [EvaluasiSearchEngineController::class, 'show']);
        Route::get('evaluasi/dashboard', [EvaluasiSearchEngineController::class, 'dashboard']);
        Route::get('evaluasi/statistics', [EvaluasiSearchEngineController::class, 'statistics']);
        Route::get('analytics/correlation', [AnalyticsController::class, 'correlationAnalysis'])->middleware('analytics.permission');
        Route::get('analytics/quality-index', [AnalyticsController::class, 'qualityIndex'])->middleware('analytics.permission');
        Route::get('analytics/comparative-report', [AnalyticsController::class, 'comparativeReport'])->middleware('analytics.permission');
        Route::get('analytics/export', [AnalyticsController::class, 'exportData'])->middleware('analytics.permission');
    });
    // User add Perguruan Tinggi/Program Studi (helper)
    Route::post('perguruan-tinggi/user-add', [\App\Http\Controllers\PerguruanTinggiController::class, 'userAdd']);
    Route::post('program-studi/user-add', [\App\Http\Controllers\ProgramStudiController::class, 'userAdd']);
    // Public soal for quiz/test minat bakat
    Route::get('public/soal', [\App\Http\Controllers\Admin\SoalController::class, 'publicSoal']);
    // Public paket soal for quiz/test minat bakat
    Route::get('public/paket-soal', [\App\Http\Controllers\Admin\PaketSoalController::class, 'publicPaketSoal']);
});
