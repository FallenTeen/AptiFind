<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JawabanUser;
use Barryvdh\DomPDF\Facade\Pdf;

class RiwayatController extends Controller
{
    public function index() {
        $riwayat = JawabanUser::with('user','paketSoal')->latest()->get();
        return inertia('admin/riwayat/index', compact('riwayat'));
    }
    public function show($id) {
        $jawaban = JawabanUser::with('detailJawabanUser.soal','user','paketSoal')->findOrFail($id);
        return inertia('admin/riwayat/show', compact('jawaban'));
    }
    public function exportPdf($id) {
        $jawaban = JawabanUser::with('detailJawabanUser.soal','user','paketSoal')->findOrFail($id);
        $data = [
            'jawaban' => $jawaban
        ];
        $pdf = Pdf::loadView('pdf.riwayat', $data);
        $filename = 'riwayat_'.$jawaban->user->name.'_'.$jawaban->id.'.pdf';
        return $pdf->download($filename);
    }
}
