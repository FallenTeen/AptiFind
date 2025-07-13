import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, ChevronDown } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AuthSplitLayout from '@/layouts/auth/auth-split-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    status: 'calon_mahasiswa' | 'mahasiswa_aktif';
    perguruan_tinggi_id?: string;
    program_studi_id?: string;
    nim?: string;
    asal_sekolah?: string;
    jurusan_sekolah?: string;
    tahun_lulus_sekolah?: string;
    nilai_un?: string;
    nilai_rapor?: string;
    jenis_kelamin?: 'laki_laki' | 'perempuan';
    tanggal_lahir?: string;
    tempat_lahir?: string;
    alamat?: string;
    kota?: string;
    provinsi?: string;
    kode_pos?: string;
    no_hp?: string;
    angkatan?: string;
};

interface PerguruanTinggi {
    id: number;
    nama: string;
    akronim: string;
    jenis: string;
}

interface ProgramStudi {
    id: number;
    nama: string;
    jenjang: string;
    kode_prodi: string;
}

export default function Register() {
    const [perguruanTinggi, setPerguruanTinggi] = useState<PerguruanTinggi[]>([]);
    const [programStudi, setProgramStudi] = useState<ProgramStudi[]>([]);
    const [loadingPT, setLoadingPT] = useState(false);
    const [loadingPS, setLoadingPS] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        status: 'calon_mahasiswa',
        perguruan_tinggi_id: '',
        program_studi_id: '',
        nim: '',
        asal_sekolah: '',
        jurusan_sekolah: '',
        tahun_lulus_sekolah: '',
        nilai_un: '',
        nilai_rapor: '',
        jenis_kelamin: 'laki_laki',
        tanggal_lahir: '',
        tempat_lahir: '',
        alamat: '',
        kota: '',
        provinsi: '',
        kode_pos: '',
        no_hp: '',
        angkatan: '',
    });

    useEffect(() => {
        loadPerguruanTinggi();
    }, []);

    useEffect(() => {
        if (data.perguruan_tinggi_id && data.status === 'mahasiswa_aktif') {
            loadProgramStudi(data.perguruan_tinggi_id);
        } else {
            setProgramStudi([]);
            setData('program_studi_id', '');
        }
    }, [data.perguruan_tinggi_id, data.status]);

    const loadPerguruanTinggi = async () => {
        setLoadingPT(true);
        try {
            const response = await fetch('/api/perguruan-tinggi?status=aktif');
            const data = await response.json();
            setPerguruanTinggi(data.data || []);
        } catch (error) {
            console.error('Error loading perguruan tinggi:', error);
        } finally {
            setLoadingPT(false);
        }
    };

    const loadProgramStudi = async (ptId: string) => {
        setLoadingPS(true);
        try {
            const response = await fetch(`/api/program-studi?perguruan_tinggi_id=${ptId}&status=aktif`);
            const data = await response.json();
            setProgramStudi(data.data || []);
        } catch (error) {
            console.error('Error loading program studi:', error);
        } finally {
            setLoadingPS(false);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const isCalonMahasiswa = data.status === 'calon_mahasiswa';
    const isMahasiswaAktif = data.status === 'mahasiswa_aktif';

    return (
        <AuthSplitLayout 
            title="Buat Akun Baru" 
            description="Daftar untuk mengakses sistem penilaian minat dan bakat"
        >
            <Head title="Daftar" />
            <div className="w-full max-w-4xl mx-auto p-2">
                <form className="flex flex-col gap-8" onSubmit={submit}>
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Dasar</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nama Lengkap *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Masukkan nama lengkap"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password *</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Minimal 8 karakter"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">Konfirmasi Password *</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Ulangi password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                    <Select
                                        value={data.jenis_kelamin}
                                        onValueChange={(value) => setData('jenis_kelamin', value as 'laki_laki' | 'perempuan')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis kelamin" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="laki_laki">Laki-laki</SelectItem>
                                            <SelectItem value="perempuan">Perempuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.jenis_kelamin} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="no_hp">Nomor HP</Label>
                                    <Input
                                        id="no_hp"
                                        type="tel"
                                        value={data.no_hp}
                                        onChange={(e) => setData('no_hp', e.target.value)}
                                        disabled={processing}
                                        placeholder="08xxxxxxxxxx"
                                    />
                                    <InputError message={errors.no_hp} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Mahasiswa */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Status Mahasiswa</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value as 'calon_mahasiswa' | 'mahasiswa_aktif')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="calon_mahasiswa">Calon Mahasiswa</SelectItem>
                                            <SelectItem value="mahasiswa_aktif">Mahasiswa Aktif</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.status} />
                                </div>

                                {/* Fields untuk Calon Mahasiswa */}
                                {isCalonMahasiswa && (
                                    <div className="space-y-6 p-6 bg-blue-50 rounded-lg">
                                        <h4 className="text-lg font-medium text-blue-900">Informasi Sekolah</h4>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="asal_sekolah">Asal Sekolah</Label>
                                                <Input
                                                    id="asal_sekolah"
                                                    type="text"
                                                    value={data.asal_sekolah}
                                                    onChange={(e) => setData('asal_sekolah', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Nama SMA/SMK"
                                                />
                                                <InputError message={errors.asal_sekolah} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="jurusan_sekolah">Jurusan Sekolah</Label>
                                                <Input
                                                    id="jurusan_sekolah"
                                                    type="text"
                                                    value={data.jurusan_sekolah}
                                                    onChange={(e) => setData('jurusan_sekolah', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="IPA/IPS/Teknik/dll"
                                                />
                                                <InputError message={errors.jurusan_sekolah} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="tahun_lulus_sekolah">Tahun Lulus</Label>
                                                <Input
                                                    id="tahun_lulus_sekolah"
                                                    type="number"
                                                    min="2010"
                                                    max="2030"
                                                    value={data.tahun_lulus_sekolah}
                                                    onChange={(e) => setData('tahun_lulus_sekolah', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="2024"
                                                />
                                                <InputError message={errors.tahun_lulus_sekolah} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="nilai_un">Nilai UN (Opsional)</Label>
                                                <Input
                                                    id="nilai_un"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                    value={data.nilai_un}
                                                    onChange={(e) => setData('nilai_un', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="85.50"
                                                />
                                                <InputError message={errors.nilai_un} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Fields untuk Mahasiswa Aktif */}
                                {isMahasiswaAktif && (
                                    <div className="space-y-6 p-6 bg-green-50 rounded-lg">
                                        <h4 className="text-lg font-medium text-green-900">Informasi Kampus</h4>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="perguruan_tinggi_id">Perguruan Tinggi *</Label>
                                                <Select
                                                    value={data.perguruan_tinggi_id}
                                                    onValueChange={(value) => setData('perguruan_tinggi_id', value)}
                                                    disabled={loadingPT}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={loadingPT ? "Loading..." : "Pilih perguruan tinggi"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {perguruanTinggi.map((pt) => (
                                                            <SelectItem key={pt.id} value={pt.id.toString()}>
                                                                {pt.nama} ({pt.akronim})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.perguruan_tinggi_id} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="program_studi_id">Program Studi *</Label>
                                                <Select
                                                    value={data.program_studi_id}
                                                    onValueChange={(value) => setData('program_studi_id', value)}
                                                    disabled={loadingPS || !data.perguruan_tinggi_id}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={loadingPS ? "Loading..." : "Pilih program studi"} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {programStudi.map((ps) => (
                                                            <SelectItem key={ps.id} value={ps.id.toString()}>
                                                                {ps.jenjang} {ps.nama} ({ps.kode_prodi})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.program_studi_id} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="nim">NIM</Label>
                                                <Input
                                                    id="nim"
                                                    type="text"
                                                    value={data.nim}
                                                    onChange={(e) => setData('nim', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Nomor Induk Mahasiswa"
                                                />
                                                <InputError message={errors.nim} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="angkatan">Angkatan *</Label>
                                                <Input
                                                    id="angkatan"
                                                    type="text"
                                                    value={data.angkatan}
                                                    onChange={(e) => setData('angkatan', e.target.value)}
                                                    required
                                                    placeholder="2023"
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.angkatan} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                                    <Input
                                        id="tempat_lahir"
                                        type="text"
                                        value={data.tempat_lahir}
                                        onChange={(e) => setData('tempat_lahir', e.target.value)}
                                        disabled={processing}
                                        placeholder="Kota tempat lahir"
                                    />
                                    <InputError message={errors.tempat_lahir} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
                                    <Input
                                        id="tanggal_lahir"
                                        type="date"
                                        value={data.tanggal_lahir}
                                        onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.tanggal_lahir} />
                                </div>
                            </div>

                            <div className="space-y-2 mt-6">
                                <Label htmlFor="alamat">Alamat</Label>
                                <Textarea
                                    id="alamat"
                                    value={data.alamat}
                                    onChange={(e) => setData('alamat', e.target.value)}
                                    disabled={processing}
                                    placeholder="Alamat lengkap"
                                    rows={3}
                                />
                                <InputError message={errors.alamat} />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="kota">Kota</Label>
                                    <Input
                                        id="kota"
                                        type="text"
                                        value={data.kota}
                                        onChange={(e) => setData('kota', e.target.value)}
                                        disabled={processing}
                                        placeholder="Kota"
                                    />
                                    <InputError message={errors.kota} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="provinsi">Provinsi</Label>
                                    <Input
                                        id="provinsi"
                                        type="text"
                                        value={data.provinsi}
                                        onChange={(e) => setData('provinsi', e.target.value)}
                                        disabled={processing}
                                        placeholder="Provinsi"
                                    />
                                    <InputError message={errors.provinsi} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="kode_pos">Kode Pos</Label>
                                    <Input
                                        id="kode_pos"
                                        type="text"
                                        value={data.kode_pos}
                                        onChange={(e) => setData('kode_pos', e.target.value)}
                                        disabled={processing}
                                        placeholder="12345"
                                    />
                                    <InputError message={errors.kode_pos} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Buat Akun
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        Sudah punya akun?{' '}
                        <TextLink href={route('login')}>
                            Masuk
                        </TextLink>
                    </div>
                </form>
            </div>
        </AuthSplitLayout>
    );
}
