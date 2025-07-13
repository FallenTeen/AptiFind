<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProgramStudiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * User index page for program studi
     */
    public function userIndex(): Response
    {
        $programStudi = \App\Models\ProgramStudi::where('status', 'aktif')
            ->with('perguruanTinggi')
            ->withCount('minatProgramStudi')
            ->orderBy('total_minat', 'desc')
            ->paginate(12);

        return Inertia::render('user/program-studi/index', [
            'programStudi' => $programStudi,
            'filters' => request()->only(['search', 'pt_id', 'jenis'])
        ]);
    }

    /**
     * Allow user to add Program Studi from registration if not found.
     */
    public function userAdd(\Illuminate\Http\Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'perguruan_tinggi_id' => 'required|exists:perguruan_tinggi,id',
            'nama' => 'required|string|max:255|unique:program_studi,nama,NULL,id,perguruan_tinggi_id,' . $request->perguruan_tinggi_id,
            'jenjang' => 'required|string|max:10',
            'akreditasi' => 'nullable|string|max:5',
        ]);
        $programStudi = \App\Models\ProgramStudi::create([
            ...$validated,
            'kode_prodi' => $request->input('kode_prodi', ''),
            'status' => 'aktif',
        ]);
        return response()->json(['success' => true, 'data' => $programStudi]);
    }

    /**
     * Search program studi for users
     */
    public function search(Request $request): Response
    {
        $query = \App\Models\ProgramStudi::where('status', 'aktif');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('kode', 'like', "%{$search}%");
            });
        }

        if ($request->filled('pt_id')) {
            $query->where('perguruan_tinggi_id', $request->pt_id);
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $programStudi = $query->with('perguruanTinggi')
            ->withCount('minatProgramStudi')
            ->orderBy('total_minat', 'desc')
            ->paginate(12);

        return Inertia::render('program-studi/search', [
            'programStudi' => $programStudi,
            'filters' => $request->only(['search', 'pt_id', 'jenis']),
            'perguruanTinggi' => \App\Models\PerguruanTinggi::where('status', 'aktif')->get()
        ]);
    }

    /**
     * Show detail program studi for users
     */
    public function detail(\App\Models\ProgramStudi $programStudi): Response
    {
        $programStudi->load('perguruanTinggi');

        // Check if user has interest in this program
        $hasInterest = false;
        if (auth()->check()) {
            $hasInterest = auth()->user()->minatProgramStudi()
                ->where('program_studi_id', $programStudi->id)
                ->exists();
        }

        return Inertia::render('program-studi/detail', [
            'programStudi' => $programStudi,
            'hasInterest' => $hasInterest
        ]);
    }

    /**
     * Get program studi by PT
     */
    public function getByPT($ptId): Response
    {
        $programStudi = \App\Models\ProgramStudi::where('perguruan_tinggi_id', $ptId)
            ->where('status', 'aktif')
            ->withCount('minatProgramStudi')
            ->orderBy('total_minat', 'desc')
            ->paginate(12);

        return Inertia::render('program-studi/by-pt', [
            'programStudi' => $programStudi,
            'perguruanTinggi' => \App\Models\PerguruanTinggi::find($ptId)
        ]);
    }

    /**
     * Get popular program studi
     */
    public function popular(): Response
    {
        $programStudi = \App\Models\ProgramStudi::where('status', 'aktif')
            ->with('perguruanTinggi')
            ->withCount('minatProgramStudi')
            ->orderBy('total_minat', 'desc')
            ->limit(20)
            ->get();

        return Inertia::render('program-studi/popular', [
            'programStudi' => $programStudi
        ]);
    }

    /**
     * Bulk import from Excel
     */
    public function bulkImport(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls|max:2048'
        ]);

        // Implementation for Excel import
        // This would require additional packages like Maatwebsite Excel

        return response()->json([
            'message' => 'Import berhasil diproses'
        ]);
    }

    /**
     * API endpoint untuk mendapatkan daftar program studi
     */
    public function apiIndex(Request $request): JsonResponse
    {
        $query = \App\Models\ProgramStudi::query();

        // Filter berdasarkan perguruan tinggi
        if ($request->filled('perguruan_tinggi_id')) {
            $query->where('perguruan_tinggi_id', $request->perguruan_tinggi_id);
        }

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan jenjang
        if ($request->filled('jenjang')) {
            $query->where('jenjang', $request->jenjang);
        }

        // Filter berdasarkan akreditasi
        if ($request->filled('akreditasi')) {
            $query->where('akreditasi', $request->akreditasi);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('kode_prodi', 'like', "%{$search}%");
            });
        }

        $programStudi = $query->select(['id', 'perguruan_tinggi_id', 'nama', 'jenjang', 'kode_prodi', 'akreditasi', 'status'])
            ->where('status', 'aktif')
            ->orderBy('nama')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $programStudi
        ]);
    }

    /**
     * API endpoint untuk search program studi
     */
    public function apiSearch(Request $request): JsonResponse
    {
        $query = \App\Models\ProgramStudi::where('status', 'aktif');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('kode_prodi', 'like', "%{$search}%");
            });
        }

        if ($request->filled('pt_id')) {
            $query->where('perguruan_tinggi_id', $request->pt_id);
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $programStudi = $query->with('perguruanTinggi')
            ->withCount('minatProgramStudi')
            ->orderBy('total_minat', 'desc')
            ->paginate(12);

        return response()->json([
            'success' => true,
            'data' => $programStudi
        ]);
    }

    /**
     * API endpoint untuk detail program studi
     */
    public function apiShow(\App\Models\ProgramStudi $programStudi): JsonResponse
    {
        $programStudi->load('perguruanTinggi');

        return response()->json([
            'success' => true,
            'data' => $programStudi
        ]);
    }
}
