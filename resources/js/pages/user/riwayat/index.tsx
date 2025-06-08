import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Riwayat Tes', href: String(route('user.riwayat.index')) },
];

interface RiwayatItem {
  id: number;
  paket_nama: string;
  tanggal: string;
  skor_minat: number;
  skor_bakat: number;
  quadrant: string;
}

export default function RiwayatIndex({ riwayat }: { riwayat: RiwayatItem[] }) {
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-3xl py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Riwayat Tes Minat & Bakat</h1>
        <p className="text-gray-600 mb-6">Berikut adalah riwayat pengerjaan tes Anda beserta hasilnya.</p>
        {riwayat.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">Belum ada riwayat</h3>
            <p className="mb-6 text-gray-500">Silakan kerjakan paket soal terlebih dahulu.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {riwayat.map((r) => (
              <div key={r.id} className="rounded-xl border border-gray-100 bg-white shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{r.paket_nama}</div>
                  <div className="text-sm text-gray-500">{new Date(r.tanggal).toLocaleString('id-ID')}</div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-800 font-bold text-sm">Minat: {r.skor_minat}</div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-purple-800 font-bold text-sm">Bakat: {r.skor_bakat}</div>
                  <Link
                    href={String(route('user.riwayat.show', r.id))}
                    className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppSidebarLayout>
  );
}
