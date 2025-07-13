<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\IsiSoalController;
use App\Http\Controllers\User\RiwayatController;
use App\Http\Controllers\UserDashboardController;

Route::prefix('user')->middleware(['auth', 'role:user'])->name('user.')->group(function () {
    // Dashboard handled globally at /dashboard

    // Isi Soal
    Route::get('isi-soal', [IsiSoalController::class, 'index'])->name('isi-soal.index');
    Route::get('isi-soal/{paketSoalId}', [IsiSoalController::class, 'show'])->name('isi-soal.show');
    Route::post('isi-soal/{paketSoalId}', [IsiSoalController::class, 'store'])->name('isi-soal.store');

    // Riwayat
    Route::get('riwayat', [RiwayatController::class, 'index'])->name('riwayat.index');
    Route::get('riwayat/{id}', [RiwayatController::class, 'show'])->name('riwayat.show');
});
