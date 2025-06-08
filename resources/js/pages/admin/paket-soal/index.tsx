import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { type BreadcrumbItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: String(route('dashboard')),
    },
    {
        title: 'Paket Soal',
        href: String(route('admin.paket-soal.index')),
    },
];

interface PaketSoal {
    id: number;
    nama_paket: string;
    jumlah_soal: number;
    balance_minat?: number;
    balance_bakat?: number;
}

interface Props {
    paket: PaketSoal[];
}

export default function PaketSoalIndex({ paket }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'nama' | 'jumlah' | 'minat' | 'bakat'>('nama');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const getBalanceColor = (balance: number): string => {
        const absBalance = Math.abs(balance);
        if (absBalance === 0) return 'bg-green-100 text-green-800 border-green-200';
        if (absBalance <= 5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (absBalance <= 10) return 'bg-orange-100 text-orange-800 border-orange-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getBalanceLabel = (balance: number): string => {
        const absBalance = Math.abs(balance);
        if (absBalance === 0) return 'Seimbang';
        if (absBalance <= 5) return 'Cukup Seimbang';
        if (absBalance <= 10) return 'Kurang Seimbang';
        return 'Tidak Seimbang';
    };

    const getSizeCategory = (jumlah: number): { label: string; color: string } => {
        if (jumlah < 5) return { label: 'Sangat Kecil', color: 'bg-red-100 text-red-800' };
        if (jumlah < 10) return { label: 'Kecil', color: 'bg-orange-100 text-orange-800' };
        if (jumlah < 20) return { label: 'Sedang', color: 'bg-blue-100 text-blue-800' };
        if (jumlah < 50) return { label: 'Besar', color: 'bg-green-100 text-green-800' };
        return { label: 'Sangat Besar', color: 'bg-purple-100 text-purple-800' };
    };

    const filteredAndSortedPaket = paket
        .filter((p) => p.nama_paket.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            let compareValue = 0;
            switch (sortBy) {
                case 'nama':
                    compareValue = a.nama_paket.localeCompare(b.nama_paket);
                    break;
                case 'jumlah':
                    compareValue = a.jumlah_soal - b.jumlah_soal;
                    break;
                case 'minat':
                    compareValue = (a.balance_minat || 0) - (b.balance_minat || 0);
                    break;
                case 'bakat':
                    compareValue = (a.balance_bakat || 0) - (b.balance_bakat || 0);
                    break;
            }
            return sortOrder === 'asc' ? compareValue : -compareValue;
        });

    const handleSort = (field: 'nama' | 'jumlah' | 'minat' | 'bakat') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleDelete = (id: number) => {
        router.delete(String(route('admin.paket-soal.destroy', id)), {
            onSuccess: () => setDeleteConfirm(null),
        });
    };

    const totalSoal = paket.reduce((sum, p) => sum + p.jumlah_soal, 0);
    const seimbangCount = paket.filter((p) => Math.abs((p.balance_minat || 0) - (p.balance_bakat || 0)) === 0).length;

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
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </div>
                                    Daftar Paket Soal
                                </h1>
                                <p className="mt-2 text-emerald-100">
                                    Kelola paket soal untuk sistem penilaian minat dan bakat ({paket.length} paket)
                                </p>
                            </div>
                            <Link
                                href={String(route('admin.paket-soal.create'))}
                                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-emerald-600 shadow-lg transition-colors duration-200 hover:bg-emerald-50"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Buat Paket Soal
                            </Link>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="border-b border-gray-200 bg-gray-50 p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{paket.length}</div>
                                        <div className="text-sm text-gray-500">Total Paket</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{totalSoal}</div>
                                        <div className="text-sm text-gray-500">Total Soal</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">{seimbangCount}</div>
                                        <div className="text-sm text-gray-500">Paket Seimbang</div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                        <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900">
                                            {paket.length > 0 ? Math.round(totalSoal / paket.length) : 0}
                                        </div>
                                        <div className="text-sm text-gray-500">Rata-rata Soal</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Sort */}
                    <div className="p-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari paket soal..."
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

                            {/* Sort Options */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSort('nama')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                        sortBy === 'nama' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Nama {sortBy === 'nama' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button
                                    onClick={() => handleSort('jumlah')}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                        sortBy === 'jumlah' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Jumlah {sortBy === 'jumlah' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="mb-4 text-sm text-gray-600">
                    Menampilkan {filteredAndSortedPaket.length} dari {paket.length} paket soal
                </div>

                {/* Paket List */}
                <div className="space-y-4">
                    {filteredAndSortedPaket.length === 0 ? (
                        <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                {paket.length === 0 ? 'Belum ada paket soal' : 'Tidak ada paket yang sesuai pencarian'}
                            </h3>
                            <p className="mb-6 text-gray-500">
                                {paket.length === 0
                                    ? 'Mulai dengan membuat paket soal pertama untuk sistem penilaian'
                                    : 'Coba ubah kata kunci pencarian untuk hasil yang lebih luas'}
                            </p>
                            {paket.length === 0 && (
                                <Link
                                    href={String(route('admin.paket-soal.create'))}
                                    className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
                                >
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Buat Paket Soal Pertama
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredAndSortedPaket.map((p) => {
                            const balanceMinat = p.balance_minat || 0;
                            const balanceBakat = p.balance_bakat || 0;
                            const balanceDiff = Math.abs(balanceMinat - balanceBakat);
                            const sizeCategory = getSizeCategory(p.jumlah_soal);

                            return (
                                <div
                                    key={p.id}
                                    className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="mb-3 flex items-center gap-3">
                                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                                                        ID #{p.id}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${sizeCategory.color}`}
                                                    >
                                                        {sizeCategory.label}
                                                    </span>
                                                    <span
                                                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getBalanceColor(balanceDiff)}`}
                                                    >
                                                        {getBalanceLabel(balanceDiff)}
                                                    </span>
                                                </div>

                                                <h3 className="mb-3 text-xl font-semibold text-gray-900">{p.nama_paket}</h3>

                                                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <svg
                                                                className="h-5 w-5 text-blue-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                />
                                                            </svg>
                                                            <span className="font-medium text-blue-800">Jumlah Soal</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-blue-600">{p.jumlah_soal}</div>
                                                        <div className="text-sm text-blue-600">soal</div>
                                                    </div>

                                                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <svg
                                                                className="h-5 w-5 text-green-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                                />
                                                            </svg>
                                                            <span className="font-medium text-green-800">Balance Minat</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-green-600">{balanceMinat}</div>
                                                        <div className="text-sm text-green-600">poin</div>
                                                    </div>

                                                    <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <svg
                                                                className="h-5 w-5 text-purple-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                                                />
                                                            </svg>
                                                            <span className="font-medium text-purple-800">Balance Bakat</span>
                                                        </div>
                                                        <div className="text-2xl font-bold text-purple-600">{balanceBakat}</div>
                                                        <div className="text-sm text-purple-600">poin</div>
                                                    </div>
                                                </div>

                                                {balanceDiff > 0 && (
                                                    <div className={`rounded-lg border p-3 ${getBalanceColor(balanceDiff)}`}>
                                                        <div className="flex items-center gap-2">
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                                                                />
                                                            </svg>
                                                            <span className="text-sm font-medium">
                                                                Selisih balance: {balanceDiff} poin ({getBalanceLabel(balanceDiff)})
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Link
                                                    href={String(route('admin.paket-soal.show', p.id))}
                                                    className="inline-flex items-center rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-600 transition-colors duration-200 hover:bg-emerald-100"
                                                >
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                    Detail
                                                </Link>
                                                <Link
                                                    href={String(route('admin.paket-soal.edit', p.id))}
                                                    className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100"
                                                >
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12h6m-6 0H3m6 0V6m0 6v6" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteConfirm(p.id)}
                                                    className="inline-flex items-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors duration-200 hover:bg-red-100"
                                                >
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                        <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Hapus</h3>
                            </div>
                            <p className="mb-6 text-gray-600">
                                Apakah Anda yakin ingin menghapus paket soal ini? Tindakan ini tidak dapat dibatalkan dan akan menghilangkan semua
                                soal dalam paket.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => handleDelete(deleteConfirm)}
                                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppSidebarLayout>
    );
}
