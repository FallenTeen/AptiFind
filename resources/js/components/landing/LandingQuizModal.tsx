import { useEffect, useState, useRef } from 'react';

type PaketSoal = {
  id: number;
  nama_paket: string;
  jumlah_soal: number;
  balance_minat: number;
  balance_bakat: number;
};

type Soal = {
  id: number;
  pertanyaan: string;
  text_soal: string;
  bobot_minat: number;
  bobot_bakat: number;
};
import { Button } from '@/components/ui/button';

export default function LandingQuizModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  const [paketList, setPaketList] = useState<PaketSoal[]>([]);
  const [selectedPaket, setSelectedPaket] = useState<PaketSoal | null>(null);
  const [soal, setSoal] = useState<Soal[]>([]);
  const [jawaban, setJawaban] = useState<(string | null)[]>([]);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [skor, setSkor] = useState<{ minat: number; bakat: number } | null>(null);
  useEffect(() => {
    fetch('/api/v1/public/paket-soal')
      .then((res) => res.json())
      .then((data) => setPaketList(data.paket || []))
      .catch(() => setPaketList([]));
  }, []);
  useEffect(() => {
    if (!selectedPaket) return;
    fetch(`/api/v1/public/soal?paket_soal_id=${selectedPaket.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat soal');
        return res.json();
      })
      .then((data) => {
        setSoal(data.soal);
        setJawaban(Array(data.soal.length).fill(null));
      })
      .catch(() => {
        setSoal([]);
      });
  }, [selectedPaket]);
  const handleJawab = (value: string) => {
    const newJawaban = [...jawaban];
    newJawaban[step] = value;
    setJawaban(newJawaban);
  };
  const handleNext = () => {
    if (step < soal.length - 1) setStep(step + 1);
  };
  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleSubmit = () => {
    let minat = 0, bakat = 0;
    soal.forEach((s, i) => {
      if (jawaban[i] === 'yes') {
        minat += s.bobot_minat;
        bakat += s.bobot_bakat;
      }
    });
    setSkor({ minat, bakat });
    setSubmitted(true);
  };
  if (!selectedPaket) return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl animate-fadeIn">
        <img src="/images/quiz-choose.svg" alt="Pilih Paket" className="mx-auto mb-4 w-24 h-24" />
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Simulasi Tes Minat & Bakat</h2>
        <div className="mb-4 text-gray-700 text-base">Silakan memilih salah satu paket soal di bawah ini untuk memulai simulasi tes. Setiap paket dirancang untuk memberikan gambaran minat dan bakat Anda secara komprehensif.</div>
        <div className="mb-6 text-gray-500 text-sm">Pilih paket yang sesuai dengan kebutuhan atau minat Anda. Anda dapat melihat detail jumlah soal dan komposisi minat/bakat pada setiap paket.</div>
        <div className="grid gap-4 mb-6">
          {paketList.length === 0 && <div className="text-gray-400">Tidak ada paket tersedia saat ini.</div>}
          {paketList.map((paket) => (
            <button
              key={paket.id}
              onClick={() => setSelectedPaket(paket)}
              className="w-full rounded-lg border border-emerald-300 bg-emerald-50 px-6 py-5 text-left hover:bg-emerald-100 transition-all flex items-center justify-between gap-4 shadow-sm"
              aria-label={`Pilih paket ${paket.nama_paket}`}
            >
              <div className="flex flex-col items-start">
                <div className="font-semibold text-emerald-900 text-lg mb-1">{paket.nama_paket}</div>
                <div className="text-xs text-gray-600">Jumlah Soal: <span className="font-bold text-emerald-700">{paket.jumlah_soal}</span></div>
              </div>
              <span className="text-sm bg-emerald-200 text-emerald-900 rounded px-3 py-1 font-semibold border border-emerald-300">Pilih Paket</span>
            </button>
          ))}
        </div>
        <Button onClick={onClose} className="mt-2" variant="outline">Tutup</Button>
      </div>
    </div>
  );
  if (soal.length === 0) return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl animate-fadeIn">
        <img src="/images/quiz-error.svg" alt="Error" className="mx-auto mb-4 w-24 h-24" />
        <div className="mb-4 text-red-600 font-semibold">Gagal memuat soal. Silakan coba lagi nanti.</div>
        <Button onClick={() => setSelectedPaket(null)} className="mt-2">Kembali</Button>
      </div>
    </div>
  );
  if (submitted && skor) return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl animate-fadeIn">
        <img src="/images/quiz-result.svg" alt="Result" className="mx-auto mb-4 w-24 h-24" />
        <h2 className="text-2xl font-bold mb-2 text-emerald-700">Hasil Tes Minat & Bakat</h2>
        <div className="mb-4 text-gray-600">Berikut adalah skor Anda:</div>
        <div className="flex justify-center gap-8 mb-6">
          <div className="bg-blue-50 rounded-lg px-6 py-4">
            <div className="text-xs text-blue-600 font-semibold mb-1">Minat</div>
            <div className="text-2xl font-bold text-blue-700">{skor.minat}</div>
          </div>
          <div className="bg-green-50 rounded-lg px-6 py-4">
            <div className="text-xs text-green-600 font-semibold mb-1">Bakat</div>
            <div className="text-2xl font-bold text-green-700">{skor.bakat}</div>
          </div>
        </div>
        <div className="mb-4 text-gray-500 text-sm">Hasil ini hanya simulasi. Untuk hasil lebih akurat, silakan daftar dan ikuti tes lengkap.</div>
        <Button onClick={onClose} className="mt-2">Tutup</Button>
      </div>
    </div>
  );
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-2xl p-0 max-w-lg w-full shadow-2xl animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl" aria-label="Tutup">&times;</button>
          <button onClick={() => setSelectedPaket(null)} className="text-sm text-emerald-700 hover:underline font-medium" aria-label="Ganti Paket">&larr; Ganti Paket</button>
        </div>
        <div className="px-8 pb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Soal {step + 1} dari {soal.length}</span>
              <span className="text-xs text-gray-400">Simulasi Tes</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-green-400 rounded-full" style={{ width: `${((step + 1) / soal.length) * 100}%` }} />
            </div>
            <div className="mb-4 text-lg font-medium text-gray-900 min-h-[48px] flex items-center justify-center">
              {soal[step].text_soal}
            </div>
            <div className="flex gap-6 justify-center">
              <label className={`inline-flex items-center px-6 py-3 rounded-lg border cursor-pointer transition-all ${jawaban[step] === 'yes' ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-200 hover:border-blue-300'}`}>
                <input type="radio" name="jawaban" value="yes" checked={jawaban[step] === 'yes'} onChange={() => handleJawab('yes')} className="hidden" />
                <span className="ml-2 text-base font-semibold text-blue-700">Ya</span>
              </label>
              <label className={`inline-flex items-center px-6 py-3 rounded-lg border cursor-pointer transition-all ${jawaban[step] === 'no' ? 'bg-red-50 border-red-400' : 'bg-gray-50 border-gray-200 hover:border-red-300'}`}>
                <input type="radio" name="jawaban" value="no" checked={jawaban[step] === 'no'} onChange={() => handleJawab('no')} className="hidden" />
                <span className="ml-2 text-base font-semibold text-red-700">Tidak</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrev} disabled={step === 0}>Sebelumnya</Button>
            {step === soal.length - 1 ? (
              <Button onClick={handleSubmit} disabled={jawaban[step] === null}>Lihat Hasil</Button>
            ) : (
              <Button onClick={handleNext} disabled={jawaban[step] === null}>Selanjutnya</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
