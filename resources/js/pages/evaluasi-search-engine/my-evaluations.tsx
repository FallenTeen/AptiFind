import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Search, Star, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Evaluasi Search Engine',
        href: '/evaluasi-search-engine',
    },
    {
        title: 'Evaluasi Saya',
        href: '/evaluasi-search-engine/my-evaluations',
    },
];

interface Evaluasi {
    id: number;
    perguruan_tinggi: {
        nama: string;
        kota: string;
        website: string;
    };
    skor_total: number;
    kategori_kualitas: string;
    waktu_evaluasi: string;
}

interface Props {
    evaluasi: {
        data: Evaluasi[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function EvaluasiSearchEngineMyEvaluations({ evaluasi }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Evaluasi Saya" />
            <PageLayout>
                <PageHeader 
                    title="Evaluasi Saya"
                    subtitle="Riwayat evaluasi search engine yang telah Anda lakukan"
                >
                    <Link
                        href="/evaluasi-search-engine"
                        className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                </PageHeader>
                
                <PageContent>
                    <Card>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Perguruan Tinggi</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Skor</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Waktu Evaluasi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evaluasi.data.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100">
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div>
                                                        <p className="font-medium">{item.perguruan_tinggi.nama}</p>
                                                        <p className="text-sm text-gray-600">{item.perguruan_tinggi.kota}</p>
                                                        <p className="text-xs text-blue-600">{item.perguruan_tinggi.website}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="font-semibold">{item.skor_total}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.kategori_kualitas === 'sangat_baik' ? 'bg-green-100 text-green-800' :
                                                        item.kategori_kualitas === 'baik' ? 'bg-blue-100 text-blue-800' :
                                                        item.kategori_kualitas === 'sedang' ? 'bg-yellow-100 text-yellow-800' :
                                                        item.kategori_kualitas === 'kurang' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.kategori_kualitas?.replace('_', ' ') || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-600 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(item.waktu_evaluasi).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {evaluasi.data.length === 0 && (
                                <div className="text-center py-8">
                                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Anda belum melakukan evaluasi search engine</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 