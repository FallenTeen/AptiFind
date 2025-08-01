<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EvaluasiSearchEngine;
use App\Models\DetailEvaluasiSearch;
use App\Models\KriteriaEvaluasiSearch;
use App\Models\SkenarioPencarian;
use App\Http\Requests\EvaluationStoreRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\EvaluasiSearchResource;
use Illuminate\Support\Facades\DB;

class EvaluasiSearchEngineController extends Controller
{
    public function export()
    {
        return response()->json(['message' => 'Export not implemented yet.']);
    }
    public function index(Request $request)
    {
        $data = EvaluasiSearchEngine::filter($request->all())->paginate(10);
        return inertia('admin/evaluasi-search-engine/index', [
            'evaluasi' => $data
        ]);
    }
    public function create()
    {
        $kriteria = KriteriaEvaluasiSearch::where('status', true)->get();
        $skenario = SkenarioPencarian::all();
        return inertia('admin/evaluasi-search-engine/create', [
            'kriteria' => $kriteria,
            'skenario' => $skenario
        ]);
    }
    public function store(EvaluationStoreRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();
            $evaluasi = EvaluasiSearchEngine::create([
                'user_id' => Auth::id(),
                'perguruan_tinggi_id' => $data['perguruan_tinggi_id'],
                'skenario_pencarian_id' => $data['skenario_pencarian_id'],
            ]);
            foreach ($data['kriteria'] as $item) {
                DetailEvaluasiSearch::create([
                    'evaluasi_search_engine_id' => $evaluasi->id,
                    'kriteria_evaluasi_search_id' => $item['id'],
                    'skor' => $item['skor'],
                ]);
            }
            $evaluasi->perguruanTinggi?->updateRatingAverage();
            return redirect()->route('admin.evaluasi-search-engine.index')->with('success', 'Evaluasi berhasil disimpan');
        });
    }
    public function show($id)
    {
        $evaluasi = EvaluasiSearchEngine::with(['user', 'perguruanTinggi', 'skenario', 'detail.kriteria'])->findOrFail($id);
        return new EvaluasiSearchResource($evaluasi);
    }
    public function dashboard()
    {
        $total = EvaluasiSearchEngine::count();
        $byPt = EvaluasiSearchEngine::selectRaw('perguruan_tinggi_id, count(*) as total')->groupBy('perguruan_tinggi_id')->get();
        return inertia('admin/evaluasi-search-engine/dashboard', [
            'total' => $total,
            'by_perguruan_tinggi' => $byPt
        ]);
    }
    public function statistics()
    {
        $statistik = [
            'total_evaluasi' => EvaluasiSearchEngine::count(),
            'rata_rata_skor' => 0,
            'total_perguruan_tinggi' => 0,
            'total_user' => 0,
            'evaluasi_bulan_ini' => 0,
            'evaluasi_bulan_lalu' => 0,
            'pertumbuhan' => 0,
        ];
        $kategoriEvaluasi = EvaluasiSearchEngine::selectRaw('kategori_kualitas as kategori, count(*) as total')
            ->groupBy('kategori_kualitas')->get()->map(function($item) {
                return [
                    'kategori' => $item->kategori,
                    'total' => $item->total,
                    'persentase' => 0,
                ];
            });
        $topPerguruanTinggi = [];
        $evaluasiBulanan = [];
        return inertia('admin/evaluasi-search-engine/statistics', [
            'statistik' => $statistik,
            'kategoriEvaluasi' => $kategoriEvaluasi,
            'topPerguruanTinggi' => $topPerguruanTinggi,
            'evaluasiBulanan' => $evaluasiBulanan,
        ]);
    }
}
