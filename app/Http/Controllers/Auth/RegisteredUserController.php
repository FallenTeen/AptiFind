<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PerguruanTinggi;
use App\Models\ProgramStudi;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Log;

class RegisteredUserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function store(Request $request)
    {
        Log::info('Register attempt', ['input' => $request->all()]);
        try {
            $request->merge(collect($request->all())->map(function ($value) {
                return $value === '' ? null : $value;
            })->toArray());
            $data = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
                'status' => ['required', 'in:calon_mahasiswa,mahasiswa_aktif'],
                'perguruan_tinggi_id' => ['nullable', 'exists:perguruan_tinggi,id'],
                'program_studi_id' => ['nullable', 'exists:program_studi,id'],
                'angkatan' => ['nullable', 'string', 'max:10'],
                'nim' => ['nullable', 'string', 'max:20'],
            ]);
            if ($data['status'] === 'mahasiswa_aktif') {
                $request->validate([
                    'perguruan_tinggi_id' => ['required', 'exists:perguruan_tinggi,id'],
                    'program_studi_id' => ['required', 'exists:program_studi,id'],
                    'angkatan' => ['required', 'string', 'max:10'],
                    'nim' => ['required', 'string', 'max:20'],
                ]);
            }
            $username = explode('@', $data['email'])[0];
            $originalUsername = $username;
            $i = 1;
            while (\App\Models\User::where('username', $username)->exists()) {
                $username = $originalUsername . $i;
                $i++;
            }
            $optionalFields = [
                'asal_sekolah',
                'jurusan_sekolah',
                'tahun_lulus_sekolah',
                'nilai_un',
                'nilai_rapor',
                'jenis_kelamin',
                'tanggal_lahir',
                'tempat_lahir',
                'alamat',
                'kota',
                'provinsi',
                'kode_pos',
                'no_hp',
            ];
            $allData = array_merge($data, $request->only($optionalFields));
            Log::info('Register validated', ['data' => $allData]);
            $user = \App\Models\User::create([
                'name' => $allData['name'],
                'email' => $allData['email'],
                'password' => bcrypt($allData['password']),
                'status' => $allData['status'],
                'username' => $username,
                'perguruan_tinggi_id' => $allData['perguruan_tinggi_id'] ?? null,
                'program_studi_id' => $allData['program_studi_id'] ?? null,
                'angkatan' => $allData['angkatan'] ?? null,
                'nim' => $allData['nim'] ?? null,
                'asal_sekolah' => $allData['asal_sekolah'] ?? null,
                'jurusan_sekolah' => $allData['jurusan_sekolah'] ?? null,
                'tahun_lulus_sekolah' => $allData['tahun_lulus_sekolah'] ?? null,
                'nilai_un' => $allData['nilai_un'] ?? null,
                'nilai_rapor' => $allData['nilai_rapor'] ?? null,
                'jenis_kelamin' => $allData['jenis_kelamin'] ?? null,
                'tanggal_lahir' => $allData['tanggal_lahir'] ?? null,
                'tempat_lahir' => $allData['tempat_lahir'] ?? null,
                'alamat' => $allData['alamat'] ?? null,
                'kota' => $allData['kota'] ?? null,
                'provinsi' => $allData['provinsi'] ?? null,
                'kode_pos' => $allData['kode_pos'] ?? null,
                'no_hp' => $allData['no_hp'] ?? null,
            ]);
            Auth::login($user);
            Log::info('Register success', ['user_id' => $user->id]);
            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            Log::error('Register failed', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            return redirect()->back()->withInput()->withErrors(['register' => 'Terjadi kesalahan saat register.']);
        }
    }
}
