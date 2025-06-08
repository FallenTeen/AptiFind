import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { Link } from '@inertiajs/react';

const breadcrumbs = [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Riwayat Tes', href: String(route('user.riwayat.index')) },
];

interface JawabanDetail {
  soal: { id: number; text_soal: string; bobot_minat: number; bobot_bakat: number };
  jawaban: string;
}

interface RiwayatDetail {
  id: number;
  paket_nama: string;
  tanggal: string;
  skor_minat: number;
  skor_bakat: number;
  quadrant: string;
  user: { name: string; email: string };
  jawaban: JawabanDetail[];
}

export default function RiwayatShow({ riwayat }: { riwayat: RiwayatDetail }) {
  function quadrantDesc(q: string) {
    switch (q) {
      case 'I': return 'Quadrant I: minat+ bakat+ → cocok dan lanjutkan';
      case 'II': return 'Quadrant II: minat+ bakat- → butuh latihan';
      case 'III': return 'Quadrant III: minat- bakat- → perlu diskusi lebih lanjut';
      case 'IV': return 'Quadrant IV: minat- bakat+ → butuh pengembangan minat';
      default: return '-';
    }
  }

  // pembulatannn
  function roundUpToMultipleOf5(num: number) {
    if (num <= 0) return 5;
    return Math.ceil(num / 5) * 5;
  }

  // hitung total maks bobotnya
  const totalMinat = riwayat.jawaban.reduce((sum, j) => sum + Math.abs(j.soal.bobot_minat), 0);
  const totalBakat = riwayat.jawaban.reduce((sum, j) => sum + Math.abs(j.soal.bobot_bakat), 0);

  // abis tu terapin jumlah sumbunya berdasarkan bobot yang idbulatkan
  const roundedMinat = roundUpToMultipleOf5(totalMinat);
  const roundedBakat = roundUpToMultipleOf5(totalBakat);
  const minX = -roundedMinat;
  const maxX = roundedMinat;
  const minY = -roundedBakat;
  const maxY = roundedBakat;

  // Helllllll, dont know what to call this, but this is the actual score calculation
  // Its working properly tho :v
  const skorMinatHitung = riwayat.jawaban.reduce((sum, j) => {
    if (j.jawaban === 'yes') {
      return sum + j.soal.bobot_minat;
    }
    return sum;
  }, 0);
  const skorBakatHitung = riwayat.jawaban.reduce((sum, j) => {
    if (j.jawaban === 'yes') {
      return sum + j.soal.bobot_bakat;
    }
    return sum;
  }, 0);

  function toSvgX(val: number) {
    return 20 + ((val - minX) / (maxX - minX || 1)) * 200;
  }
  function toSvgY(val: number) {
    return 220 - ((val - minY) / (maxY - minY || 1)) * 200;
  }

  const cx = toSvgX(skorMinatHitung);
  const cy = toSvgY(skorBakatHitung);

  return (
    <AppSidebarLayout breadcrumbs={[...breadcrumbs, { title: riwayat.paket_nama, href: '#' }] }>
      <div className="mx-auto max-w-3xl py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Hasil Tes: {riwayat.paket_nama}</h1>
        <div className="mb-4 text-gray-700">
          <div><span className="font-semibold">Nama:</span> {riwayat.user?.name || '-'}</div>
          <div><span className="font-semibold">Email:</span> {riwayat.user?.email || '-'}</div>
        </div>
        <div className="mb-4 text-gray-600">Tanggal: {new Date(riwayat.tanggal).toLocaleString('id-ID')}</div>
        <div className="flex gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-800 font-bold text-sm">Minat: {riwayat.skor_minat}</div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-purple-800 font-bold text-sm">Bakat: {riwayat.skor_bakat}</div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Diagram Kartesius Minat & Bakat</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <svg width="240" height="240" className="bg-white border rounded shadow" style={{background:'#f9fafb'}}>
              {/* Grid lines untuk sumbu */}
              <line x1={toSvgX(0)} y1={toSvgY(minY)} x2={toSvgX(0)} y2={toSvgY(maxY)} stroke="#888" strokeDasharray="4 2" />
              <line x1={toSvgX(minX)} y1={toSvgY(0)} x2={toSvgX(maxX)} y2={toSvgY(0)} stroke="#888" strokeDasharray="4 2" />

              {/* Titik hasil */}
              <circle cx={cx} cy={cy} r="8" fill="#10b981" stroke="#059669" strokeWidth="2" />
              <text x={cx+12} y={cy} fontSize="14" fill="#444">Hasil Anda</text>

              <text x={toSvgX(maxX)-15} y={toSvgY(0)-5} fontSize="12" fill="#666">{maxX}</text>
              <text x={toSvgX(minX)+5} y={toSvgY(0)-5} fontSize="12" fill="#666">{minX}</text>
              <text x={toSvgX(0)+5} y={toSvgY(maxY)+15} fontSize="12" fill="#666">{maxY}</text>
              <text x={toSvgX(0)+5} y={toSvgY(minY)-10} fontSize="12" fill="#666">{minY}</text>
              <text x={toSvgX(maxX)-40} y={toSvgY(0)+15} fontSize="11" fill="#888">Minat +</text>
              <text x={toSvgX(minX)+5} y={toSvgY(0)+15} fontSize="11" fill="#888">Minat -</text>
              <text x={toSvgX(0)-30} y={toSvgY(maxY)+15} fontSize="11" fill="#888">Bakat +</text>
              <text x={toSvgX(0)-30} y={toSvgY(minY)-10} fontSize="11" fill="#888">Bakat -</text>

              {/* Tick marks untuk skala */}
              {/* Tick marks sumbu X (minat) */}
              <line x1={toSvgX(maxX)} y1={toSvgY(0)-3} x2={toSvgX(maxX)} y2={toSvgY(0)+3} stroke="#666" strokeWidth="1" />
              <line x1={toSvgX(minX)} y1={toSvgY(0)-3} x2={toSvgX(minX)} y2={toSvgY(0)+3} stroke="#666" strokeWidth="1" />

              {/* Tick marks sumbu Y (bakat) */}
              <line x1={toSvgX(0)-3} y1={toSvgY(maxY)} x2={toSvgX(0)+3} y2={toSvgY(maxY)} stroke="#666" strokeWidth="1" />
              <line x1={toSvgX(0)-3} y1={toSvgY(minY)} x2={toSvgX(0)+3} y2={toSvgY(minY)} stroke="#666" strokeWidth="1" />
            </svg>
            <div className="text-base font-medium text-gray-700">
              <div className="mb-2">Quadrant: <span className="font-bold text-emerald-700">{riwayat.quadrant}</span></div>
              <div className="text-gray-600 mb-3">{quadrantDesc(riwayat.quadrant)}</div>
              <div className="text-sm text-gray-500">
                <div>Rentang Minat: {minX} sampai {maxX}</div>
                <div>Rentang Bakat: {minY} sampai {maxY}</div>
                <div className="mt-2 text-xs">
                  <div>Skor Minat: {skorMinatHitung}</div>
                  <div>Skor Bakat: {skorBakatHitung}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Tabel Ringkasan Jawaban</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 border">No</th>
                  <th className="px-3 py-2 border">Soal</th>
                  <th className="px-3 py-2 border">Jawaban</th>
                  <th className="px-3 py-2 border">Bobot Minat</th>
                  <th className="px-3 py-2 border">Bobot Bakat</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.jawaban.map((j, i) => (
                  <tr key={j.soal.id}>
                    <td className="px-3 py-2 border text-center">{i+1}</td>
                    <td className="px-3 py-2 border">{j.soal.text_soal}</td>
                    <td className="px-3 py-2 border text-center">{j.jawaban === 'yes' ? 'Ya' : 'Tidak'}</td>
                    <td className="px-3 py-2 border text-center">{j.soal.bobot_minat}</td>
                    <td className="px-3 py-2 border text-center">{j.soal.bobot_bakat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            href={String(route('user.riwayat.index'))}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Kembali ke Riwayat
          </Link>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
