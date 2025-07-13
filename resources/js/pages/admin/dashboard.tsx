import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    Building2, 
    GraduationCap, 
    Users, 
    Search, 
    Heart, 
    Database,
    TrendingUp,
    Star,
    BarChart3
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda Admin',
        href: '/dashboard',
    },
];

interface Statistik {
    total_perguruan_tinggi: number;
    total_program_studi: number;
    total_user: number;
    total_evaluasi: number;
    total_minat_program_studi: number;
    total_hasil_penelitian: number;
}

interface UserStats {
    calon_mahasiswa: number;
    mahasiswa_aktif: number;
    sudah_tes_minat_bakat: number;
    belum_tes_minat_bakat: number;
}

interface Props {
    statistik: Statistik;
    userStats: UserStats;
    topPerguruanTinggi: any[];
    evaluasiTerbaru: any[];
    kategoriEvaluasi: any[];
    trendEvaluasi: any[];
}

export default function AdminDashboard({ 
    statistik, 
    userStats, 
    topPerguruanTinggi, 
    evaluasiTerbaru, 
    kategoriEvaluasi, 
    trendEvaluasi 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Beranda Admin - Minat Bakat App" />
            <PageLayout>
                <PageHeader 
                    title="Beranda Admin"
                    subtitle="Selamat datang di panel administrasi sistem penilaian minat bakat dan penelitian"
                />
                
                <PageContent>
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Perguruan Tinggi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_perguruan_tinggi}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Program Studi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_program_studi}</p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <GraduationCap className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_user}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Evaluasi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_evaluasi}</p>
                                    </div>
                                    <div className="p-3 bg-yellow-100 rounded-lg">
                                        <Search className="w-6 h-6 text-yellow-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Minat Program Studi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_minat_program_studi}</p>
                                    </div>
                                    <div className="p-3 bg-red-100 rounded-lg">
                                        <Heart className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Hasil Penelitian</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_hasil_penelitian}</p>
                                    </div>
                                    <div className="p-3 bg-indigo-100 rounded-lg">
                                        <Database className="w-6 h-6 text-indigo-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Statistics */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    Statistik Pengguna
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Calon Mahasiswa</span>
                                        <span className="font-semibold">{userStats.calon_mahasiswa}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Mahasiswa Aktif</span>
                                        <span className="font-semibold">{userStats.mahasiswa_aktif}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Sudah Tes Minat Bakat</span>
                                        <span className="font-semibold text-green-600">{userStats.sudah_tes_minat_bakat}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Belum Tes Minat Bakat</span>
                                        <span className="font-semibold text-orange-600">{userStats.belum_tes_minat_bakat}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    Perguruan Tinggi Terbaik
                                </h3>
                                <div className="space-y-3">
                                    {topPerguruanTinggi.slice(0, 5).map((pt, index) => (
                                        <div key={pt.id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium">
                                                    {index + 1}
                                                </span>
                                                <span className="text-gray-900">{pt.nama}</span>
                                            </div>
                                            <span className="font-semibold text-blue-600">
                                                {pt.rating_average ? parseFloat(pt.rating_average).toFixed(1) : 'N/A'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Evaluations */}
                    {evaluasiTerbaru.length > 0 && (
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
                                            {evaluasiTerbaru.map((evaluasi) => (
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

                    {/* Kategori Evaluasi */}
                    {kategoriEvaluasi.length > 0 && (
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5" />
                                    Distribusi Kategori Evaluasi
                                </h3>
                                <div className="space-y-3">
                                    {kategoriEvaluasi.map((kategori) => (
                                        <div key={kategori.kategori} className="flex justify-between items-center">
                                            <span className="text-gray-600 capitalize">{kategori.kategori.replace('_', ' ')}</span>
                                            <span className="font-semibold">{kategori.total}</span>
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