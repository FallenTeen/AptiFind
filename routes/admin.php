<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SoalController;
use App\Http\Controllers\Admin\PaketSoalController;
use App\Http\Controllers\Admin\RiwayatController;
use App\Http\Controllers\AdminDashboardController;

Route::prefix('admin')->middleware(['auth', 'role:admin'])->name('admin.')->group(function () {
    // Program Studi
    Route::get('program-studi', [\App\Http\Controllers\ProgramStudiController::class, 'index'])->name('program-studi.index');
    Route::get('program-studi/create', [\App\Http\Controllers\ProgramStudiController::class, 'create'])->name('program-studi.create');
    Route::post('program-studi', [\App\Http\Controllers\ProgramStudiController::class, 'store'])->name('program-studi.store');
    Route::get('program-studi/{programStudi}', [\App\Http\Controllers\ProgramStudiController::class, 'show'])->name('program-studi.show');
    Route::get('program-studi/{programStudi}/edit', [\App\Http\Controllers\ProgramStudiController::class, 'edit'])->name('program-studi.edit');
    Route::put('program-studi/{programStudi}', [\App\Http\Controllers\ProgramStudiController::class, 'update'])->name('program-studi.update');
    Route::delete('program-studi/{programStudi}', [\App\Http\Controllers\ProgramStudiController::class, 'destroy'])->name('program-studi.destroy');

    // Evaluasi Search Engine
    Route::get('evaluasi-search-engine', [\App\Http\Controllers\EvaluasiSearchEngineController::class, 'index'])->name('evaluasi-search-engine.index');
    Route::get('evaluasi-search-engine/statistics', [\App\Http\Controllers\EvaluasiSearchEngineController::class, 'statistics'])->name('evaluasi-search-engine.statistics');
    Route::get('evaluasi-search-engine/export', [\App\Http\Controllers\EvaluasiSearchEngineController::class, 'export'])->name('evaluasi-search-engine.export');

    // Minat Program Studi
    Route::get('minat-program-studi', [\App\Http\Controllers\MinatProgramStudiController::class, 'index'])->name('minat-program-studi.index');
    Route::get('minat-program-studi/statistics', [\App\Http\Controllers\MinatProgramStudiController::class, 'statistics'])->name('minat-program-studi.statistics');
    Route::get('minat-program-studi/export', [\App\Http\Controllers\MinatProgramStudiController::class, 'export'])->name('minat-program-studi.export');

    // Penelitian (nonaktif, controller tidak ada)
    // Perguruan Tinggi
    Route::get('perguruan-tinggi', [\App\Http\Controllers\PerguruanTinggiController::class, 'index'])->name('perguruan-tinggi.index');
    Route::get('perguruan-tinggi/create', [\App\Http\Controllers\PerguruanTinggiController::class, 'create'])->name('perguruan-tinggi.create');
    Route::post('perguruan-tinggi', [\App\Http\Controllers\PerguruanTinggiController::class, 'store'])->name('perguruan-tinggi.store');
    Route::get('perguruan-tinggi/{perguruanTinggi}', [\App\Http\Controllers\PerguruanTinggiController::class, 'show'])->name('perguruan-tinggi.show');
    Route::get('perguruan-tinggi/{perguruanTinggi}/edit', [\App\Http\Controllers\PerguruanTinggiController::class, 'edit'])->name('perguruan-tinggi.edit');
    Route::put('perguruan-tinggi/{perguruanTinggi}', [\App\Http\Controllers\PerguruanTinggiController::class, 'update'])->name('perguruan-tinggi.update');
    Route::delete('perguruan-tinggi/{perguruanTinggi}', [\App\Http\Controllers\PerguruanTinggiController::class, 'destroy'])->name('perguruan-tinggi.destroy');
    // Dashboard handled globally at /dashboard

    // Soal
    Route::get('soal', [SoalController::class, 'index'])->name('soal.index');
    Route::get('soal/create', [SoalController::class, 'create'])->name('soal.create');
    Route::post('soal', [SoalController::class, 'store'])->name('soal.store');
    Route::get('soal/{soal}', [SoalController::class, 'show'])->name('soal.show');
    Route::get('soal/{soal}/edit', [SoalController::class, 'edit'])->name('soal.edit');
    Route::put('soal/{soal}', [SoalController::class, 'update'])->name('soal.update');
    Route::delete('soal/{soal}', [SoalController::class, 'destroy'])->name('soal.destroy');

    // Paket Soal
    Route::get('paket-soal', [PaketSoalController::class, 'index'])->name('paket-soal.index');
    Route::get('paket-soal/create', [PaketSoalController::class, 'create'])->name('paket-soal.create');
    Route::post('paket-soal', [PaketSoalController::class, 'store'])->name('paket-soal.store');
    Route::get('paket-soal/{paketSoal}', [PaketSoalController::class, 'show'])->name('paket-soal.show');
    Route::get('paket-soal/{paketSoal}/edit', [PaketSoalController::class, 'edit'])->name('paket-soal.edit');
    Route::put('paket-soal/{paketSoal}', [PaketSoalController::class, 'update'])->name('paket-soal.update');
    Route::delete('paket-soal/{paketSoal}', [PaketSoalController::class, 'destroy'])->name('paket-soal.destroy');

    // Riwayat
    Route::get('riwayat', [RiwayatController::class, 'index'])->name('riwayat.index');
    Route::get('riwayat/{id}', [RiwayatController::class, 'show'])->name('riwayat.show');
    Route::get('riwayat/{id}/export-pdf', [RiwayatController::class, 'exportPdf'])->name('riwayat.exportPdf');
});
