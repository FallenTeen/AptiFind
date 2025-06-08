import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { useForm, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import { useState, FormEvent } from 'react';

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

interface Props {
  paketSoal: PaketSoal;
  soal: Soal[];
  selectedSoalIds: number[];
}

const breadcrumbs = (paketSoal: PaketSoal) => [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Paket Soal', href: String(route('admin.paket-soal.index')) },
  { title: 'Edit Paket Soal', href: String(route('admin.paket-soal.edit', paketSoal.id)) },
];

export default function PaketSoalEdit({ paketSoal, soal, selectedSoalIds }: Props) {
  const { data, setData, put, errors, processing } = useForm({
    nama_paket: paketSoal.nama_paket,
    soal_ids: selectedSoalIds,
  });
  const [localErrors, setLocalErrors] = useState<{ nama_paket?: string; soal_ids?: string } | null>(null);

  const selectedSoal = soal.filter((s) => data.soal_ids.includes(s.id));
  const totalMinat = selectedSoal.reduce((sum, s) => sum + s.bobot_minat, 0);
  const totalBakat = selectedSoal.reduce((sum, s) => sum + s.bobot_bakat, 0);
  const isBalanced = totalMinat === totalBakat;
  const balanceDiff = Math.abs(totalMinat - totalBakat);

  const handleSoalToggle = (soalId: number) => {
    if (data.soal_ids.includes(soalId)) {
      setData('soal_ids', data.soal_ids.filter((id) => id !== soalId));
    } else {
      setData('soal_ids', [...data.soal_ids, soalId]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!data.nama_paket.trim()) {
      setLocalErrors({ nama_paket: 'Nama paket wajib diisi' });
      return;
    }
    if (data.soal_ids.length === 0) {
      setLocalErrors({ soal_ids: 'Pilih minimal satu soal' });
      return;
    }
    setLocalErrors(null);
    put(String(route('admin.paket-soal.update', paketSoal.id)));
  };

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
    <AppSidebarLayout breadcrumbs={breadcrumbs(paketSoal)}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Edit Paket Soal</h1>
            <p className="text-emerald-100 mt-2">Ubah nama dan soal pada paket soal ini</p>
          </div>
          <div className="p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Paket Soal</label>
                <input
                  type="text"
                  value={data.nama_paket}
                  onChange={(e) => setData('nama_paket', e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                {(localErrors?.nama_paket || errors.nama_paket) && (
                  <p className="mt-1 text-sm text-red-600">{localErrors?.nama_paket || errors.nama_paket}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Soal</label>
                <div className="max-h-64 overflow-y-auto border rounded-lg divide-y divide-gray-100">
                  {soal.map((s) => (
                    <div key={s.id} className="flex items-center gap-3 p-3">
                      <input
                        type="checkbox"
                        checked={data.soal_ids.includes(s.id)}
                        onChange={() => handleSoalToggle(s.id)}
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
                      />
                      <span className="flex-1 text-gray-900">{s.text_soal}</span>
                      <span className={`px-2 py-1 rounded text-xs border ${getBobotColor(s.bobot_minat)}`}>M: {s.bobot_minat}</span>
                      <span className={`px-2 py-1 rounded text-xs border ${getBobotColor(s.bobot_bakat)}`}>B: {s.bobot_bakat}</span>
                    </div>
                  ))}
                </div>
                {(localErrors?.soal_ids || errors.soal_ids) && (
                  <p className="mt-1 text-sm text-red-600">{localErrors?.soal_ids || errors.soal_ids}</p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-green-800 text-sm">Total Bobot Minat: <span className="font-bold">{totalMinat}</span></div>
                </div>
                <div className="flex-1 bg-purple-50 border border-purple-200 rounded-lg p-3">
                  <div className="text-purple-800 text-sm">Total Bobot Bakat: <span className="font-bold">{totalBakat}</span></div>
                </div>
              </div>
              <div>
                {isBalanced ? (
                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 font-medium">Paket soal seimbang!</div>
                ) : (
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 font-medium">Paket soal belum seimbang (selisih: {balanceDiff})</div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Link
                  href={String(route('admin.paket-soal.index'))}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
