<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\SoalController;
use App\Http\Controllers\Admin\PaketSoalController;
use App\Http\Controllers\Admin\RiwayatController as AdminRiwayatController;
use App\Http\Controllers\User\IsiSoalController;
use App\Http\Controllers\User\RiwayatController as UserRiwayatController;

Route::get('/', function () {
    return Inertia::render('landing');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function() {
    Route::resource('soal', SoalController::class);
    Route::resource('paket-soal', PaketSoalController::class); // <--- aktifkan semua route
    Route::resource('riwayat', AdminRiwayatController::class);
    Route::get('riwayat/{id}/export-pdf', [AdminRiwayatController::class, 'exportPdf'])->name('riwayat.exportPdf');
});

Route::middleware(['auth', 'role:user'])->prefix('user')->name('user.')->group(function() {
    Route::get('isi-soal', [IsiSoalController::class, 'index'])->name('isi-soal.index');
    Route::get('isi-soal/{paketSoalId}', [IsiSoalController::class, 'show'])->name('isi-soal.show');
    Route::post('isi-soal/{paketSoalId}', [IsiSoalController::class, 'store'])->name('isi-soal.store');
    Route::get('riwayat', [UserRiwayatController::class, 'index'])->name('riwayat.index');
    Route::get('riwayat/{id}', [UserRiwayatController::class, 'show'])->name('riwayat.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
