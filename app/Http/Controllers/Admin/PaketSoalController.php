<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaketSoal;
use App\Models\Soal;
use App\Models\DetailPaketSoal;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PaketSoalController extends Controller
{
    /**
     * Admin: List all paket soal
     */
    public function index()
    {
        $paket = PaketSoal::with(['detailPaketSoal.soal'])
            ->select('id', 'nama_paket', 'jumlah_soal', 'balance_minat', 'balance_bakat')
            ->get();
        return inertia('admin/paket-soal/index', compact('paket'));
    }
    /**
     * Public API: Get all paket soal for quiz selection (for guest and user)
     */
    public function publicPaketSoal(): \Illuminate\Http\JsonResponse
    {
        $paket = PaketSoal::with(['detailPaketSoal.soal'])
            ->select('id', 'nama_paket', 'jumlah_soal', 'balance_minat', 'balance_bakat')
            ->get();
        return response()->json(['paket' => $paket]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nama_paket' => 'required|string|min:3|max:255|unique:paket_soal,nama_paket',
                'jumlah_soal' => 'required|integer|min:1|max:100',
                'soal_ids' => 'required|array|min:1',
                'soal_ids.*' => 'exists:tabel_soal,id', // <-- ganti dari soal ke tabel_soal
            ], [
                'nama_paket.required' => 'Nama paket wajib diisi',
                'nama_paket.min' => 'Nama paket minimal 3 karakter',
                'nama_paket.max' => 'Nama paket maksimal 255 karakter',
                'nama_paket.unique' => 'Nama paket sudah digunakan',
                'jumlah_soal.required' => 'Jumlah soal wajib diisi',
                'jumlah_soal.min' => 'Jumlah soal minimal 1',
                'jumlah_soal.max' => 'Jumlah soal maksimal 100',
                'soal_ids.required' => 'Pilih minimal 1 soal',
                'soal_ids.min' => 'Pilih minimal 1 soal',
                'soal_ids.*.exists' => 'Soal yang dipilih tidak valid',
            ]);
            if ($validated['jumlah_soal'] != count($validated['soal_ids'])) {
                return back()
                    ->withErrors(['jumlah_soal' => 'Jumlah soal tidak sesuai dengan soal yang dipilih'])
                    ->withInput();
            }
            if (count($validated['soal_ids']) !== count(array_unique($validated['soal_ids']))) {
                return back()
                    ->withErrors(['soal_ids' => 'Terdapat soal yang dipilih lebih dari sekali'])
                    ->withInput();
            }

            $paket = PaketSoal::create([
                'nama_paket' => $validated['nama_paket'],
                'jumlah_soal' => count($validated['soal_ids']),
                'balance_minat' => 0,
                'balance_bakat' => 0,
            ]);

            $minat = 0;
            $bakat = 0;
            $soalData = [];

            foreach ($validated['soal_ids'] as $soal_id) {
                $soal = \App\Models\Soal::where('id', $soal_id)->first(); // pastikan model Soal sudah pakai protected $table = 'tabel_soal';
                if ($soal) {
                    $minat += $soal->bobot_minat;
                    $bakat += $soal->bobot_bakat;
                    $soalData[] = $soal;
                    DetailPaketSoal::create([
                        'paket_soal_id' => $paket->id,
                        'soal_id' => $soal_id
                    ]);
                }
            }

            $paket->update([
                'balance_minat' => $minat,
                'balance_bakat' => $bakat,
            ]);
            $warnings = $this->generatePaketWarnings($minat, $bakat, $soalData, count($validated['soal_ids']));

            $response = redirect()->route('admin.paket-soal.index')
                ->with('success', 'Paket soal berhasil dibuat');

            if (!empty($warnings)) {
                $response->with('warnings', $warnings);
            }

            return $response;

        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('error', 'Terdapat kesalahan dalam input data');
        }
    }

    public function show(PaketSoal $paketSoal)
    {
        $paketSoal->load('detailPaketSoal.soal');
        return inertia('admin/paket-soal/show', compact('paketSoal'));
    }

    public function edit(PaketSoal $paketSoal)
    {
        $paketSoal->load('detailPaketSoal.soal');
        $soal = Soal::all();
        $selectedSoalIds = $paketSoal->detailPaketSoal->pluck('soal_id')->toArray();

        return inertia('admin/paket-soal/edit', [
            'paketSoal' => $paketSoal,
            'soal' => $soal,
            'selectedSoalIds' => $selectedSoalIds
        ]);
    }

    public function update(Request $request, PaketSoal $paketSoal)
    {
        try {
            $validated = $request->validate([
                'nama_paket' => 'required|string|min:3|max:255|unique:paket_soal,nama_paket,' . $paketSoal->id,
                'soal_ids' => 'required|array|min:1',
                'soal_ids.*' => 'exists:tabel_soal,id', // <-- ganti dari soal ke tabel_soal
            ], [
                'nama_paket.required' => 'Nama paket wajib diisi',
                'nama_paket.min' => 'Nama paket minimal 3 karakter',
                'nama_paket.max' => 'Nama paket maksimal 255 karakter',
                'nama_paket.unique' => 'Nama paket sudah digunakan',
                'soal_ids.required' => 'Pilih minimal 1 soal',
                'soal_ids.min' => 'Pilih minimal 1 soal',
                'soal_ids.*.exists' => 'Soal yang dipilih tidak valid',
            ]);

            if (count($validated['soal_ids']) !== count(array_unique($validated['soal_ids']))) {
                return back()
                    ->withErrors(['soal_ids' => 'Terdapat soal yang dipilih lebih dari sekali'])
                    ->withInput();
            }
            DetailPaketSoal::where('paket_soal_id', $paketSoal->id)->delete();

            $minat = 0;
            $bakat = 0;
            $soalData = [];

            foreach ($validated['soal_ids'] as $soal_id) {
                $soal = \App\Models\Soal::where('id', $soal_id)->first();
                if ($soal) {
                    $minat += $soal->bobot_minat;
                    $bakat += $soal->bobot_bakat;
                    $soalData[] = $soal;
                    DetailPaketSoal::create([
                        'paket_soal_id' => $paketSoal->id,
                        'soal_id' => $soal_id
                    ]);
                }
            }

            $paketSoal->update([
                'nama_paket' => $validated['nama_paket'],
                'jumlah_soal' => count($validated['soal_ids']),
                'balance_minat' => $minat,
                'balance_bakat' => $bakat,
            ]);
            $warnings = $this->generatePaketWarnings($minat, $bakat, $soalData, count($validated['soal_ids']));

            $response = redirect()->route('admin.paket-soal.index')
                ->with('success', 'Paket soal berhasil diupdate');

            if (!empty($warnings)) {
                $response->with('warnings', $warnings);
            }

            return $response;

        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('error', 'Terdapat kesalahan dalam input data');
        }
    }

    public function destroy(PaketSoal $paketSoal)
    {
        try {
            $paketSoal->delete();
            return back()->with('success', 'Paket soal berhasil dihapus');

        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus paket soal: ' . $e->getMessage());
        }
    }

    /**
     * Generate comprehensive warnings untuk paket soal
     */
    private function generatePaketWarnings($minat, $bakat, $soalData, $jumlahSoal)
    {
        $warnings = [];
        if ($minat !== $bakat) {
            $selisih = abs($minat - $bakat);
            $warnings[] = "Paket soal tidak seimbang antara bobot minat ({$minat}) dan bakat ({$bakat}). Selisih: {$selisih}";
        }

        if ($jumlahSoal < 5) {
            $warnings[] = 'Jumlah soal dalam paket terlalu sedikit (kurang dari 5). Disarankan minimal 5-10 soal untuk hasil yang lebih akurat.';
        }
        if ($jumlahSoal > 50) {
            $warnings[] = 'Jumlah soal dalam paket sangat banyak (lebih dari 50). Pertimbangkan untuk membagi menjadi beberapa paket.';
        }

        $bobotMinatCount = ['negative' => 0, 'neutral' => 0, 'positive' => 0];
        $bobotBakatCount = ['negative' => 0, 'neutral' => 0, 'positive' => 0];

        foreach ($soalData as $soal) {
            if ($soal->bobot_minat < 0) $bobotMinatCount['negative']++;
            elseif ($soal->bobot_minat == 0) $bobotMinatCount['neutral']++;
            else $bobotMinatCount['positive']++;

            if ($soal->bobot_bakat < 0) $bobotBakatCount['negative']++;
            elseif ($soal->bobot_bakat == 0) $bobotBakatCount['neutral']++;
            else $bobotBakatCount['positive']++;
        }

        $totalNonNeutralMinat = $bobotMinatCount['negative'] + $bobotMinatCount['positive'];
        $totalNonNeutralBakat = $bobotBakatCount['negative'] + $bobotBakatCount['positive'];

        if ($bobotMinatCount['neutral'] > $totalNonNeutralMinat) {
            $warnings[] = 'Terlalu banyak soal dengan bobot minat netral (0). Ini dapat mengurangi efektivitas penilaian minat.';
        }

        if ($bobotBakatCount['neutral'] > $totalNonNeutralBakat) {
            $warnings[] = 'Terlalu banyak soal dengan bobot bakat netral (0). Ini dapat mengurangi efektivitas penilaian bakat.';
        }

        if (abs($minat) > $jumlahSoal * 0.7 || abs($bakat) > $jumlahSoal * 0.7) {
            $warnings[] = 'Bobot total terlalu ekstrem. Pertimbangkan untuk menambahkan soal dengan bobot berlawanan untuk menyeimbangkan.';
        }

        return $warnings;
    }
}
