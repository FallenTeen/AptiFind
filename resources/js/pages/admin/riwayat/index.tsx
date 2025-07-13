import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs = [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Riwayat Pengisi', href: String(route('admin.riwayat.index')) },
];

interface RiwayatItem {
  id: number;
  user?: { name: string; perguruanTinggi?: { nama: string } };
  paket_soal?: { nama_paket: string };
  created_at?: string;
}

function sortRiwayat(data: RiwayatItem[], sortKey: string, asc: boolean) {
  return [...data].sort((a, b) => {
    let va = '';
    let vb = '';
    if (sortKey === 'nama') {
      va = a.user?.name || '';
      vb = b.user?.name || '';
    } else if (sortKey === 'universitas') {
      va = a.user?.perguruanTinggi?.nama || '';
      vb = b.user?.perguruanTinggi?.nama || '';
    } else if (sortKey === 'paket') {
      va = a.paket_soal?.nama_paket || '';
      vb = b.paket_soal?.nama_paket || '';
    } else if (sortKey === 'id') {
      va = a.id.toString();
      vb = b.id.toString();
    } else if (sortKey === 'tanggal') {
      va = a.created_at || '';
      vb = b.created_at || '';
    }
    return asc ? va.localeCompare(vb) : vb.localeCompare(va);
  });
}

export default function RiwayatIndex({ riwayat }: { riwayat: RiwayatItem[] }) {
  const [sortKey, setSortKey] = useState('id');
  const [asc, setAsc] = useState(false);
  const sorted = sortRiwayat(riwayat, sortKey, asc);
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Riwayat Pengisi Tes</h1>
          <p className="text-gray-600">Daftar seluruh riwayat pengisian tes minat & bakat oleh user.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 border cursor-pointer" onClick={() => { setSortKey('id'); setAsc(sortKey==='id'?!asc:true); }}>#</th>
                <th className="px-3 py-2 border cursor-pointer" onClick={() => { setSortKey('nama'); setAsc(sortKey==='nama'?!asc:true); }}>Nama</th>
                <th className="px-3 py-2 border cursor-pointer" onClick={() => { setSortKey('universitas'); setAsc(sortKey==='universitas'?!asc:true); }}>Universitas</th>
                <th className="px-3 py-2 border cursor-pointer" onClick={() => { setSortKey('paket'); setAsc(sortKey==='paket'?!asc:true); }}>Paket Soal</th>
                <th className="px-3 py-2 border cursor-pointer" onClick={() => { setSortKey('tanggal'); setAsc(sortKey==='tanggal'?!asc:true); }}>Tanggal</th>
                <th className="px-3 py-2 border"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Belum ada riwayat</td></tr>
              ) : (
                sorted.map((r, i) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2 border text-center">{r.id}</td>
                    <td className="px-3 py-2 border">{r.user?.name || '-'}</td>
                    <td className="px-3 py-2 border">{r.user?.perguruanTinggi?.nama || '-'}</td>
                    <td className="px-3 py-2 border">{r.paket_soal?.nama_paket || '-'}</td>
                    <td className="px-3 py-2 border">{r.created_at ? new Date(r.created_at).toLocaleString('id-ID') : '-'}</td>
                    <td className="px-3 py-2 border text-center">
                      <Link
                        href={String(route('admin.riwayat.show', r.id))}
                        className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
                      >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
