import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Search, Heart, Building2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Program Studi',
        href: '/user/program-studi',
    },
];

interface ProgramStudi {
    id: number;
    nama: string;
    kode: string;
    jenis: string;
    jenjang: string;
    akreditasi: string;
    total_minat: number;
    minat_program_studi_count: number;
    perguruan_tinggi: {
        id: number;
        nama: string;
        akronim: string;
        kota: string;
    };
}

interface Props {
    programStudi: {
        data: ProgramStudi[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: any;
}

export default function UserProgramStudiIndex({ programStudi, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Program Studi" />
            <PageLayout>
                <PageHeader 
                    title="Program Studi"
                    subtitle="Temukan program studi yang sesuai dengan minat dan bakat Anda"
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
                                            placeholder="Cari program studi..."
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            defaultValue={filters?.search}
                                        />
                                    </div>
                                </div>
                                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Semua Jenis</option>
                                    <option value="akademik">Akademik</option>
                                    <option value="vokasi">Vokasi</option>
                                    <option value="profesi">Profesi</option>
                                </select>
                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Cari
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Program Studi Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programStudi.data.map((prodi) => (
                            <Card key={prodi.id} className="hover:shadow-lg transition-shadow">
                                <CardContent>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {prodi.nama}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">{prodi.kode}</p>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Building2 className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {prodi.perguruan_tinggi.nama}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                    prodi.jenis === 'akademik' ? 'bg-blue-100 text-blue-800' :
                                                    prodi.jenis === 'vokasi' ? 'bg-green-100 text-green-800' :
                                                    'bg-purple-100 text-purple-800'
                                                }`}>
                                                    {prodi.jenis}
                                                </span>
                                                <p className="text-xs text-gray-500 mt-1">{prodi.jenjang}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Heart className="w-4 h-4" />
                                                <span>{prodi.total_minat} Minat</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Users className="w-4 h-4" />
                                                <span>{prodi.minat_program_studi_count} User</span>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                prodi.akreditasi === 'A' ? 'bg-green-100 text-green-800' :
                                                prodi.akreditasi === 'B' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                Akreditasi {prodi.akreditasi}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <Link
                                                href={`/program-studi/${prodi.id.toString()}`}
                                                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Lihat Detail
                                            </Link>
                                            <Link
                                                href={`/minat-program-studi/create?program_studi_id=${prodi.id.toString()}`}
                                                className="block w-full text-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                                            >
                                                Tambah Minat
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {programStudi.data.length === 0 && (
                        <Card>
                            <CardContent>
                                <div className="text-center py-8">
                                    <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Tidak ada program studi ditemukan</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 