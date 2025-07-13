import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    Building2, 
    GraduationCap, 
    Search, 
    Heart, 
    TrendingUp,
    Star,
    CheckCircle,
    Clock,
    BookOpen
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: '/dashboard',
    },
];

interface ProgressMinatBakat {
    sudah_tes: boolean;
    waktu_tes: string;
    total_minat_program_studi: number;
    rekomendasi_program_studi: any[];
}

interface StatistikEvaluasi {
    total_evaluasi: number;
    waktu_evaluasi_terakhir: string;
    evaluasi_terbaru: any[];
}

interface Props {
    progressMinatBakat: ProgressMinatBakat;
    statistikEvaluasi: StatistikEvaluasi;
    rekomendasiPT: any[];
    programStudiPopuler: any[];
    hasilPenelitian: any[];
}

export default function UserDashboard({ 
    progressMinatBakat, 
    statistikEvaluasi, 
    rekomendasiPT, 
    programStudiPopuler, 
    hasilPenelitian 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Beranda - Minat Bakat App" />
            <PageLayout>
                <PageHeader 
                    title="Beranda"
                    subtitle="Selamat datang di sistem penilaian minat bakat dan penelitian perguruan tinggi"
                />
                
                <PageContent>
                    {/* Progress Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Status Tes Minat Bakat</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {progressMinatBakat.sudah_tes ? 'Sudah Selesai' : 'Belum Dikerjakan'}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${
                                        progressMinatBakat.sudah_tes ? 'bg-green-100' : 'bg-orange-100'
                                    }`}>
                                        {progressMinatBakat.sudah_tes ? (
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <Clock className="w-6 h-6 text-orange-600" />
                                        )}
                                    </div>
                                </div>
                                {progressMinatBakat.sudah_tes && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Selesai: {progressMinatBakat.waktu_tes}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Evaluasi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistikEvaluasi.total_evaluasi}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Search className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                                {statistikEvaluasi.waktu_evaluasi_terakhir && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Terakhir: {statistikEvaluasi.waktu_evaluasi_terakhir}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Minat Program Studi</p>
                                        <p className="text-2xl font-bold text-gray-900">{progressMinatBakat.total_minat_program_studi}</p>
                                    </div>
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <Heart className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Program studi yang diminati
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Rekomendasi</p>
                                        <p className="text-2xl font-bold text-gray-900">{progressMinatBakat.rekomendasi_program_studi.length}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Star className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Program studi direkomendasikan
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Rekomendasi Perguruan Tinggi */}
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Building2 className="w-5 h-5" />
                                    Rekomendasi Perguruan Tinggi
                                </h3>
                                <div className="space-y-3">
                                    {rekomendasiPT.slice(0, 6).map((pt, index) => (
                                        <div key={pt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-gray-900">{pt.nama}</p>
                                                    <p className="text-sm text-gray-600">{pt.kota}, {pt.provinsi}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="font-semibold text-gray-900">
                                                        {pt.rating_average ? parseFloat(pt.rating_average).toFixed(1) : 'N/A'}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-500">{pt.total_evaluasi} evaluasi</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Program Studi Populer */}
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    Program Studi Populer
                                </h3>
                                <div className="space-y-3">
                                    {programStudiPopuler.slice(0, 6).map((prodi, index) => (
                                        <div key={prodi.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-xs font-medium text-green-600">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-gray-900">{prodi.nama}</p>
                                                    <p className="text-sm text-gray-600">{prodi.perguruan_tinggi?.nama}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-semibold text-gray-900">{prodi.total_minat}</span>
                                                <p className="text-xs text-gray-500">minat</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Evaluations */}
                    {statistikEvaluasi.evaluasi_terbaru.length > 0 && (
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Evaluasi Terbaru
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-medium text-gray-900">Perguruan Tinggi</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-900">Skor</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-900">Waktu</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {statistikEvaluasi.evaluasi_terbaru.map((evaluasi) => (
                                                <tr key={evaluasi.id} className="border-b border-gray-100">
                                                    <td className="py-3 px-4 text-gray-900">{evaluasi.perguruan_tinggi?.nama || 'N/A'}</td>
                                                    <td className="py-3 px-4 text-gray-900">{evaluasi.skor_total || 'N/A'}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            evaluasi.kategori_kualitas === 'sangat_baik' ? 'bg-green-100 text-green-800' :
                                                            evaluasi.kategori_kualitas === 'baik' ? 'bg-blue-100 text-blue-800' :
                                                            evaluasi.kategori_kualitas === 'sedang' ? 'bg-yellow-100 text-yellow-800' :
                                                            evaluasi.kategori_kualitas === 'kurang' ? 'bg-orange-100 text-orange-800' :
                                                            'bg-red-100 text-red-800'
                                                        }`}>
                                                            {evaluasi.kategori_kualitas?.replace('_', ' ') || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-gray-600 text-sm">
                                                        {evaluasi.waktu_evaluasi ? new Date(evaluasi.waktu_evaluasi).toLocaleDateString('id-ID') : 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Hasil Penelitian */}
                    {hasilPenelitian.length > 0 && (
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    Hasil Penelitian Terbaru
                                </h3>
                                <div className="space-y-4">
                                    {hasilPenelitian.slice(0, 3).map((penelitian) => (
                                        <div key={penelitian.id} className="p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold text-gray-900 mb-2">{penelitian.judul}</h4>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{penelitian.ringkasan}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>Peneliti: {penelitian.peneliti}</span>
                                                <span>{penelitian.tahun_penelitian}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 