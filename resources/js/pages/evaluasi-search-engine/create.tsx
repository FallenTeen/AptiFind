import { PageLayout, PageHeader, PageContent, Card, CardContent } from '@/components/page-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Building2 } from 'lucide-react';

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
        title: 'Buat Evaluasi',
        href: '/evaluasi-search-engine/create',
    },
];

interface Props {
    perguruanTinggi: any[];
}

export default function EvaluasiSearchEngineCreate({ perguruanTinggi }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Evaluasi Search Engine" />
            <PageLayout>
                <PageHeader 
                    title="Buat Evaluasi Search Engine"
                    subtitle="Evaluasi kualitas website perguruan tinggi"
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
                            <div className="text-center py-8">
                                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">Halaman evaluasi search engine sedang dalam pengembangan</p>
                                <p className="text-sm text-gray-400">
                                    Fitur ini akan memungkinkan Anda untuk mengevaluasi kualitas website perguruan tinggi
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </PageContent>
            </PageLayout>
        </AppLayout>
    );
} 