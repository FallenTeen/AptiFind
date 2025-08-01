<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\IsiSoalController;
use App\Http\Controllers\User\RiwayatController;
use App\Http\Controllers\UserDashboardController;

Route::prefix('user')->middleware(['auth', 'role:user'])->name('user.')->group(function () {
    Route::get('minat-program-studi', [\App\Http\Controllers\MinatProgramStudiController::class, 'index'])->name('minat-program-studi.index');
    Route::get('program-studi', [\App\Http\Controllers\ProgramStudiController::class, 'index'])->name('program-studi.index');
    Route::get('perguruan-tinggi', [\App\Http\Controllers\PerguruanTinggiController::class, 'index'])->name('perguruan-tinggi.index');
    Route::get('isi-soal', [IsiSoalController::class, 'index'])->name('isi-soal.index');
    Route::get('isi-soal/{paketSoalId}', [IsiSoalController::class, 'show'])->name('isi-soal.show');
    Route::post('isi-soal/{paketSoalId}', [IsiSoalController::class, 'store'])->name('isi-soal.store');
    Route::get('riwayat', [RiwayatController::class, 'index'])->name('riwayat.index');
    Route::get('riwayat/{id}', [RiwayatController::class, 'show'])->name('riwayat.show');
    Route::get('perguruan-tinggi', [\App\Http\Controllers\PerguruanTinggiController::class, 'index'])->name('perguruan-tinggi.index');
    Route::get('isi-soal', [IsiSoalController::class, 'index'])->name('isi-soal.index');
    Route::get('isi-soal/{paketSoalId}', [IsiSoalController::class, 'show'])->name('isi-soal.show');
    Route::post('isi-soal/{paketSoalId}', [IsiSoalController::class, 'store'])->name('isi-soal.store');
    Route::get('riwayat', [RiwayatController::class, 'index'])->name('riwayat.index');
    Route::get('riwayat/{id}', [RiwayatController::class, 'show'])->name('riwayat.show');
});
