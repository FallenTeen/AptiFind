import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { CheckCircle, AlertTriangle, HelpCircle, TrendingUp } from 'lucide-react';

interface JawabanDetail {
  id: number;
  soal?: { text_soal: string; bobot_minat?: number; bobot_bakat?: number };
  jawaban: string;
}
interface Jawaban {
  id?: number;
  user?: { name: string };
  paket_soal?: { nama_paket: string };
  detail_jawaban_user: JawabanDetail[];
  skor_minat: number;
  skor_bakat: number;
  quadrant: string;
}

const breadcrumbs: { title: string; href: string }[] = [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Riwayat Pengisi', href: String(route('admin.riwayat.index')) },
  // Detail akan diisi dengan nama user jika ada
];

export default function AdminRiwayatShow({ jawaban }: { jawaban: Jawaban }) {
  // Fungsi penjelasan quadrant
  function quadrantDesc(q: string) {
    switch (q) {
      case 'I': return 'Quadrant I: minat+ bakat+ → cocok dan lanjutkan';
      case 'II': return 'Quadrant II: minat+ bakat- → butuh latihan';
      case 'III': return 'Quadrant III: minat- bakat- → perlu diskusi lebih lanjut';
      case 'IV': return 'Quadrant IV: minat- bakat+ → butuh pengembangan minat';
      default: return '-';
    }
  }
  // Tambahkan fungsi pembulatan ke kelipatan 5
  function roundUpToMultipleOf5(num: number) {
    if (num <= 0) return 5;
    return Math.ceil(num / 5) * 5;
  }
  // Hitung total bobot minat dan bakat dari seluruh soal pada paket
  const totalMinat = jawaban.detail_jawaban_user.reduce((sum, d) => sum + Math.abs(d.soal?.bobot_minat ?? 0), 0);
  const totalBakat = jawaban.detail_jawaban_user.reduce((sum, d) => sum + Math.abs(d.soal?.bobot_bakat ?? 0), 0);
  const roundedMinat = roundUpToMultipleOf5(totalMinat);
  const roundedBakat = roundUpToMultipleOf5(totalBakat);
  const minX = -roundedMinat;
  const maxX = roundedMinat;
  const minY = -roundedBakat;
  const maxY = roundedBakat;
  // Fungsi konversi nilai ke posisi pixel SVG
  function toSvgX(val: number) {
    return 20 + ((val - minX) / (maxX - minX || 1)) * 200;
  }
  function toSvgY(val: number) {
    return 220 - ((val - minY) / (maxY - minY || 1)) * 200;
  }
  const cx = toSvgX(jawaban.skor_minat);
  const cy = toSvgY(jawaban.skor_bakat);
  const detailCrumb = jawaban.user?.name ? [{ title: jawaban.user.name, href: '#' }] : [];

  const quadrantInfo = {
    I: {
      title: 'Quadrant I',
      desc: 'minat+ bakat+ → cocok dan lanjutkan',
      advice: 'Anda memiliki minat dan bakat yang tinggi di bidang ini. Pertahankan dan kembangkan potensi Anda melalui pelatihan, pengalaman, dan eksplorasi lebih lanjut.',
      icon: <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />,
      color: 'emerald-600',
    },
    II: {
      title: 'Quadrant II',
      desc: 'minat+ bakat- → butuh latihan',
      advice: 'Anda memiliki minat tinggi namun bakat masih perlu diasah. Ikuti pelatihan, praktik, dan jangan ragu untuk mencoba hal baru agar bakat Anda berkembang.',
      icon: <TrendingUp className="w-8 h-8 text-yellow-500 mb-2" />,
      color: 'yellow-500',
    },
    III: {
      title: 'Quadrant III',
      desc: 'minat- bakat- → perlu diskusi lebih lanjut',
      advice: 'Minat dan bakat Anda di bidang ini masih rendah. Diskusikan dengan konselor atau mentor untuk menemukan bidang yang lebih sesuai dengan potensi Anda.',
      icon: <HelpCircle className="w-8 h-8 text-gray-500 mb-2" />,
      color: 'gray-500',
    },
    IV: {
      title: 'Quadrant IV',
      desc: 'minat- bakat+ → butuh pengembangan minat',
      advice: 'Bakat Anda tinggi namun minat masih kurang. Coba eksplorasi lebih jauh, cari inspirasi, dan temukan aspek yang bisa membangkitkan minat Anda.',
      icon: <AlertTriangle className="w-8 h-8 text-orange-500 mb-2" />,
      color: 'orange-500',
    },
  };
  const q = (jawaban.quadrant ?? '-') as keyof typeof quadrantInfo;

  return (
    <AppSidebarLayout breadcrumbs={[...breadcrumbs, ...detailCrumb]}>
      <div className="mx-auto max-w-3xl py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Detail Jawaban</h1>
        <div className="mb-4 text-gray-600">User: {jawaban.user?.name}</div>
        <div className="mb-4 text-gray-600">Paket: {jawaban.paket_soal?.nama_paket}</div>
        <div className="flex gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-800 font-bold text-sm">Minat: {jawaban.skor_minat}</div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-purple-800 font-bold text-sm">Bakat: {jawaban.skor_bakat}</div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Diagram Kartesius Minat & Bakat</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <svg width="240" height="240" className="bg-white border rounded shadow" style={{background:'#f9fafb'}}>
              {/* Sumbu X dan Y */}
              <line x1={toSvgX(0)} y1={toSvgY(minY)} x2={toSvgX(0)} y2={toSvgY(maxY)} stroke="#888" strokeDasharray="4 2" />
              <line x1={toSvgX(minX)} y1={toSvgY(0)} x2={toSvgX(maxX)} y2={toSvgY(0)} stroke="#888" strokeDasharray="4 2" />
              {/* Titik hasil */}
              <circle cx={cx} cy={cy} r="8" fill="#10b981" stroke="#059669" strokeWidth="2" />
              <text x={cx+12} y={cy} fontSize="14" fill="#444">Hasil</text>
              {/* Label sumbu */}
              <text x={toSvgX(maxX)-30} y={toSvgY(0)-5} fontSize="12" fill="#666">Minat +</text>
              <text x={toSvgX(minX)+5} y={toSvgY(0)-5} fontSize="12" fill="#666">Minat -</text>
              <text x={toSvgX(0)+5} y={toSvgY(maxY)+15} fontSize="12" fill="#666">Bakat +</text>
              <text x={toSvgX(0)+5} y={toSvgY(minY)-10} fontSize="12" fill="#666">Bakat -</text>
            </svg>
            <div className="text-base font-medium text-gray-700">
              <div className="mb-2">Quadrant: <span className="font-bold text-emerald-700">{jawaban.quadrant}</span></div>
              <div className="text-gray-600">{quadrantDesc(jawaban.quadrant)}</div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Hasil Analisis Quadrant</h2>
          <div className={`rounded-xl border border-emerald-300 bg-emerald-50 p-6 mb-4 shadow-sm flex flex-col items-center`}>
            {quadrantInfo[q]?.icon}
            <div className={`text-xl font-bold text-${quadrantInfo[q]?.color} mb-1`}>Quadrant: {quadrantInfo[q]?.title || '-'}</div>
            <div className="text-base text-gray-700 mb-2">{quadrantInfo[q]?.desc || '-'}</div>
            <div className="text-sm text-gray-700 font-semibold mb-1">Saran:</div>
            <div className="text-sm text-gray-600 text-center max-w-md">{quadrantInfo[q]?.advice || '-'}</div>
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
                {jawaban.detail_jawaban_user.map((d, i) => (
                  <tr key={d.id}>
                    <td className="px-3 py-2 border text-center">{i+1}</td>
                    <td className="px-3 py-2 border">{d.soal?.text_soal}</td>
                    <td className="px-3 py-2 border text-center">{d.jawaban === 'yes' ? 'Ya' : 'Tidak'}</td>
                    <td className="px-3 py-2 border text-center">{d.soal?.bobot_minat ?? '-'}</td>
                    <td className="px-3 py-2 border text-center">{d.soal?.bobot_bakat ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <a
            href={typeof jawaban.id === 'number' ? String(route('admin.riwayat.exportPdf', jawaban.id)) : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-700"
          >
            Export PDF
          </a>
        </div>
      </div>
    </AppSidebarLayout>
  );
}
