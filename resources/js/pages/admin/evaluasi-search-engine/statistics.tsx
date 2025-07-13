import { Head } from '@inertiajs/react';
import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { 
    BarChart3, 
    TrendingUp, 
    Star, 
    Building2, 
    Users,
    Calendar,
    PieChart
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda Admin',
        href: '/dashboard',
    },
    {
        title: 'Evaluasi Search Engine',
        href: '/admin/evaluasi-search-engine',
    },
    {
        title: 'Statistik',
        href: '/admin/evaluasi-search-engine/statistics',
    },
];

interface StatistikEvaluasi {
    total_evaluasi: number;
    rata_rata_skor: number;
    total_perguruan_tinggi: number;
    total_user: number;
    evaluasi_bulan_ini: number;
    evaluasi_bulan_lalu: number;
    pertumbuhan: number;
}

interface KategoriEvaluasi {
    kategori: string;
    total: number;
    persentase: number;
}

interface TopPerguruanTinggi {
    id: number;
    nama: string;
    total_evaluasi: number;
    rata_rata_skor: number;
}

interface EvaluasiBulanan {
    bulan: string;
    total: number;
}

interface Props {
    statistik: StatistikEvaluasi;
    kategoriEvaluasi: KategoriEvaluasi[];
    topPerguruanTinggi: TopPerguruanTinggi[];
    evaluasiBulanan: EvaluasiBulanan[];
}

export default function EvaluasiSearchEngineStatistics({ 
    statistik, 
    kategoriEvaluasi, 
    topPerguruanTinggi, 
    evaluasiBulanan 
}: Props) {
    const getKategoriLabel = (kategori: string) => {
        const labels: { [key: string]: string } = {
            'sangat_baik': 'Sangat Baik',
            'baik': 'Baik',
            'sedang': 'Sedang',
            'kurang': 'Kurang',
            'sangat_kurang': 'Sangat Kurang'
        };
        return labels[kategori] || kategori;
    };

    const getKategoriColor = (kategori: string) => {
        const colors: { [key: string]: string } = {
            'sangat_baik': 'bg-green-100 text-green-800',
            'baik': 'bg-blue-100 text-blue-800',
            'sedang': 'bg-yellow-100 text-yellow-800',
            'kurang': 'bg-orange-100 text-orange-800',
            'sangat_kurang': 'bg-red-100 text-red-800'
        };
        return colors[kategori] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Statistik Evaluasi Search Engine - Admin" />
            <PageLayout>
                <PageHeader 
                    title="Statistik Evaluasi Search Engine"
                    subtitle="Analisis data evaluasi website perguruan tinggi"
                />
                
                <PageContent>
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Evaluasi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_evaluasi}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <BarChart3 className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Rata-rata Skor</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {statistik.rata_rata_skor ? statistik.rata_rata_skor.toFixed(1) : 'N/A'}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <Star className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Perguruan Tinggi</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_perguruan_tinggi}</p>
                                    </div>
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Building2 className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Pengguna Aktif</p>
                                        <p className="text-2xl font-bold text-gray-900">{statistik.total_user}</p>
                                    </div>
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <Users className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Growth Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Evaluasi Bulan Ini</p>
                                        <p className="text-xl font-bold text-gray-900">{statistik.evaluasi_bulan_ini}</p>
                                    </div>
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Evaluasi Bulan Lalu</p>
                                        <p className="text-xl font-bold text-gray-900">{statistik.evaluasi_bulan_lalu}</p>
                                    </div>
                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <Calendar className="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Pertumbuhan</p>
                                        <p className={`text-xl font-bold ${
                                            statistik.pertumbuhan >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {statistik.pertumbuhan >= 0 ? '+' : ''}{statistik.pertumbuhan}%
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-lg ${
                                        statistik.pertumbuhan >= 0 ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                        <TrendingUp className={`w-6 h-6 ${
                                            statistik.pertumbuhan >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Kategori Evaluasi */}
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <PieChart className="w-5 h-5" />
                                    Distribusi Kategori Evaluasi
                                </h3>
                                <div className="space-y-3">
                                    {kategoriEvaluasi.map((kategori) => (
                                        <div key={kategori.kategori} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(kategori.kategori)}`}>
                                                    {getKategoriLabel(kategori.kategori)}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-semibold text-gray-900">{kategori.total}</span>
                                                <span className="text-sm text-gray-500 ml-1">({kategori.persentase}%)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Top Perguruan Tinggi */}
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    Perguruan Tinggi Terbaik
                                </h3>
                                <div className="space-y-3">
                                    {topPerguruanTinggi.slice(0, 5).map((pt, index) => (
                                        <div key={pt.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-gray-900">{pt.nama}</p>
                                                    <p className="text-sm text-gray-600">{pt.total_evaluasi} evaluasi</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="font-semibold text-gray-900">
                                                        {pt.rata_rata_skor ? pt.rata_rata_skor.toFixed(1) : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Evaluasi Bulanan */}
                    {evaluasiBulanan.length > 0 && (
                        <Card>
                            <CardContent>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    Trend Evaluasi Bulanan
                                </h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 font-medium text-gray-900">Bulan</th>
                                                <th className="text-left py-3 px-4 font-medium text-gray-900">Total Evaluasi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {evaluasiBulanan.map((item, index) => (
                                                <tr key={index} className="border-b border-gray-100">
                                                    <td className="py-3 px-4 text-gray-900">{item.bulan}</td>
                                                    <td className="py-3 px-4 text-gray-900">{item.total}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 