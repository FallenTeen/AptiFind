import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda Admin',
        href: '/dashboard',
    },
    {
        title: 'Perguruan Tinggi',
        href: '/admin/perguruan-tinggi',
    },
    {
        title: 'Edit',
        href: '#',
    },
];


type ProgramStudiForm = {
    id?: number;
    nama: string;
    jenjang: string;
    akreditasi: string;
    status: string;
};

type EditPerguruanTinggiForm = {
    nama: string;
    akronim: string;
    jenis: string;
    alamat: string;
    kota: string;
    provinsi: string;
    kode_pos: string;
    no_telp: string;
    email: string;
    website: string;
    deskripsi: string;
    status: string;
    program_studi: ProgramStudiForm[];
};


interface Props {
    perguruanTinggi: {
        id: number;
        nama: string;
        akronim: string;
        jenis: string;
        alamat: string;
        kota: string;
        provinsi: string;
        kode_pos: string;
        no_telp: string;
        email: string;
        website: string;
        deskripsi: string;
        status: string;
        program_studi: ProgramStudiForm[];
    };
}

export default function EditPerguruanTinggi({ perguruanTinggi }: Props) {


    const { data, setData, put, processing, errors } = useForm<EditPerguruanTinggiForm>({
        nama: perguruanTinggi.nama,
        akronim: perguruanTinggi.akronim,
        jenis: perguruanTinggi.jenis,
        alamat: perguruanTinggi.alamat,
        kota: perguruanTinggi.kota,
        provinsi: perguruanTinggi.provinsi,
        kode_pos: perguruanTinggi.kode_pos,
        no_telp: perguruanTinggi.no_telp,
        email: perguruanTinggi.email,
        website: perguruanTinggi.website,
        deskripsi: perguruanTinggi.deskripsi,
        status: perguruanTinggi.status,
        program_studi: perguruanTinggi.program_studi && perguruanTinggi.program_studi.length > 0
            ? perguruanTinggi.program_studi.map((prodi: ProgramStudiForm) => ({
                id: prodi.id,
                nama: prodi.nama,
                jenjang: prodi.jenjang,
                akreditasi: prodi.akreditasi,
                status: prodi.status,
            }))
            : [{ nama: '', jenjang: '', akreditasi: '', status: 'aktif' }],
    });

    const handleAddProdi = () => {
        setData('program_studi', [...data.program_studi, { nama: '', jenjang: '', akreditasi: '', status: 'aktif' }]);
    };
    const handleRemoveProdi = (idx: number) => {
        setData('program_studi', data.program_studi.filter((_, i) => i !== idx));
    };
    const handleProdiChange = (idx: number, field: keyof ProgramStudiForm, value: string) => {
        setData('program_studi', data.program_studi.map((prodi, i) => i === idx ? { ...prodi, [field]: value } : prodi));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.perguruan-tinggi.update', perguruanTinggi.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${perguruanTinggi.nama} - Admin`} />
            <PageLayout>
                <PageHeader
                    title={`Edit Perguruan Tinggi: ${perguruanTinggi.nama}`}
                    subtitle="Perbarui informasi perguruan tinggi"
                />

                <PageContent>
                    <Card>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                {/* Informasi Dasar */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Dasar</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="nama">Nama Perguruan Tinggi *</Label>
                                            <Input
                                                id="nama"
                                                type="text"
                                                required
                                                value={data.nama}
                                                onChange={(e) => setData('nama', e.target.value)}
                                                disabled={processing}
                                                placeholder="Masukkan nama perguruan tinggi"
                                            />
                                            <InputError message={errors.nama} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="akronim">Akronim *</Label>
                                            <Input
                                                id="akronim"
                                                type="text"
                                                required
                                                value={data.akronim}
                                                onChange={(e) => setData('akronim', e.target.value)}
                                                disabled={processing}
                                                placeholder="Contoh: UI, ITB, UGM"
                                            />
                                            <InputError message={errors.akronim} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="jenis">Jenis Perguruan Tinggi *</Label>
                                            <Select
                                                value={data.jenis}
                                                onValueChange={(value) => setData('jenis', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih jenis perguruan tinggi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="universitas">Universitas</SelectItem>
                                                    <SelectItem value="institut">Institut</SelectItem>
                                                    <SelectItem value="sekolah_tinggi">Sekolah Tinggi</SelectItem>
                                                    <SelectItem value="politeknik">Politeknik</SelectItem>
                                                    <SelectItem value="akademi">Akademi</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.jenis} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status *</Label>
                                            <Select
                                                value={data.status}
                                                onValueChange={(value) => setData('status', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="aktif">Aktif</SelectItem>
                                                    <SelectItem value="nonaktif">Nonaktif</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.status} />
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Kontak */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                disabled={processing}
                                                placeholder="email@perguruan-tinggi.ac.id"
                                            />
                                            <InputError message={errors.email} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="no_telp">Nomor Telepon</Label>
                                            <Input
                                                id="no_telp"
                                                type="tel"
                                                value={data.no_telp}
                                                onChange={(e) => setData('no_telp', e.target.value)}
                                                disabled={processing}
                                                placeholder="021-1234567"
                                            />
                                            <InputError message={errors.no_telp} />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="website">Website</Label>
                                            <Input
                                                id="website"
                                                type="url"
                                                value={data.website}
                                                onChange={(e) => setData('website', e.target.value)}
                                                disabled={processing}
                                                placeholder="https://www.perguruan-tinggi.ac.id"
                                            />
                                            <InputError message={errors.website} />
                                        </div>
                                    </div>
                                </div>

                                {/* Alamat */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Alamat</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="alamat">Alamat Lengkap</Label>
                                            <Textarea
                                                id="alamat"
                                                value={data.alamat}
                                                onChange={(e) => setData('alamat', e.target.value)}
                                                disabled={processing}
                                                placeholder="Masukkan alamat lengkap perguruan tinggi"
                                                rows={3}
                                            />
                                            <InputError message={errors.alamat} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="kota">Kota</Label>
                                                <Input
                                                    id="kota"
                                                    type="text"
                                                    value={data.kota}
                                                    onChange={(e) => setData('kota', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Jakarta"
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
                                                    placeholder="DKI Jakarta"
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

                                {/* Deskripsi */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Deskripsi</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="deskripsi">Deskripsi Perguruan Tinggi</Label>
                                        <Textarea
                                            id="deskripsi"
                                            value={data.deskripsi}
                                            onChange={(e) => setData('deskripsi', e.target.value)}
                                            disabled={processing}
                                            placeholder="Masukkan deskripsi singkat tentang perguruan tinggi"
                                            rows={4}
                                        />
                                        <InputError message={errors.deskripsi} />
                                    </div>
                                </div>

                                {/* Program Studi Inline */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daftar Program Studi</h3>
                                    <div className="space-y-4">
                                        {data.program_studi.map((prodi, idx) => (
                                            <div key={prodi.id ?? idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end border-b pb-4 mb-2">
                                                <div className="space-y-2">
                                                    <Label>Nama Program Studi</Label>
                                                    <Input value={prodi.nama} onChange={e => handleProdiChange(idx, 'nama', e.target.value)} placeholder="Nama Prodi" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Jenjang</Label>
                                                    <Input value={prodi.jenjang} onChange={e => handleProdiChange(idx, 'jenjang', e.target.value)} placeholder="S1/D3/D4/S2" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Akreditasi</Label>
                                                    <Input value={prodi.akreditasi} onChange={e => handleProdiChange(idx, 'akreditasi', e.target.value)} placeholder="A/B/C" required />
                                                </div>
                                                <div className="flex gap-2 items-center">
                                                    <Select value={prodi.status} onValueChange={val => handleProdiChange(idx, 'status', val)}>
                                                        <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="aktif">Aktif</SelectItem>
                                                            <SelectItem value="nonaktif">Nonaktif</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {data.program_studi.length > 1 && (
                                                        <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveProdi(idx)}>-</Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        <Button type="button" variant="secondary" onClick={handleAddProdi}>+ Tambah Program Studi</Button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => window.history.back()}
                                        disabled={processing}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                        Perbarui Perguruan Tinggi
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
}
