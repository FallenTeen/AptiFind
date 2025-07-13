import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building2, Search, Star, MapPin, GraduationCap } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Perguruan Tinggi',
        href: '/user/perguruan-tinggi',
    },
];

interface PerguruanTinggi {
    id: number;
    nama: string;
    akronim: string;
    jenis: string;
    kota: string;
    provinsi: string;
    website: string;
    rating_average: number;
    program_studi_count: number;
    evaluasi_search_engine_count: number;
}

interface Props {
    perguruanTinggi: {
        data: PerguruanTinggi[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: any;
}

export default function UserPerguruanTinggiIndex({ perguruanTinggi, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perguruan Tinggi" />
            <PageLayout>
                <PageHeader 
                    title="Perguruan Tinggi"
                    subtitle="Temukan perguruan tinggi terbaik untuk masa depan Anda"
                />
                
                <PageContent>
                    {/* Search and Filter Section */}
                    <Card className="mb-6">
                        <CardContent>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Cari perguruan tinggi..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            defaultValue={filters?.search}
                                        />
                                    </div>
                                </div>
                                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Semua Jenis</option>
                                    <option value="negeri">Negeri</option>
                                    <option value="swasta">Swasta</option>
                                </select>
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Cari
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Perguruan Tinggi Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {perguruanTinggi.data.map((pt) => (
                            <Card key={pt.id} className="hover:shadow-lg transition-shadow">
                                <CardContent>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {pt.nama}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">{pt.akronim}</p>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {pt.kota}, {pt.provinsi}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                pt.jenis === 'negeri' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {pt.jenis}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="font-semibold text-gray-900">
                                                    {pt.rating_average ? parseFloat(pt.rating_average).toFixed(1) : 'N/A'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <GraduationCap className="w-4 h-4" />
                                                <span>{pt.program_studi_count} Program Studi</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Link
                                                href={`/perguruan-tinggi/${pt.id.toString()}`}
                                                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Lihat Detail
                                            </Link>
                                            <Link
                                                href={`/perguruan-tinggi/${pt.id.toString()}/evaluate`}
                                                className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                Evaluasi Website
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {perguruanTinggi.data.length === 0 && (
                        <Card>
                            <CardContent>
                                <div className="text-center py-8">
                                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Tidak ada perguruan tinggi ditemukan</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 