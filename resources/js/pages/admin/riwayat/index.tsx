import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Riwayat Pengisi', href: String(route('admin.riwayat.index')) },
];

interface RiwayatItem {
  id: number;
  user?: { name: string };
  paket_soal?: { nama_paket: string };
}

export default function RiwayatIndex({ riwayat }: { riwayat: RiwayatItem[] }) {
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Riwayat Pengisi Tes</h1>
          <p className="text-gray-600">Daftar seluruh riwayat pengisian tes minat & bakat oleh user.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riwayat.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-lg col-span-2">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">Belum ada riwayat</h3>
              <p className="mb-6 text-gray-500">Belum ada user yang mengisi tes.</p>
            </div>
          ) : (
            riwayat.map((r) => (
              <div key={r.id} className="rounded-xl border border-gray-100 bg-white shadow-lg p-6 flex flex-col gap-2 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">ID #{r.id}</span>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">{r.user?.name || '-'}</span>
                </div>
                <div className="font-semibold text-gray-900 text-lg mb-1">{r.paket_soal?.nama_paket || '-'}</div>
                <div className="flex gap-2 text-sm text-gray-600 mb-2">
                  <span>Paket: {r.paket_soal?.nama_paket || '-'}</span>
                </div>
                <div className="flex justify-end">
                  <Link
                    href={String(route('admin.riwayat.show', r.id))}
                    className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Detail
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppSidebarLayout>
  );
}
