import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Building2, Plus, Eye, Edit, Trash2, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Perguruan Tinggi',
        href: '/admin/perguruan-tinggi',
    },
];

interface PerguruanTinggi {
    id: number;
    nama: string;
    jenis: string;
    status: string;
    kota: string;
    provinsi: string;
    website: string;
    rating_average: number;
    total_evaluasi: number;
    program_studi_count: number;
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

export default function AdminPerguruanTinggiIndex({ perguruanTinggi, filters }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perguruan Tinggi - Admin" />
            <PageLayout>
                <PageHeader 
                    title="Perguruan Tinggi"
                    subtitle="Kelola data perguruan tinggi"
                >
                    <Link
                        href="/admin/perguruan-tinggi/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Perguruan Tinggi
                    </Link>
                </PageHeader>
                
                <PageContent>
                    <Card>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Nama</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Jenis</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Lokasi</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Program Studi</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-900">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {perguruanTinggi.data.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100">
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div>
                                                        <p className="font-medium">{item.nama}</p>
                                                        <p className="text-sm text-gray-600">{item.website}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-900">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.jenis === 'negeri' ? 'bg-blue-100 text-blue-800' :
                                                        item.jenis === 'swasta' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {item.jenis}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div>
                                                        <p className="font-medium">{item.kota}</p>
                                                        <p className="text-sm text-gray-600">{item.provinsi}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-900">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="font-semibold">
                                                            {item.rating_average ? parseFloat(item.rating_average).toFixed(1) : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">{item.total_evaluasi} evaluasi</p>
                                                </td>
                                                <td className="py-3 px-4 text-gray-900">
                                                    <span className="font-semibold">{item.program_studi_count}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                        item.status === 'aktif' ? 'bg-green-100 text-green-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/perguruan-tinggi/${item.id.toString()}`}
                                                            className="p-1 text-blue-600 hover:text-blue-800"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/admin/perguruan-tinggi/${item.id.toString()}/edit`}
                                                            className="p-1 text-green-600 hover:text-green-800"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            className="p-1 text-red-600 hover:text-red-800"
                                                            onClick={() => {
                                                                if (confirm('Apakah Anda yakin ingin menghapus perguruan tinggi ini?')) {
                                                                    // Handle delete
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {perguruanTinggi.data.length === 0 && (
                                <div className="text-center py-8">
                                    <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">Tidak ada perguruan tinggi ditemukan</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 