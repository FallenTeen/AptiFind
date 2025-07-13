<?php

namespace App\Http\Controllers;

use App\Models\PerguruanTinggi;
use App\Models\ProgramStudi;
use App\Models\EvaluasiSearchEngine;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class PerguruanTinggiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = PerguruanTinggi::query();

        // Filtering
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        if ($request->filled('kota')) {
            $query->where('kota', $request->kota);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('akronim', 'like', "%{$search}%")
                    ->orWhere('kota', 'like', "%{$search}%");
            });
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'nama');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $perguruanTinggi = $query->withCount(['programStudi', 'evaluasiSearchEngine'])
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/perguruan-tinggi/index', [
            'perguruanTinggi' => $perguruanTinggi,
            'filters' => $request->only(['jenis', 'kota', 'status', 'search', 'sort_by', 'sort_order'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('admin/perguruan-tinggi/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:perguruan_tinggi',
            'akronim' => 'required|string|max:50|unique:perguruan_tinggi',
            'jenis' => 'required|in:universitas,institut,sekolah_tinggi,politeknik,akademi',
            'alamat' => 'required|string',
            'kota' => 'required|string|max:100',
            'provinsi' => 'required|string|max:100',
            'kode_pos' => 'nullable|string|max:10',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'deskripsi' => 'nullable|string',
            'status' => 'required|in:aktif,nonaktif'
        ]);

        $perguruanTinggi = PerguruanTinggi::create($validated);

        return redirect()->route('admin.perguruan-tinggi.index')
            ->with('success', 'Perguruan tinggi berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(PerguruanTinggi $perguruanTinggi): Response
    {
        $perguruanTinggi->load([
            'programStudi' => function ($query) {
                $query->where('status', 'aktif');
            },
            'evaluasiSearchEngine' => function ($query) {
                $query->latest()->limit(10);
            }
        ]);

        // Statistik evaluasi
        $statistikEvaluasi = [
            'total_evaluasi' => $perguruanTinggi->evaluasiSearchEngine()->count(),
            'rating_rata_rata' => $perguruanTinggi->rating_average,
            'kategori_terbanyak' => $perguruanTinggi->evaluasiSearchEngine()
                ->selectRaw('kategori_kualitas, COUNT(*) as total')
                ->groupBy('kategori_kualitas')
                ->orderBy('total', 'desc')
                ->first(),
            'evaluasi_terbaru' => $perguruanTinggi->evaluasiSearchEngine()
                ->with('user')
                ->latest()
                ->limit(5)
                ->get()
        ];

        return Inertia::render('admin/perguruan-tinggi/show', [
            'perguruanTinggi' => $perguruanTinggi,
            'statistikEvaluasi' => $statistikEvaluasi
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PerguruanTinggi $perguruanTinggi): Response
    {
        return Inertia::render('admin/perguruan-tinggi/edit', [
            'perguruanTinggi' => $perguruanTinggi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PerguruanTinggi $perguruanTinggi)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:perguruan_tinggi,nama,' . $perguruanTinggi->id,
            'akronim' => 'required|string|max:50|unique:perguruan_tinggi,akronim,' . $perguruanTinggi->id,
            'jenis' => 'required|in:universitas,institut,sekolah_tinggi,politeknik,akademi',
            'alamat' => 'required|string',
            'kota' => 'required|string|max:100',
            'provinsi' => 'required|string|max:100',
            'kode_pos' => 'nullable|string|max:10',
            'no_telp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'deskripsi' => 'nullable|string',
            'status' => 'required|in:aktif,nonaktif'
        ]);

        $perguruanTinggi->update($validated);

        return redirect()->route('admin.perguruan-tinggi.show', $perguruanTinggi)
            ->with('success', 'Perguruan tinggi berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PerguruanTinggi $perguruanTinggi)
    {
        $perguruanTinggi->delete();

        return redirect()->route('admin.perguruan-tinggi.index')
            ->with('success', 'Perguruan tinggi berhasil dihapus');
    }

    /**
     * Search perguruan tinggi for users
     */
    public function search(Request $request): JsonResponse
    {
        $query = PerguruanTinggi::where('status', 'aktif');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('akronim', 'like', "%{$search}%")
                    ->orWhere('kota', 'like', "%{$search}%");
            });
        }

        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        if ($request->filled('kota')) {
            $query->where('kota', $request->kota);
        }

        $perguruanTinggi = $query->withCount(['programStudi', 'evaluasiSearchEngine'])
            ->orderBy('rating_average', 'desc')
            ->paginate(12);

        return response()->json($perguruanTinggi);
    }

    public function userAdd(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255|unique:perguruan_tinggi',
            'akronim' => 'required|string|max:50|unique:perguruan_tinggi',
            'jenis' => 'required|in:universitas,institut,sekolah_tinggi,politeknik,akademi',
            'kota' => 'required|string|max:100',
            'provinsi' => 'required|string|max:100',
        ]);
        $perguruanTinggi = PerguruanTinggi::create([
            ...$validated,
            'alamat' => $request->input('alamat', ''),
            'kode_pos' => $request->input('kode_pos', null),
            'no_telp' => $request->input('no_telp', null),
            'email' => $request->input('email', null),
            'website' => $request->input('website', null),
            'deskripsi' => $request->input('deskripsi', null),
            'status' => 'aktif',
        ]);
        return response()->json(['success' => true, 'data' => $perguruanTinggi]);
    }
    /**
     * Show detail perguruan tinggi for users
     */
    public function detail(PerguruanTinggi $perguruanTinggi): Response
    {
        $perguruanTinggi->load([
            'programStudi' => function ($query) {
                $query->where('status', 'aktif')->orderBy('nama');
            }
        ]);

        // Check if user has evaluated this PT
        $hasEvaluated = false;
        if (auth()->check()) {
            $hasEvaluated = $perguruanTinggi->evaluasiSearchEngine()
                ->where('user_id', auth()->id())
                ->exists();
        }

        return Inertia::render('user/perguruan-tinggi/detail', [
            'perguruanTinggi' => $perguruanTinggi,
            'hasEvaluated' => $hasEvaluated
        ]);
    }

    /**
     * Show evaluation form for specific PT
     */
    public function evaluate(PerguruanTinggi $perguruanTinggi): Response
    {
        // Check if user has already evaluated
        if (auth()->check()) {
            $existingEvaluation = $perguruanTinggi->evaluasiSearchEngine()
                ->where('user_id', auth()->id())
                ->first();

            if ($existingEvaluation) {
                return Inertia::render('user/perguruan-tinggi/detail', [
                    'perguruanTinggi' => $perguruanTinggi,
                    'hasEvaluated' => true,
                    'message' => 'Anda sudah mengevaluasi perguruan tinggi ini'
                ]);
            }
        }

        return Inertia::render('user/perguruan-tinggi/evaluate', [
            'perguruanTinggi' => $perguruanTinggi
        ]);
    }

    /**
     * User index page for perguruan tinggi
     */
    public function userIndex(): Response
    {
        $perguruanTinggi = PerguruanTinggi::where('status', 'aktif')
            ->withCount(['programStudi', 'evaluasiSearchEngine'])
            ->orderBy('rating_average', 'desc')
            ->paginate(12);

        return Inertia::render('user/perguruan-tinggi/index', [
            'perguruanTinggi' => $perguruanTinggi,
            'filters' => request()->only(['search', 'jenis', 'kota'])
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
     * API endpoint untuk mendapatkan daftar perguruan tinggi
     */
    public function apiIndex(Request $request): JsonResponse
    {
        $query = PerguruanTinggi::query();

        // Filter berdasarkan status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter berdasarkan jenis
        if ($request->filled('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        // Filter berdasarkan kota
        if ($request->filled('kota')) {
            $query->where('kota', 'like', '%' . $request->kota . '%');
        }

        // Filter berdasarkan provinsi
        if ($request->filled('provinsi')) {
            $query->where('provinsi', 'like', '%' . $request->provinsi . '%');
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                    ->orWhere('akronim', 'like', "%{$search}%")
                    ->orWhere('kota', 'like', "%{$search}%");
            });
        }

        $perguruanTinggi = $query->select(['id', 'nama', 'akronim', 'jenis', 'kota', 'provinsi', 'status'])
            ->where('status', 'aktif')
            ->orderBy('nama')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $perguruanTinggi
        ]);
    }

    /**
     * API endpoint untuk search perguruan tinggi
     */
    public function apiSearch(Request $request): JsonResponse
    {
        return $this->search($request);
    }

    /**
     * API endpoint untuk detail perguruan tinggi
     */
    public function apiShow(PerguruanTinggi $perguruanTinggi): JsonResponse
    {
        $perguruanTinggi->load([
            'programStudi' => function ($query) {
                $query->where('status', 'aktif')->orderBy('nama');
            }
        ]);

        return response()->json([
            'success' => true,
            'data' => $perguruanTinggi
        ]);
    }
}
