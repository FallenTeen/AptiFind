import { Head, Link } from '@inertiajs/react';
import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Building2, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    FileText,
    Edit,
    ArrowLeft,
    Users,
    GraduationCap,
    Star
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda Admin',
        href: '/dashboard',
    },
    {
        title: 'Perguruan Tinggi',
        href: '/admin/perguruan-tinggi',
    },
    {
        title: 'Detail',
        href: '#',
    },
];

interface PerguruanTinggi {
    id: number;
    nama: string;
    akronim: string;
    jenis: string;
    alamat: string;
    kota: string;
    provinsi: string;
    kode_pos: string;
    no_telp: string;
    email: string;
    website: string;
    deskripsi: string;
    status: string;
    created_at: string;
    updated_at: string;
    program_studi?: any[];
    evaluasi?: any[];
}

interface Props {
    perguruanTinggi: PerguruanTinggi;
}

export default function ShowPerguruanTinggi({ perguruanTinggi }: Props) {
    const getJenisLabel = (jenis: string) => {
        const labels: { [key: string]: string } = {
            'universitas': 'Universitas',
            'institut': 'Institut',
            'sekolah_tinggi': 'Sekolah Tinggi',
            'politeknik': 'Politeknik',
            'akademi': 'Akademi'
        };
        return labels[jenis] || jenis;
    };

    const getStatusBadge = (status: string) => {
        return status === 'aktif' ? (
            <Badge className="bg-green-100 text-green-800">Aktif</Badge>
        ) : (
            <Badge variant="secondary">Nonaktif</Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${perguruanTinggi.nama} - Detail - Admin`} />
            <PageLayout>
                <PageHeader 
                    title={perguruanTinggi.nama}
                    subtitle={`${perguruanTinggi.akronim} - ${getJenisLabel(perguruanTinggi.jenis)}`}
                />
                
                <PageContent>
                    {/* Header Actions */}
                    <div className="flex justify-between items-center mb-6">
                        <Button asChild variant="outline">
                            <Link href={route('admin.perguruan-tinggi.index')}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali ke Daftar
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('admin.perguruan-tinggi.edit', perguruanTinggi.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Info */}
                            <Card>
                                <CardContent>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <Building2 className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">
                                                    {perguruanTinggi.nama}
                                                </h3>
                                                <p className="text-gray-600">{perguruanTinggi.akronim}</p>
                                            </div>
                                        </div>
                                        {getStatusBadge(perguruanTinggi.status)}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Jenis</p>
                                            <p className="text-gray-900">{getJenisLabel(perguruanTinggi.jenis)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Status</p>
                                            <p className="text-gray-900">{perguruanTinggi.status === 'aktif' ? 'Aktif' : 'Nonaktif'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card>
                                <CardContent>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <Phone className="h-5 w-5" />
                                        Informasi Kontak
                                    </h3>
                                    <div className="space-y-3">
                                        {perguruanTinggi.email && (
                                            <div className="flex items-center space-x-3">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                                    <a href={`mailto:${perguruanTinggi.email}`} className="text-blue-600 hover:underline">
                                                        {perguruanTinggi.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {perguruanTinggi.no_telp && (
                                            <div className="flex items-center space-x-3">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Telepon</p>
                                                    <a href={`tel:${perguruanTinggi.no_telp}`} className="text-blue-600 hover:underline">
                                                        {perguruanTinggi.no_telp}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                        {perguruanTinggi.website && (
                                            <div className="flex items-center space-x-3">
                                                <Globe className="h-4 w-4 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Website</p>
                                                    <a href={perguruanTinggi.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        {perguruanTinggi.website}
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Address */}
                            <Card>
                                <CardContent>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5" />
                                        Alamat
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-900">{perguruanTinggi.alamat}</p>
                                        <p className="text-gray-600">
                                            {perguruanTinggi.kota}, {perguruanTinggi.provinsi} {perguruanTinggi.kode_pos}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Description */}
                            {perguruanTinggi.deskripsi && (
                                <Card>
                                    <CardContent>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            Deskripsi
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            {perguruanTinggi.deskripsi}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Statistics */}
                            <Card>
                                <CardContent>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistik</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <GraduationCap className="h-4 w-4 text-blue-600" />
                                                <span className="text-gray-600">Program Studi</span>
                                            </div>
                                            <span className="font-semibold">
                                                {perguruanTinggi.program_studi?.length || 0}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Star className="h-4 w-4 text-yellow-600" />
                                                <span className="text-gray-600">Evaluasi</span>
                                            </div>
                                            <span className="font-semibold">
                                                {perguruanTinggi.evaluasi?.length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Timestamps */}
                            <Card>
                                <CardContent>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Dibuat</p>
                                            <p className="text-gray-900">
                                                {new Date(perguruanTinggi.created_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Terakhir Diperbarui</p>
                                            <p className="text-gray-900">
                                                {new Date(perguruanTinggi.updated_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 