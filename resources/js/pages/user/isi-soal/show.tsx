import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { route } from '@/lib/route';
import { useForm } from '@inertiajs/react';
import { useState, FormEvent } from 'react';

const breadcrumbs = [
  { title: 'Dashboard', href: String(route('dashboard')) },
  { title: 'Pengerjaan Soal', href: String(route('user.isi-soal.index')) },
];

type Soal = {
  id: number;
  text_soal: string;
  bobot_minat: number;
  bobot_bakat: number;
};

type DetailPaketSoal = {
  soal: Soal;
};

type Paket = {
  id: number;
  nama_paket: string;
  detail_paket_soal: DetailPaketSoal[];
  waktu_mulai?: string;
};

type JawabanItem = {
  soal_id: number;
  jawaban: string;
  bobot_minat: number;
  bobot_bakat: number;
} | null;

export default function IsiSoalShow({ paket }: { paket: Paket }) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { data, setData, post, errors } = useForm({
    jawaban: Array<JawabanItem>(paket.detail_paket_soal.length).fill(null),
    skor_minat: 0,
    skor_bakat: 0,
    waktu_mulai: paket.waktu_mulai || '',
  });
  const totalSoal = paket.detail_paket_soal.length;
  const handleChange = (idx: number, value: string, bobot_minat: number, bobot_bakat: number) => {
    const newJawaban = [...data.jawaban];
    newJawaban[idx] = { soal_id: paket.detail_paket_soal[idx].soal.id, jawaban: value, bobot_minat, bobot_bakat };
    setData('jawaban', newJawaban);
  };
  const hitungHasil = () => {
    let skor_minat = 0, skor_bakat = 0;
    data.jawaban.forEach((j) => {
      if (j && j.jawaban === 'yes') {
        skor_minat += j.bobot_minat;
        skor_bakat += j.bobot_bakat;
      }
    });
    return { skor_minat, skor_bakat };
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.jawaban.length !== totalSoal || data.jawaban.some((j) => !j || !j.jawaban)) {
      setErrorMsg('Semua soal wajib dijawab!');
      setSubmitted(true);
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    const hasil = hitungHasil();
    setData('skor_minat', hasil.skor_minat);
    setData('skor_bakat', hasil.skor_bakat);
    post(String(route('user.isi-soal.store', paket.id)));
  };
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs}>
      <div className="mx-auto w-full px-8 py-8">
        <h1 className="text-2xl font-bold mb-4">Pengerjaan Soal: {paket.nama_paket}</h1>
        <form onSubmit={handleSubmit}>
          {paket.detail_paket_soal.map((d, idx) => (
            <div key={d.soal.id} className="mb-6">
              <div className="font-semibold mb-2">{idx+1}. {d.soal.text_soal}</div>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input type="radio" name={`jawaban_${idx}`} value="yes" onChange={() => handleChange(idx, 'yes', d.soal.bobot_minat, d.soal.bobot_bakat)} checked={data.jawaban[idx]?.jawaban === 'yes'} />
                  <span className="ml-2">Ya</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" name={`jawaban_${idx}`} value="no" onChange={() => handleChange(idx, 'no', d.soal.bobot_minat, d.soal.bobot_bakat)} checked={data.jawaban[idx]?.jawaban === 'no'} />
                  <span className="ml-2">Tidak</span>
                </label>
              </div>
              {submitted && (!data.jawaban[idx] || !data.jawaban[idx]?.jawaban) && (
                <div className="mt-2 text-sm text-red-600">Soal ini wajib dijawab</div>
              )}
            </div>
          ))}
          {errorMsg && <div className="mb-2 text-red-600 font-medium">{errorMsg}</div>}
          {errors && Object.keys(errors).length > 0 && (
            <div className="mb-2 text-red-600 font-medium">{JSON.stringify(errors)}</div>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            disabled={submitted && (data.jawaban.length !== totalSoal || data.jawaban.some((j) => !j || !j.jawaban))}
          >
            Kirim Jawaban
          </button>
        </form>
      </div>
    </AppSidebarLayout>
  );
}
