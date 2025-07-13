import AppLayout from '@/layouts/app-layout';
import { PageLayout, PageHeader, PageContent } from '@/components/page-layout';

export default function AdminResearchDashboard() {
  const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Research Dashboard', href: '/admin/penelitian/research-dashboard' },
  ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <PageLayout>
        <PageHeader 
          title="Research Dashboard"
          subtitle="Statistik dan analisis penelitian"
        />
        <PageContent>
          <div className="text-gray-500 text-center py-16">
            Halaman Research Dashboard (statistik penelitian) akan ditampilkan di sini.
          </div>
        </PageContent>
      </PageLayout>
    </AppLayout>
  );
} 