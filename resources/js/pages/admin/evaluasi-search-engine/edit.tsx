import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Search, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Evaluasi Search Engine',
        href: '/admin/evaluasi-search-engine',
    },
    {
        title: 'Edit Evaluasi',
        href: '/admin/evaluasi-search-engine/edit',
    },
];

interface Evaluasi {
    id: number;
    kemudahan_pencarian: number;
    kecepatan_loading: number;
    relevansi_hasil: number;
    kelengkapan_informasi: number;
    tampilan_visual: number;
    kemudahan_navigasi: number;
    komentar: string;
    saran_perbaikan: string;
    perguruan_tinggi: {
        id: number;
        nama: string;
        akronim: string;
    };
}

interface Props {
    evaluasi: Evaluasi;
}

export default function AdminEvaluasiSearchEngineEdit({ evaluasi }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Evaluasi Search Engine" />
            <PageLayout>
                <PageHeader 
                    title="Edit Evaluasi Search Engine"
                    subtitle="Perbarui data evaluasi website perguruan tinggi"
                >
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/evaluasi-search-engine"
                            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                        <button
                            type="submit"
                            form="evaluasi-form"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Simpan
                        </button>
                    </div>
                </PageHeader>
                
                <PageContent>
                    <Card>
                        <CardContent>
                            <form id="evaluasi-form" method="POST" className="space-y-6">
                                {/* Perguruan Tinggi Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                        <Search className="w-5 h-5" />
                                        Perguruan Tinggi
                                    </h3>
                                    <p className="font-medium">{evaluasi.perguruan_tinggi.nama}</p>
                                    <p className="text-sm text-gray-600">{evaluasi.perguruan_tinggi.akronim}</p>
                                </div>

                                {/* Criteria Scores */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        Skor Kriteria
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kemudahan Pencarian
                                            </label>
                                            <select 
                                                name="kemudahan_pencarian" 
                                                defaultValue={evaluasi.kemudahan_pencarian}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="1">1 - Sangat Buruk</option>
                                                <option value="2">2 - Buruk</option>
                                                <option value="3">3 - Sedang</option>
                                                <option value="4">4 - Baik</option>
                                                <option value="5">5 - Sangat Baik</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kecepatan Loading
                                            </label>
                                            <select 
                                                name="kecepatan_loading" 
                                                defaultValue={evaluasi.kecepatan_loading}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="1">1 - Sangat Lambat</option>
                                                <option value="2">2 - Lambat</option>
                                                <option value="3">3 - Sedang</option>
                                                <option value="4">4 - Cepat</option>
                                                <option value="5">5 - Sangat Cepat</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Relevansi Hasil
                                            </label>
                                            <select 
                                                name="relevansi_hasil" 
                                                defaultValue={evaluasi.relevansi_hasil}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="1">1 - Tidak Relevan</option>
                                                <option value="2">2 - Kurang Relevan</option>
                                                <option value="3">3 - Cukup Relevan</option>
                                                <option value="4">4 - Relevan</option>
                                                <option value="5">5 - Sangat Relevan</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kelengkapan Informasi
                                            </label>
                                            <select 
                                                name="kelengkapan_informasi" 
                                                defaultValue={evaluasi.kelengkapan_informasi}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="1">1 - Sangat Kurang</option>
                                                <option value="2">2 - Kurang</option>
                                                <option value="3">3 - Cukup</option>
                                                <option value="4">4 - Lengkap</option>
                                                <option value="5">5 - Sangat Lengkap</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tampilan Visual
                                            </label>
                                            <select 
                                                name="tampilan_visual" 
                                                defaultValue={evaluasi.tampilan_visual}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="1">1 - Sangat Buruk</option>
                                                <option value="2">2 - Buruk</option>
                                                <option value="3">3 - Sedang</option>
                                                <option value="4">4 - Baik</option>
                                                <option value="5">5 - Sangat Baik</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Kemudahan Navigasi
                                            </label>
                                            <select 
                                                name="kemudahan_navigasi" 
                                                defaultValue={evaluasi.kemudahan_navigasi}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="1">1 - Sangat Sulit</option>
                                                <option value="2">2 - Sulit</option>
                                                <option value="3">3 - Sedang</option>
                                                <option value="4">4 - Mudah</option>
                                                <option value="5">5 - Sangat Mudah</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Komentar & Saran</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Komentar
                                            </label>
                                            <textarea 
                                                name="komentar" 
                                                rows={4}
                                                defaultValue={evaluasi.komentar}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Berikan komentar tentang website perguruan tinggi ini..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Saran Perbaikan
                                            </label>
                                            <textarea 
                                                name="saran_perbaikan" 
                                                rows={4}
                                                defaultValue={evaluasi.saran_perbaikan}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Berikan saran perbaikan untuk website perguruan tinggi ini..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 