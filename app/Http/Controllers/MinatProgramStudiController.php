<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class MinatProgramStudiController extends Controller
{
    public function statistics()
    {
        $statistik = [
            'total_minat' => 0,
            'rata_rata_skor' => 0,
            'total_program_studi' => 0,
            'total_user' => 0,
            'minat_bulan_ini' => 0,
            'minat_bulan_lalu' => 0,
            'pertumbuhan' => 0,
        ];
        $kategoriMinat = [];
        $topProgramStudi = [];
        $minatBulanan = [];
        return Inertia::render('admin/minat-program-studi/statistics', [
            'statistik' => $statistik,
            'kategoriMinat' => $kategoriMinat,
            'topProgramStudi' => $topProgramStudi,
            'minatBulanan' => $minatBulanan,
        ]);
    }
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
     * User index page for minat program studi
     */
    public function userIndex(): Response
    {
        $minatProgramStudi = auth()->user()->minatProgramStudi()
            ->with('programStudi.perguruanTinggi')
            ->latest('waktu_tes')
            ->paginate(10);

        return Inertia::render('user/minat-program-studi/index', [
            'minatProgramStudi' => $minatProgramStudi
        ]);
    }

    /**
     * Get user's interests
     */
    public function myInterests(): Response
    {
        $minatProgramStudi = auth()->user()->minatProgramStudi()
            ->with('programStudi.perguruanTinggi')
            ->latest('waktu_tes')
            ->paginate(10);

        return Inertia::render('user/minat-program-studi/index', [
            'minatProgramStudi' => $minatProgramStudi
        ]);
    }
}
