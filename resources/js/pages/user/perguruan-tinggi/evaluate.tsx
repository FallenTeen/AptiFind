import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface PerguruanTinggi {
  id: number;
  nama: string;
  akronim: string;
  jenis: string;
  alamat: string;
  kota: string;
  provinsi: string;
  deskripsi?: string;
}

interface Props {
  perguruanTinggi: PerguruanTinggi;
}

export default function PerguruanTinggiEvaluate({ perguruanTinggi }: Props) {
  const breadcrumbs = [
    { title: 'Dashboard', href: String(route('dashboard')) },
    { title: 'Perguruan Tinggi', href: String(route('user.perguruan-tinggi.index')) },
    { title: perguruanTinggi.nama, href: String(route('user.perguruan-tinggi.detail', perguruanTinggi.id)) },
    { title: 'Evaluasi', href: String(route('perguruan-tinggi.evaluate', perguruanTinggi.id)) },
  ];

  const { data, setData, post, processing, errors } = useForm({
    perguruan_tinggi_id: perguruanTinggi.id,
    rating_kualitas: 0,
    rating_akreditasi: 0,
    rating_fasilitas: 0,
    rating_dosen: 0,
    rating_biaya: 0,
    rating_lokasi: 0,
    kategori_kualitas: '',
    komentar: '',
    rekomendasi: false,
  });

  const [localErrors, setLocalErrors] = useState<{ [key: string]: string } | null>(null);

  const handleRatingChange = (field: string, value: number) => {
    setData(field as any, value);
  };

  const getRatingLabel = (rating: number): string => {
    if (rating >= 4.5) return 'Sangat Baik';
    if (rating >= 3.5) return 'Baik';
    if (rating >= 2.5) return 'Cukup';
    if (rating >= 1.5) return 'Kurang';
    return 'Sangat Kurang';
  };

  const getRatingColor = (rating: number): string => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 3.5) return 'text-blue-600';
    if (rating >= 2.5) return 'text-yellow-600';
    if (rating >= 1.5) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validasi
    const newErrors: { [key: string]: string } = {};
    
    if (data.rating_kualitas === 0) newErrors.rating_kualitas = 'Rating kualitas wajib diisi';
    if (data.rating_akreditasi === 0) newErrors.rating_akreditasi = 'Rating akreditasi wajib diisi';
    if (data.rating_fasilitas === 0) newErrors.rating_fasilitas = 'Rating fasilitas wajib diisi';
    if (data.rating_dosen === 0) newErrors.rating_dosen = 'Rating dosen wajib diisi';
    if (data.rating_biaya === 0) newErrors.rating_biaya = 'Rating biaya wajib diisi';
    if (data.rating_lokasi === 0) newErrors.rating_lokasi = 'Rating lokasi wajib diisi';
    if (!data.kategori_kualitas) newErrors.kategori_kualitas = 'Kategori kualitas wajib dipilih';
    if (!data.komentar.trim()) newErrors.komentar = 'Komentar wajib diisi';

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }

    setLocalErrors(null);
    post(String(route('evaluasi-search-engine.store')));
  };

  const RatingInput = ({ 
    label, 
    field, 
    value, 
    error 
  }: { 
    label: string; 
    field: string; 
    value: number; 
    error?: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(field, star)}
            className={`text-2xl transition-colors ${
              star <= value 
                ? 'text-yellow-400 hover:text-yellow-500' 
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            ★
          </button>
        ))}
        <span className={`ml-2 text-sm font-medium ${getRatingColor(value)}`}>
          {value > 0 ? `${value}/5 - ${getRatingLabel(value)}` : 'Belum dinilai'}
        </span>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );

  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Evaluasi Perguruan Tinggi</h1>
            <p className="text-blue-100 mt-2">
              Berikan penilaian Anda untuk {perguruanTinggi.nama} ({perguruanTinggi.akronim})
            </p>
          </div>

          <div className="p-6">
            {/* Informasi Perguruan Tinggi */}
            <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Perguruan Tinggi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nama</p>
                  <p className="font-medium text-gray-900">{perguruanTinggi.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Akronim</p>
                  <p className="font-medium text-gray-900">{perguruanTinggi.akronim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jenis</p>
                  <p className="font-medium text-gray-900 capitalize">{perguruanTinggi.jenis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kota</p>
                  <p className="font-medium text-gray-900">{perguruanTinggi.kota}, {perguruanTinggi.provinsi}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600">Alamat</p>
                  <p className="font-medium text-gray-900">{perguruanTinggi.alamat}</p>
                </div>
                {perguruanTinggi.deskripsi && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Deskripsi</p>
                    <p className="text-gray-900">{perguruanTinggi.deskripsi}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Evaluasi */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RatingInput
                  label="Kualitas Pendidikan"
                  field="rating_kualitas"
                  value={data.rating_kualitas}
                  error={localErrors?.rating_kualitas || errors.rating_kualitas}
                />
                <RatingInput
                  label="Akreditasi Program"
                  field="rating_akreditasi"
                  value={data.rating_akreditasi}
                  error={localErrors?.rating_akreditasi || errors.rating_akreditasi}
                />
                <RatingInput
                  label="Fasilitas Kampus"
                  field="rating_fasilitas"
                  value={data.rating_fasilitas}
                  error={localErrors?.rating_fasilitas || errors.rating_fasilitas}
                />
                <RatingInput
                  label="Kualitas Dosen"
                  field="rating_dosen"
                  value={data.rating_dosen}
                  error={localErrors?.rating_dosen || errors.rating_dosen}
                />
                <RatingInput
                  label="Kemampuan Finansial"
                  field="rating_biaya"
                  value={data.rating_biaya}
                  error={localErrors?.rating_biaya || errors.rating_biaya}
                />
                <RatingInput
                  label="Lokasi dan Aksesibilitas"
                  field="rating_lokasi"
                  value={data.rating_lokasi}
                  error={localErrors?.rating_lokasi || errors.rating_lokasi}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori Kualitas
                </label>
                <select
                  value={data.kategori_kualitas}
                  onChange={(e) => setData('kategori_kualitas', e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Pilih kategori</option>
                  <option value="sangat_baik">Sangat Baik</option>
                  <option value="baik">Baik</option>
                  <option value="cukup">Cukup</option>
                  <option value="kurang">Kurang</option>
                  <option value="sangat_kurang">Sangat Kurang</option>
                </select>
                {(localErrors?.kategori_kualitas || errors.kategori_kualitas) && (
                  <p className="text-sm text-red-600 mt-1">
                    {localErrors?.kategori_kualitas || errors.kategori_kualitas}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Komentar dan Saran
                </label>
                <textarea
                  value={data.komentar}
                  onChange={(e) => setData('komentar', e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Berikan komentar dan saran Anda tentang perguruan tinggi ini..."
                />
                {(localErrors?.komentar || errors.komentar) && (
                  <p className="text-sm text-red-600 mt-1">
                    {localErrors?.komentar || errors.komentar}
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rekomendasi"
                  checked={data.rekomendasi}
                  onChange={(e) => setData('rekomendasi', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rekomendasi" className="ml-2 block text-sm text-gray-900">
                  Saya merekomendasikan perguruan tinggi ini kepada orang lain
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Link
                  href={String(route('user.perguruan-tinggi.detail', perguruanTinggi.id))}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Menyimpan...' : 'Simpan Evaluasi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppSidebarLayout>
  );
} 