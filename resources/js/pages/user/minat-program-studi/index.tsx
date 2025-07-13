import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Heart, GraduationCap, Building2, Star, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Minat Program Studi',
        href: '/user/minat-program-studi',
    },
];

interface MinatProgramStudi {
    id: number;
    tingkat_minat: string;
    alasan_minat: string;
    waktu_tes: string;
    program_studi: {
        id: number;
        nama: string;
        kode: string;
        perguruan_tinggi: {
            id: number;
            nama: string;
            akronim: string;
        };
    };
}

interface Props {
    minatProgramStudi: {
        data: MinatProgramStudi[];
        links: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function UserMinatProgramStudiIndex({ minatProgramStudi }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Minat Program Studi" />
            <PageLayout>
                <PageHeader 
                    title="Minat Program Studi"
                    subtitle="Kelola minat program studi Anda"
                >
                    <Link
                        href="/minat-program-studi/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Heart className="w-4 h-4" />
                        Tambah Minat
                    </Link>
                </PageHeader>
                
                <PageContent>
                    <Card>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Program Studi</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Perguruan Tinggi</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Tingkat Minat</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Waktu Tes</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {minatProgramStudi.data.map((minat) => (
                                            <tr key={minat.id} className="border-b border-gray-100">
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div>
                                                        <p className="font-medium">{minat.program_studi.nama}</p>
                                                        <p className="text-sm text-gray-600">{minat.program_studi.kode}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="w-4 h-4 text-gray-400" />
                                                        <span>{minat.program_studi.perguruan_tinggi.nama}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                        minat.tingkat_minat === 'sangat_tinggi' ? 'bg-red-100 text-red-800' :
                                                        minat.tingkat_minat === 'tinggi' ? 'bg-orange-100 text-orange-800' :
                                                        minat.tingkat_minat === 'sedang' ? 'bg-yellow-100 text-yellow-800' :
                                                        minat.tingkat_minat === 'rendah' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        <Star className="w-3 h-3" />
                                                        {minat.tingkat_minat?.replace('_', ' ') || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-600 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(minat.waktu_tes).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/program-studi/${minat.program_studi.id.toString()}`}
                                                            className="p-1 text-blue-600 hover:text-blue-800"
                                                            title="Lihat Detail Program Studi"
                                                        >
                                                            <GraduationCap className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            className="p-1 text-red-600 hover:text-red-800"
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin menghapus minat ini?')) {
                                                                    // Handle delete
                                                                }
                                                            }}
                                                            title="Hapus Minat"
                                                        >
                                                            <Heart className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {minatProgramStudi.data.length === 0 && (
                                <div className="text-center py-8">
                                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500 mb-4">Anda belum memiliki minat program studi</p>
                                    <Link
                                        href="/minat-program-studi/create"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <Heart className="w-4 h-4" />
                                        Tambah Minat Pertama
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 