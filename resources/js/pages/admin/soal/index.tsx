import { Link, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import AppLayout from '@/layouts/app-layout';
import { PageLayout, PageHeader, PageContent, Card, CardHeader, CardContent } from '@/components/page-layout';
import { useState } from 'react';

interface Soal {
  id: number;
  text_soal: string;
  bobot_minat: number;
  bobot_bakat: number;
}

interface Props {
  soal: Soal[];
}

export default function SoalIndex({ soal }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinat, setFilterMinat] = useState<number | null>(null);
  const [filterBakat, setFilterBakat] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const breadcrumbs = [
    { title: 'Dashboard', href: String(route('dashboard')) },
    { title: 'Soal', href: String(route('admin.soal.index')) },
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

  const filteredSoal = soal.filter(s => {
    const matchesSearch = s.text_soal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMinat = filterMinat === null || s.bobot_minat === filterMinat;
    const matchesBakat = filterBakat === null || s.bobot_bakat === filterBakat;
    return matchesSearch && matchesMinat && matchesBakat;
  });

  const handleDelete = (id: number) => {
    router.delete(String(route('admin.soal.destroy', id)), {
      onSuccess: () => setDeleteConfirm(null),
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterMinat(null);
    setFilterBakat(null);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <PageLayout>
        <PageHeader 
          title="Daftar Soal"
          subtitle={`Kelola soal untuk sistem penilaian minat dan bakat (${soal.length} soal)`}
        >
          <Link
            href={String(route('admin.soal.create'))}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Soal
          </Link>
        </PageHeader>

        <PageContent>
          {/* Filters */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Filter dan Pencarian</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari soal..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Filter Minat */}
                <div>
                  <select
                    value={filterMinat ?? ''}
                    onChange={(e) => setFilterMinat(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Semua Minat</option>
                    <option value="1">Sangat Setuju (1)</option>
                    <option value="0">Netral (0)</option>
                    <option value="-1">Sangat Tidak Setuju (-1)</option>
                  </select>
                </div>

                {/* Filter Bakat */}
                <div>
                  <select
                    value={filterBakat ?? ''}
                    onChange={(e) => setFilterBakat(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Semua Bakat</option>
                    <option value="1">Sangat Setuju (1)</option>
                    <option value="0">Netral (0)</option>
                    <option value="-1">Sangat Tidak Setuju (-1)</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(searchTerm || filterMinat !== null || filterBakat !== null) && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm text-gray-600">Filter aktif:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Pencarian: "{searchTerm}"
                    </span>
                  )}
                  {filterMinat !== null && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Minat: {filterMinat}
                    </span>
                  )}
                  {filterBakat !== null && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Bakat: {filterBakat}
                    </span>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Hapus semua filter
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Info */}
          <div className="text-sm text-gray-600">
            Menampilkan {filteredSoal.length} dari {soal.length} soal
          </div>

          {/* Soal List */}
          <div className="space-y-4">
            {filteredSoal.length === 0 ? (
              <Card>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {soal.length === 0 ? 'Belum ada soal' : 'Tidak ada soal yang sesuai filter'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {soal.length === 0
                        ? 'Mulai dengan menambahkan soal pertama untuk sistem penilaian'
                        : 'Coba ubah kriteria pencarian atau hapus filter yang aktif'
                      }
                    </p>
                    {soal.length === 0 && (
                      <Link
                        href={String(route('admin.soal.create'))}
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Tambah Soal Pertama
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredSoal.map((s) => (
                <Card key={s.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            ID #{s.id}
                          </span>
                          <div className="flex gap-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBobotColor(s.bobot_minat)}`}>
                              Minat: {s.bobot_minat}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBobotColor(s.bobot_bakat)}`}>
                              Bakat: {s.bobot_bakat}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-900 text-lg leading-relaxed mb-4">
                          {s.text_soal}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                            <div className="font-medium text-green-800">Bobot Minat</div>
                            <div className="text-green-600">{s.bobot_minat} - {getBobotLabel(s.bobot_minat)}</div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                            <div className="font-medium text-purple-800">Bobot Bakat</div>
                            <div className="text-purple-600">{s.bobot_bakat} - {getBobotLabel(s.bobot_bakat)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Link
                          href={String(route('admin.soal.show', s.id))}
                          className="inline-flex items-center px-4 py-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200 text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Detail
                        </Link>
                        <Link
                          href={String(route('admin.soal.edit', s.id))}
                          className="inline-flex items-center px-4 py-2 text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors duration-200 text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(s.id)}
                          className="inline-flex items-center px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hapus
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </PageContent>
      </PageLayout>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
