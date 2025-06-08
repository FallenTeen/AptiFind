import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Soal {
  id: number;
  text_soal: string;
  bobot_minat: number;
  bobot_bakat: number;
}

interface PaketSoal {
  id: number;
  nama_paket: string;
  jumlah_soal: number;
  balance_minat: number;
  balance_bakat: number;
  detail_paket_soal: { soal: Soal }[];
}

export default function PaketSoalShow({ paketSoal }: { paketSoal: PaketSoal }) {
  const breadcrumbs = [
    { title: 'Dashboard', href: String(route('dashboard')) },
    { title: 'Paket Soal', href: String(route('admin.paket-soal.index')) },
    { title: `Detail Paket #${paketSoal.id}`, href: String(route('admin.paket-soal.show', paketSoal.id)) },
  ];

  const getBobotLabel = (value: number): string => {
    switch (value) {
      case -1: return 'Sangat Tidak Setuju';
      case 0: return 'Netral';
      case 1: return 'Sangat Setuju';
      default: return '';
    }
  };

  const getBobotColor = (value: number): string => {
    switch (value) {
      case 1: return 'bg-green-100 text-green-800 border-green-200';
      case 0: return 'bg-gray-100 text-gray-800 border-gray-200';
      case -1: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Detail Paket Soal</h1>
            <p className="text-emerald-100 mt-2">Informasi lengkap tentang paket soal dan daftar soalnya</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-gray-500 text-sm mb-1">Nama Paket</div>
                <div className="text-xl font-semibold text-gray-900">{paketSoal.nama_paket}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Jumlah Soal</div>
                <div className="text-xl font-semibold text-gray-900">{paketSoal.jumlah_soal}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Balance Minat</div>
                <div className="text-xl font-semibold text-green-700">{paketSoal.balance_minat}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-1">Balance Bakat</div>
                <div className="text-xl font-semibold text-purple-700">{paketSoal.balance_bakat}</div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2">Daftar Soal</h2>
              <div className="divide-y divide-gray-200 rounded-lg border border-gray-100 bg-gray-50">
                {paketSoal.detail_paket_soal.map((d, i) => (
                  <div key={d.soal.id} className="p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{i + 1}. {d.soal.text_soal}</div>
                    </div>
                    <div className="flex gap-2">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium border ${getBobotColor(d.soal.bobot_minat)}`}>
                        Minat: {d.soal.bobot_minat} ({getBobotLabel(d.soal.bobot_minat)})
                      </span>
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium border ${getBobotColor(d.soal.bobot_bakat)}`}>
                        Bakat: {d.soal.bobot_bakat} ({getBobotLabel(d.soal.bobot_bakat)})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Link
                href={String(route('admin.paket-soal.index'))}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
