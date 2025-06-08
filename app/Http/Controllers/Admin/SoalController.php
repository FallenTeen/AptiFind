<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Soal;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SoalController extends Controller
{
    public function index()
    {
        $soal = Soal::all();
        return inertia('admin/soal/index', compact('soal'));
    }

    public function create()
    {
        return inertia('admin/soal/create');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'text_soal' => 'required|string|min:10|max:1000',
                'bobot_minat' => 'required|integer|in:-1,0,1',
                'bobot_bakat' => 'required|integer|in:-1,0,1',
            ], [
                'text_soal.required' => 'Teks soal wajib diisi',
                'text_soal.min' => 'Teks soal minimal 10 karakter',
                'text_soal.max' => 'Teks soal maksimal 1000 karakter',
                'bobot_minat.required' => 'Bobot minat wajib dipilih',
                'bobot_minat.in' => 'Bobot minat harus bernilai -1, 0, atau 1',
                'bobot_bakat.required' => 'Bobot bakat wajib dipilih',
                'bobot_bakat.in' => 'Bobot bakat harus bernilai -1, 0, atau 1',
            ]);

            $existingSoal = Soal::where('text_soal', $validated['text_soal'])->first();
            if ($existingSoal) {
                return back()
                    ->withErrors(['text_soal' => 'Soal dengan teks yang sama sudah ada'])
                    ->withInput();
            }

            $soal = Soal::create($validated);
            $warnings = $this->generateSoalWarnings($validated);

            $response = redirect()->route('admin.soal.index')
                ->with('success', 'Soal berhasil ditambahkan');

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

    public function edit(Soal $soal)
    {
        return inertia('admin/soal/edit', compact('soal'));
    }

    public function update(Request $request, Soal $soal)
    {
        try {
            $validated = $request->validate([
                'text_soal' => 'required|string|min:10|max:1000',
                'bobot_minat' => 'required|integer|in:-1,0,1',
                'bobot_bakat' => 'required|integer|in:-1,0,1',
            ], [
                'text_soal.required' => 'Teks soal wajib diisi',
                'text_soal.min' => 'Teks soal minimal 10 karakter',
                'text_soal.max' => 'Teks soal maksimal 1000 karakter',
                'bobot_minat.required' => 'Bobot minat wajib dipilih',
                'bobot_minat.in' => 'Bobot minat harus bernilai -1, 0, atau 1',
                'bobot_bakat.required' => 'Bobot bakat wajib dipilih',
                'bobot_bakat.in' => 'Bobot bakat harus bernilai -1, 0, atau 1',
            ]);

            $existingSoal = Soal::where('text_soal', $validated['text_soal'])
                ->where('id', '!=', $soal->id)
                ->first();

            if ($existingSoal) {
                return back()
                    ->withErrors(['text_soal' => 'Soal dengan teks yang sama sudah ada'])
                    ->withInput();
            }

            $soal->update($validated);
            $warnings = $this->generateSoalWarnings($validated);

            $response = redirect()->route('admin.soal.index')
                ->with('success', 'Soal berhasil diupdate');

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

    public function destroy(Soal $soal)
    {
        try {
            $isUsedInPaket = $soal->detailPaketSoal()->exists();

            if ($isUsedInPaket) {
                return back()->with('error', 'Soal tidak dapat dihapus karena sedang digunakan dalam paket soal');
            }

            $soal->delete();
            return back()->with('success', 'Soal berhasil dihapus');

        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus soal: ' . $e->getMessage());
        }
    }

    public function show(Soal $soal)
    {
        return inertia('admin/soal/show', compact('soal'));
    }

    /**
     * Generate warnings berdasarkan kombinasi bobot minat dan bakat
     */
    private function generateSoalWarnings($data)
    {
        $warnings = [];

        if ($data['bobot_minat'] == $data['bobot_bakat']) {
            $warnings[] = 'Bobot minat dan bakat memiliki nilai yang sama (' . $data['bobot_minat'] . '). Ini mungkin mengurangi diferensiasi dalam penilaian.';
        }

        if ($data['bobot_minat'] == 0 && $data['bobot_bakat'] == 0) {
            $warnings[] = 'Kedua bobot bernilai netral (0). Soal ini mungkin tidak berkontribusi signifikan dalam penilaian minat dan bakat.';
        }

        if (
            ($data['bobot_minat'] == 1 && $data['bobot_bakat'] == -1) ||
            ($data['bobot_minat'] == -1 && $data['bobot_bakat'] == 1)
        ) {
            $warnings[] = 'Bobot minat dan bakat memiliki nilai berlawanan. Pastikan ini sesuai dengan tujuan soal.';
        }

        return $warnings;
    }
}