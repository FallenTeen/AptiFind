import AppLayout from '@/layouts/app-layout';
import { route } from '@/lib/route';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface Soal {
  id: number;
  text_soal: string;
  bobot_minat: number;
  bobot_bakat: number;
}

export default function SoalShow({ soal }: { soal: Soal }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const breadcrumbs = [
    { title: 'Dashboard', href: String(route('dashboard')) },
    { title: 'Soal', href: String(route('admin.soal.index')) },
    { title: `Detail Soal #${soal.id}`, href: String(route('admin.soal.show', soal.id)) },
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

  const getBobotBgColor = (value: number): string => {
    switch (value) {
      case 1: return 'bg-green-50 border-green-200';
      case 0: return 'bg-gray-50 border-gray-200';
      case -1: return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getBobotTextColor = (value: number): string => {
    switch (value) {
      case 1: return 'text-green-800';
      case 0: return 'text-gray-800';
      case -1: return 'text-red-800';
      default: return 'text-gray-800';
    }
  };

  const handleDelete = () => {
    router.delete(String(route('admin.soal.destroy', soal.id)), {
      onSuccess: () => {
        // Redirect to index after successful deletion
        router.visit(String(route('admin.soal.index')));
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  Detail Soal
                </h1>
                <p className="text-indigo-100 mt-2">
                  Informasi lengkap soal #ID{soal.id}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href={String(route('admin.soal.edit', soal.id))}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200 flex items-center gap-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Soal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8">
            {/* ID Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                </svg>
                ID #{soal.id}
              </span>
              <div className="flex gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBobotColor(soal.bobot_minat)}`}>
                  Minat: {soal.bobot_minat}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getBobotColor(soal.bobot_bakat)}`}>
                  Bakat: {soal.bobot_bakat}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Teks Soal
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-gray-900 text-lg leading-relaxed">
                  {soal.text_soal}
                </p>
              </div>
            </div>

            {/* Bobot Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Bobot Penilaian
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bobot Minat */}
                <div className={`p-6 rounded-xl border-2 ${getBobotBgColor(soal.bobot_minat)}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getBobotColor(soal.bobot_minat)}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${getBobotTextColor(soal.bobot_minat)}`}>
                        Bobot Minat
                      </h3>
                      <p className="text-sm text-gray-600">Tingkat ketertarikan siswa</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Nilai:</span>
                      <span className={`text-2xl font-bold ${getBobotTextColor(soal.bobot_minat)}`}>
                        {soal.bobot_minat}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Label:</span>
                      <span className={`text-sm font-medium ${getBobotTextColor(soal.bobot_minat)}`}>
                        {getBobotLabel(soal.bobot_minat)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bobot Bakat */}
                <div className={`p-6 rounded-xl border-2 ${getBobotBgColor(soal.bobot_bakat)}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getBobotColor(soal.bobot_bakat)}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${getBobotTextColor(soal.bobot_bakat)}`}>
                        Bobot Bakat
                      </h3>
                      <p className="text-sm text-gray-600">Tingkat kemampuan siswa</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Nilai:</span>
                      <span className={`text-2xl font-bold ${getBobotTextColor(soal.bobot_bakat)}`}>
                        {soal.bobot_bakat}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Label:</span>
                      <span className={`text-sm font-medium ${getBobotTextColor(soal.bobot_bakat)}`}>
                        {getBobotLabel(soal.bobot_bakat)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scale Reference */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Referensi Skala Penilaian
              </h2>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 text-red-800 rounded-lg flex items-center justify-center font-bold text-sm border border-red-200">
                      -1
                    </div>
                    <div>
                      <div className="font-medium text-red-800">Sangat Tidak Setuju</div>
                      <div className="text-xs text-red-600">Nilai negatif</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 text-gray-800 rounded-lg flex items-center justify-center font-bold text-sm border border-gray-200">
                      0
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Netral</div>
                      <div className="text-xs text-gray-600">Nilai netral</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 text-green-800 rounded-lg flex items-center justify-center font-bold text-sm border border-green-200">
                      1
                    </div>
                    <div>
                      <div className="font-medium text-green-800">Sangat Setuju</div>
                      <div className="text-xs text-green-600">Nilai positif</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <Link
                href={String(route('admin.soal.index'))}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Daftar
              </Link>

              <Link
                href={String(route('admin.soal.edit', soal.id))}
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Soal
              </Link>

              <button
                onClick={() => setDeleteConfirm(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus Soal
              </button>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Hapus</h3>
                  <p className="text-sm text-gray-600">Soal #ID{soal.id}</p>
                </div>
              </div>

              <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 font-medium mb-2">Peringatan!</p>
                <p className="text-red-700 text-sm">
                  Menghapus soal ini akan menghilangkan semua data terkait secara permanen.
                  Tindakan ini tidak dapat dibatalkan.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-6">
                <p className="text-gray-700 text-sm">
                  <strong>Soal yang akan dihapus:</strong>
                </p>
                <p className="text-gray-600 text-sm mt-1 italic">
                  "{soal.text_soal.length > 100 ? soal.text_soal.substring(0, 100) + '...' : soal.text_soal}"
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Ya, Hapus Permanen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
