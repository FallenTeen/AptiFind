<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EvaluasiSearchEngine;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function correlationAnalysis(Request $request)
    {
        return response()->json(['correlation' => null]);
    }
    public function qualityIndex(Request $request)
    {
        $avgSeqi = EvaluasiSearchEngine::avg('seqi');
        $avgUes = EvaluasiSearchEngine::avg('ues');
        return response()->json(['avg_seqi' => $avgSeqi, 'avg_ues' => $avgUes]);
    }
    public function comparativeReport(Request $request)
    {
        $data = EvaluasiSearchEngine::select('perguruan_tinggi_id', DB::raw('avg(skor_total) as avg_skor'))->groupBy('perguruan_tinggi_id')->get();
        return response()->json(['report' => $data]);
    }
    public function exportData(Request $request)
    {
        return response()->json(['export' => null]);
    }
} 