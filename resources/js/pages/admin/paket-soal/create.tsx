import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Soal {
    id: number;
    text_soal: string;
    bobot_minat: number;
    bobot_bakat: number;
}

const breadcrumbs = [
    { title: 'Dashboard', href: String(route('dashboard')) },
    { title: 'Paket Soal', href: String(route('admin.paket-soal.index')) },
    { title: 'Buat Paket Soal', href: String(route('admin.paket-soal.create')) },
];

export default function PaketSoalCreate({ soal }: { soal: Soal[] }) {
    const { data, setData, post, errors, processing } = useForm({
        nama_paket: '',
        jumlah_soal: 1,
        soal_ids: [] as number[],
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterMinat, setFilterMinat] = useState<number | null>(null);
    const [filterBakat, setFilterBakat] = useState<number | null>(null);
    const [showBalance, setShowBalance] = useState(false);
    const [showUnbalancedWarning, setShowUnbalancedWarning] = useState(false);

    const selectedSoal = soal.filter((s) => data.soal_ids.includes(s.id));
    const totalMinat = selectedSoal.reduce((sum, s) => sum + s.bobot_minat, 0);
    const totalBakat = selectedSoal.reduce((sum, s) => sum + s.bobot_bakat, 0);
    const isBalanced = totalMinat === totalBakat;
    const balanceDiff = Math.abs(totalMinat - totalBakat);

    const filteredSoal = soal.filter((s) => {
        const matchesSearch = s.text_soal.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMinat = filterMinat === null || s.bobot_minat === filterMinat;
        const matchesBakat = filterBakat === null || s.bobot_bakat === filterBakat;
        return matchesSearch && matchesMinat && matchesBakat;
    });

    const getBobotLabel = (value: number): string => {
        switch (value) {
            case -1:
                return 'Sangat Tidak Setuju';
            case 0:
                return 'Netral';
            case 1:
                return 'Sangat Setuju';
            default:
                return '';
        }
    };

    const getBobotColor = (value: number): string => {
        switch (value) {
            case 1:
                return 'bg-green-100 text-green-800 border-green-200';
            case 0:
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case -1:
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newSoal, setNewSoal] = useState({
        text_soal: '',
        bobot_minat: 0,
        bobot_bakat: 0,
    });

    const handleAddSoal = (soalId: number) => {
        if (data.soal_ids.length >= data.jumlah_soal) return;
        if (!data.soal_ids.includes(soalId)) {
            setData('soal_ids', [...data.soal_ids, soalId]);
        }
    };
    const handleRemoveSoal = (soalId: number) => {
        setData(
            'soal_ids',
            data.soal_ids.filter((id) => id !== soalId),
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.soal_ids.length !== data.jumlah_soal) {
            alert('Jumlah soal yang dipilih harus sama dengan target jumlah soal!');
            return;
        }
        if (!isBalanced) {
            setShowUnbalancedWarning(true);
            return;
        }
        post(String(route('admin.paket-soal.store')));
    };
    const handleConfirmUnbalanced = () => {
        setShowUnbalancedWarning(false);
        post(String(route('admin.paket-soal.store')));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilterMinat(null);
        setFilterBakat(null);
    };
    const suggestBalancedSelection = () => {
        const targetCount = data.jumlah_soal;
        const minatPositive = soal.filter((s) => s.bobot_minat > 0);
        const minatNegative = soal.filter((s) => s.bobot_minat < 0);

        const bakatPositive = soal.filter((s) => s.bobot_bakat > 0);
        const bakatNegative = soal.filter((s) => s.bobot_bakat < 0);
        const selected: number[] = [];
        const halfTarget = Math.floor(targetCount / 2);
        for (let i = 0; i < halfTarget && i < minatPositive.length && i < bakatPositive.length; i++) {
            if (!selected.includes(minatPositive[i].id)) selected.push(minatPositive[i].id);
        }

        for (let i = 0; i < halfTarget && i < minatNegative.length && i < bakatNegative.length; i++) {
            if (!selected.includes(minatNegative[i].id)) selected.push(minatNegative[i].id);
        }

        const remaining = targetCount - selected.length;
        const availableSoal = soal.filter((s) => !selected.includes(s.id));

        for (let i = 0; i < remaining && i < availableSoal.length; i++) {
            selected.push(availableSoal[i].id);
        }

        setData('soal_ids', selected.slice(0, targetCount));
    };
    const createSoalForm = useForm({
        text_soal: '',
        bobot_minat: 0,
        bobot_bakat: 0,
    });

    const handleCreateSoal = async (e) => {
        e.preventDefault();
        setModalErrors({ text_soal: '', bobot_minat: '', bobot_bakat: '' });
        if (!validateModalForm()) {
            return;
        }

        createSoalForm.setData({
            text_soal: newSoal.text_soal.trim(),
            bobot_minat: newSoal.bobot_minat,
            bobot_bakat: newSoal.bobot_bakat,
        });

        setTimeout(() => {
            createSoalForm.post(String(route('admin.soal.store')), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCreateModal(false);
                    setNewSoal({ text_soal: '', bobot_minat: 0, bobot_bakat: 0 });
                    setModalErrors({ text_soal: '', bobot_minat: '', bobot_bakat: '' });
                    window.location.href = String(route('admin.paket-soal.create'));
                },
                onError: (err) => {
                    console.error('Validation errors:', err);
                    setModalErrors({
                        text_soal: err?.text_soal || '',
                        bobot_minat: err?.bobot_minat || '',
                        bobot_bakat: err?.bobot_bakat || '',
                    });
                },
            });
        }, 0);
    };

    const resetCreateForm = () => {
        setNewSoal({
            text_soal: '',
            bobot_minat: 0,
            bobot_bakat: 0,
        });
        setModalErrors({ text_soal: '', bobot_minat: '', bobot_bakat: '' });
        setShowCreateModal(false);
    };
    const handleTextSoalChange = (e) => {
        const value = e.target.value;
        setNewSoal({ ...newSoal, text_soal: value });

        if (modalErrors.text_soal) {
            const errors = { ...modalErrors };
            if (value.trim() && value.trim().length >= 10 && value.trim().length <= 1000) {
                const existingSoal = soal.find((s) => s.text_soal.toLowerCase().trim() === value.toLowerCase().trim());
                if (!existingSoal) {
                    errors.text_soal = '';
                    setModalErrors(errors);
                }
            }
        }
    };

    const [modalErrors, setModalErrors] = useState({
        text_soal: '',
        bobot_minat: '',
        bobot_bakat: '',
    });

    const validateModalForm = () => {
        const errors = {
            text_soal: '',
            bobot_minat: '',
            bobot_bakat: '',
        };

        let isValid = true;

        // Validasi text_soal
        if (!newSoal.text_soal.trim()) {
            errors.text_soal = 'Teks soal wajib diisi';
            isValid = false;
        } else if (newSoal.text_soal.trim().length < 10) {
            errors.text_soal = 'Teks soal minimal 10 karakter';
            isValid = false;
        } else if (newSoal.text_soal.trim().length > 1000) {
            errors.text_soal = 'Teks soal maksimal 1000 karakter';
            isValid = false;
        }

        // Validasi bobot_minat
        if (![1, 0, -1].includes(newSoal.bobot_minat)) {
            errors.bobot_minat = 'Bobot minat wajib dipilih';
            isValid = false;
        }

        // Validasi bobot_bakat
        if (![1, 0, -1].includes(newSoal.bobot_bakat)) {
            errors.bobot_bakat = 'Bobot bakat wajib dipilih';
            isValid = false;
        }

        // Cek duplikasi soal
        const existingSoal = soal.find((s) => s.text_soal.toLowerCase().trim() === newSoal.text_soal.toLowerCase().trim());
        if (existingSoal) {
            errors.text_soal = 'Soal dengan teks yang sama sudah ada';
            isValid = false;
        }

        setModalErrors(errors);
        return isValid;
    };

    return (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h6a1 1 0 011 1v2M7 7v2"
                                            />
                                        </svg>
                                    </div>
                                    Buat Paket Soal
                                </h1>
                                <p className="mt-2 text-emerald-100">Buat paket soal yang seimbang antara aspek minat dan bakat</p>
                            </div>
                            <Link
                                href={String(route('admin.paket-soal.index'))}
                                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-emerald-600 shadow-lg transition-colors duration-200 hover:bg-emerald-50"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali
                            </Link>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama Paket */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Nama Paket Soal</label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama paket soal..."
                                        value={data.nama_paket}
                                        onChange={(e) => setData('nama_paket', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                        required
                                    />
                                    {errors.nama_paket && <p className="mt-1 text-sm text-red-600">{errors.nama_paket}</p>}
                                </div>

                                {/* Jumlah Soal */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Jumlah Soal Target</label>
                                    <div className="flex gap-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                min={1}
                                                max={soal.length}
                                                value={data.jumlah_soal}
                                                onChange={(e) => setData('jumlah_soal', parseInt(e.target.value) || 1)}
                                                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={suggestBalancedSelection}
                                            className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-blue-700"
                                        >
                                            Auto Pilih
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowCreateModal(true)}
                                            className="flex items-center gap-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-green-700"
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Tambah Soal
                                        </button>
                                    </div>
                                    {errors.jumlah_soal && <p className="mt-1 text-sm text-red-600">{errors.jumlah_soal}</p>}
                                </div>
                            </div>

                            {/* Balance Info */}
                            <div className="rounded-lg bg-gray-50 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="font-medium text-gray-900">Status Keseimbangan Paket</h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowBalance(!showBalance)}
                                        className="text-sm text-emerald-600 hover:text-emerald-700"
                                    >
                                        {showBalance ? 'Sembunyikan' : 'Tampilkan'} Detail
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border bg-white p-3">
                                        <div className="text-sm text-gray-600">Soal Terpilih</div>
                                        <div className="text-2xl font-bold text-gray-900">{selectedSoal.length}</div>
                                        <div className="text-xs text-gray-500">dari {data.jumlah_soal} target</div>
                                    </div>

                                    <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                                        <div className="text-sm text-green-800">Total Bobot Minat</div>
                                        <div className="text-2xl font-bold text-green-900">{totalMinat}</div>
                                    </div>

                                    <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                                        <div className="text-sm text-purple-800">Total Bobot Bakat</div>
                                        <div className="text-2xl font-bold text-purple-900">{totalBakat}</div>
                                    </div>
                                </div>

                                {/* Balance Warning */}
                                {selectedSoal.length > 0 && (
                                    <div
                                        className={`mt-4 rounded-lg border p-3 ${
                                            isBalanced
                                                ? 'border-green-200 bg-green-50 text-green-800'
                                                : 'border-yellow-200 bg-yellow-50 text-yellow-800'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {isBalanced ? (
                                                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                                                    />
                                                </svg>
                                            )}
                                            <span className="font-medium">
                                                {isBalanced ? 'Paket soal sudah seimbang! ✨' : `Paket soal belum seimbang (selisih: ${balanceDiff})`}
                                            </span>
                                        </div>
                                        {!isBalanced && (
                                            <p className="mt-1 text-sm">
                                                {totalMinat > totalBakat
                                                    ? 'Bobot minat lebih tinggi dari bakat. Pertimbangkan menambah soal dengan bobot bakat positif.'
                                                    : 'Bobot bakat lebih tinggi dari minat. Pertimbangkan menambah soal dengan bobot minat positif.'}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {selectedSoal.map((s) => (
                                    <div key={s.id} className="flex items-center justify-between rounded border bg-white p-2 text-sm">
                                        <span className="mr-2 flex-1 truncate">{s.text_soal}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <span className={`rounded px-2 py-1 text-xs ${getBobotColor(s.bobot_minat)}`}>M:{s.bobot_minat}</span>
                                                <span className={`rounded px-2 py-1 text-xs ${getBobotColor(s.bobot_bakat)}`}>B:{s.bobot_bakat}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSoal(s.id)}
                                                className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                                title="Hapus dari paket"
                                            >
                                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3">
                                <Link
                                    href={String(route('admin.paket-soal.index'))}
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing || selectedSoal.length === 0}
                                    className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="mr-2 -ml-1 h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Simpan Paket Soal
                                        </>
                                    )}
                                </button>
                            </div>

                            {errors.soal_ids && <p className="text-sm text-red-600">{errors.soal_ids}</p>}
                        </form>
                    </div>
                </div>

                {/* Soal Selection */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                        <h2 className="text-lg font-semibold text-gray-900">Pilih Soal untuk Paket</h2>

                        {/* Filters */}
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                            {/* Search */}
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari soal..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <svg
                                        className="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Filter Minat */}
                            <div>
                                <select
                                    value={filterMinat ?? ''}
                                    onChange={(e) => setFilterMinat(e.target.value ? Number(e.target.value) : null)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Semua Minat</option>
                                    <option value="1">Sangat Setuju (1)</option>
                                    <option value="0">Netral (0)</option>
                                    <option value="-1">Sangat Tidak Setuju (-1)</option>
                                </select>
                            </div>

                            {/* Filter Bakat */}
                            <div>
                                <select
                                    value={filterBakat ?? ''}
                                    onChange={(e) => setFilterBakat(e.target.value ? Number(e.target.value) : null)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">Semua Bakat</option>
                                    <option value="1">Sangat Setuju (1)</option>
                                    <option value="0">Netral (0)</option>
                                    <option value="-1">Sangat Tidak Setuju (-1)</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(searchTerm || filterMinat !== null || filterBakat !== null) && (
                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-sm text-gray-600">Filter aktif:</span>
                                {searchTerm && (
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                        Pencarian: "{searchTerm}"
                                    </span>
                                )}
                                {filterMinat !== null && (
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                        Minat: {filterMinat}
                                    </span>
                                )}
                                {filterBakat !== null && (
                                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                                        Bakat: {filterBakat}
                                    </span>
                                )}
                                <button onClick={clearFilters} className="text-xs text-gray-500 underline hover:text-gray-700">
                                    Hapus semua filter
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Info */}
                    <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-600">
                        Menampilkan {filteredSoal.length} dari {soal.length} soal • {selectedSoal.length} soal terpilih
                    </div>

                    {/* Soal List */}
                    <div className="max-h-96 overflow-y-auto">
                        {filteredSoal.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada soal yang sesuai filter</h3>
                                <p className="text-gray-500">Coba ubah kriteria pencarian atau hapus filter yang aktif</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {filteredSoal.map((s) => (
                                    <div
                                        key={s.id}
                                        className={`p-4 transition-colors hover:bg-gray-50 ${
                                            data.soal_ids.includes(s.id) ? 'border-l-4 border-emerald-500 bg-emerald-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex items-center pt-1">
                                                {/* Ganti checkbox dengan tombol tambah/hapus */}
                                                {data.soal_ids.includes(s.id) ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSoal(s.id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                                        title="Hapus dari paket"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddSoal(s.id)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 disabled:opacity-50"
                                                        title="Tambah ke paket"
                                                        disabled={data.soal_ids.length >= data.jumlah_soal}
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                                                        ID #{s.id}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <span
                                                            className={`inline-flex items-center rounded border px-2 py-1 text-xs font-medium ${getBobotColor(s.bobot_minat)}`}
                                                        >
                                                            Minat: {s.bobot_minat}
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center rounded border px-2 py-1 text-xs font-medium ${getBobotColor(s.bobot_bakat)}`}
                                                        >
                                                            Bakat: {s.bobot_bakat}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className="leading-relaxed text-gray-900">{s.text_soal}</p>

                                                <div className="mt-2 grid grid-cols-2 gap-4 text-xs">
                                                    <div className="text-green-600">
                                                        <span className="font-medium">Minat:</span> {s.bobot_minat} - {getBobotLabel(s.bobot_minat)}
                                                    </div>
                                                    <div className="text-purple-600">
                                                        <span className="font-medium">Bakat:</span> {s.bobot_bakat} - {getBobotLabel(s.bobot_bakat)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal Create Soal */}
            {showCreateModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Tambah Soal Baru</h3>
                            <button onClick={resetCreateForm} className="text-gray-400 hover:text-gray-600">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreateSoal} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Teks Soal</label>
                                <textarea
                                    value={newSoal.text_soal}
                                    onChange={handleTextSoalChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                    rows={3}
                                    required
                                />
                                {modalErrors.text_soal && <p className="mt-1 text-sm text-red-600">{modalErrors.text_soal}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Bobot Minat</label>
                                    <select
                                        value={newSoal.bobot_minat}
                                        onChange={(e) => setNewSoal({ ...newSoal, bobot_minat: Number(e.target.value) })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value={1}>Sangat Setuju (1)</option>
                                        <option value={0}>Netral (0)</option>
                                        <option value={-1}>Sangat Tidak Setuju (-1)</option>
                                    </select>
                                    {modalErrors.bobot_minat && <p className="mt-1 text-sm text-red-600">{modalErrors.bobot_minat}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Bobot Bakat</label>
                                    <select
                                        value={newSoal.bobot_bakat}
                                        onChange={(e) => setNewSoal({ ...newSoal, bobot_bakat: Number(e.target.value) })}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                        required
                                    >
                                        <option value={1}>Sangat Setuju (1)</option>
                                        <option value={0}>Netral (0)</option>
                                        <option value={-1}>Sangat Tidak Setuju (-1)</option>
                                    </select>
                                    {modalErrors.bobot_bakat && <p className="mt-1 text-sm text-red-600">{modalErrors.bobot_bakat}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetCreateForm}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={createSoalForm.processing}
                                    className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {createSoalForm.processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal Peringatan Tidak Seimbang */}
            {showUnbalancedWarning && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">Peringatan Keseimbangan</h3>
                        </div>

                        <div className="mb-6">
                            <p className="mb-4 text-gray-700">Paket soal ini belum seimbang antara bobot minat dan bakat (selisih: {balanceDiff}).</p>
                            <div className="space-y-2 rounded-lg bg-gray-50 p-3">
                                <div className="flex justify-between">
                                    <span>Total Bobot Minat:</span>
                                    <span className="font-semibold text-green-600">{totalMinat}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Total Bobot Bakat:</span>
                                    <span className="font-semibold text-purple-600">{totalBakat}</span>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                                Apakah Anda yakin ingin melanjutkan menyimpan paket soal yang tidak seimbang?
                            </p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowUnbalancedWarning(false)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmUnbalanced}
                                className="rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                            >
                                Lanjutkan Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppSidebarLayout>
    );
}
