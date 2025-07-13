import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Search, Star, Calendar, User, Building2 } from 'lucide-react';

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
        title: 'Detail Evaluasi',
        href: '/admin/evaluasi-search-engine/show',
    },
];

interface Evaluasi {
    id: number;
    user: {
        name: string;
        email: string;
    };
    perguruan_tinggi: {
        id: number;
        nama: string;
        akronim: string;
        website: string;
    };
    kemudahan_pencarian: number;
    kecepatan_loading: number;
    relevansi_hasil: number;
    kelengkapan_informasi: number;
    tampilan_visual: number;
    kemudahan_navigasi: number;
    skor_total: number;
    kategori_kualitas: string;
    komentar: string;
    saran_perbaikan: string;
    browser_used: string;
    device_type: string;
    waktu_evaluasi: string;
}

interface Props {
    evaluasi: Evaluasi;
}

export default function AdminEvaluasiSearchEngineShow({ evaluasi }: Props) {
    const criteria = [
        { name: 'Kemudahan Pencarian', score: evaluasi.kemudahan_pencarian },
        { name: 'Kecepatan Loading', score: evaluasi.kecepatan_loading },
        { name: 'Relevansi Hasil', score: evaluasi.relevansi_hasil },
        { name: 'Kelengkapan Informasi', score: evaluasi.kelengkapan_informasi },
        { name: 'Tampilan Visual', score: evaluasi.tampilan_visual },
        { name: 'Kemudahan Navigasi', score: evaluasi.kemudahan_navigasi },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Evaluasi Search Engine" />
            <PageLayout>
                <PageHeader 
                    title="Detail Evaluasi Search Engine"
                    subtitle="Informasi lengkap evaluasi website perguruan tinggi"
                >
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin/evaluasi-search-engine"
                            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                        </Link>
                        <Link
                            href={`/admin/evaluasi-search-engine/${evaluasi.id.toString()}/edit`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Edit className="w-4 h-4" />
                            Edit
                        </Link>
                    </div>
                </PageHeader>
                
                <PageContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Evaluasi Info */}
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Search className="w-5 h-5" />
                                    Informasi Evaluasi
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">ID Evaluasi</span>
                                        <span className="font-semibold">#{evaluasi.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Skor Total</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="font-semibold">{evaluasi.skor_total}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Kategori Kualitas</span>
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                            evaluasi.kategori_kualitas === 'sangat_baik' ? 'bg-green-100 text-green-800' :
                                            evaluasi.kategori_kualitas === 'baik' ? 'bg-blue-100 text-blue-800' :
                                            evaluasi.kategori_kualitas === 'sedang' ? 'bg-yellow-100 text-yellow-800' :
                                            evaluasi.kategori_kualitas === 'kurang' ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {evaluasi.kategori_kualitas?.replace('_', ' ') || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Waktu Evaluasi</span>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(evaluasi.waktu_evaluasi).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Browser</span>
                                        <span className="text-sm">{evaluasi.browser_used || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Device Type</span>
                                        <span className="text-sm">{evaluasi.device_type || 'N/A'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User & PT Info */}
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Informasi User & PT
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Evaluator</h4>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium">{evaluasi.user.name}</p>
                                            <p className="text-sm text-gray-600">{evaluasi.user.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                            <Building2 className="w-4 h-4" />
                                            Perguruan Tinggi
                                        </h4>
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <p className="font-medium">{evaluasi.perguruan_tinggi.nama}</p>
                                            <p className="text-sm text-gray-600">{evaluasi.perguruan_tinggi.akronim}</p>
                                            <p className="text-xs text-blue-600">{evaluasi.perguruan_tinggi.website}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Criteria Scores */}
                    <Card className="mt-6">
                        <CardContent>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skor Kriteria</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {criteria.map((criterion, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-gray-900">{criterion.name}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="font-semibold">{criterion.score}</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(criterion.score / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Comments */}
                    {(evaluasi.komentar || evaluasi.saran_perbaikan) && (
                        <Card className="mt-6">
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Komentar & Saran</h3>
                                <div className="space-y-4">
                                    {evaluasi.komentar && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Komentar</h4>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-700">{evaluasi.komentar}</p>
                                            </div>
                                        </div>
                                    )}
                                    {evaluasi.saran_perbaikan && (
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-2">Saran Perbaikan</h4>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-700">{evaluasi.saran_perbaikan}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 