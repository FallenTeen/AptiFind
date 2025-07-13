import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, UserCheck, FileText, Brain, Award } from 'lucide-react';
import { useState } from 'react';
import LandingQuizModal from './LandingQuizModal';

export default function IsiSoalSection() {
  const [showQuiz, setShowQuiz] = useState(false);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proses sederhana untuk menemukan potensi minat dan bakat Anda dalam 4 langkah mudah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Daftar & Login</h3>
            <p className="text-gray-600">
              Buat akun baru atau login ke akun yang sudah ada untuk memulai perjalanan Anda
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Pilih Paket Soal</h3>
            <p className="text-gray-600">
              Pilih paket soal minat bakat yang sesuai dengan kebutuhan dan tujuan Anda
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Jawab Pertanyaan</h3>
            <p className="text-gray-600">
              Jawab setiap pertanyaan dengan jujur dan sesuai dengan diri Anda (Ya/Tidak)
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Lihat Hasil</h3>
            <p className="text-gray-600">
              Dapatkan analisis lengkap minat dan bakat Anda beserta rekomendasi karir
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Mengapa Memilih Platform Kami?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Tes minat bakat yang telah divalidasi dan terstandar</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Analisis hasil yang mendalam dan akurat</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Rekomendasi karir dan pendidikan yang relevan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Interface yang user-friendly dan mudah digunakan</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Riwayat tes dan perkembangan yang tersimpan</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Siap Memulai?
                </h4>
                <p className="text-gray-600 mb-6">
                  Bergabunglah dengan ribuan siswa dan mahasiswa yang telah menemukan potensi mereka
                </p>
                <Button asChild size="lg" className="w-full">
                  <Link href={route('register')}>
                    Mulai Tes Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center">
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl p-8 shadow-lg w-full max-w-2xl flex flex-col md:flex-row items-center gap-6">
            <img src="/images/quiz-illustration.svg" alt="Quiz" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ingin tahu potensi minat & bakatmu?</h3>
              <p className="text-gray-600 mb-4">Coba simulasi tes minat bakat gratis, tanpa login. Jawab beberapa pertanyaan dan lihat hasilnya langsung!</p>
              <Button size="lg" className="w-full md:w-auto" onClick={() => setShowQuiz(true)}>
                <span className="font-semibold">Coba Tes Minat Bakat</span>
              </Button>
            </div>
          </div>
        </div>
        {showQuiz && <LandingQuizModal onClose={() => setShowQuiz(false)} />}
      </div>
    </section>
  );
}
