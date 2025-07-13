import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EvaluasiSearchEngineShow() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`/api/v1/evaluasi-search-engine/${id}`)
      .then(res => res.json())
      .then(res => setData(res.evaluasi));
  }, [id]);
  if (!data) return <div>Loading...</div>;
  return (
    <div className="max-w-lg mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Detail Evaluasi</h1>
      <div className="mb-2 font-semibold">{data.universitas?.nama}</div>
      <div className="mb-2 text-sm text-gray-600">{data.url_website}</div>
      <div className="flex gap-4 mb-2">
        <span>Akurat: {data.skor_akurat}</span>
        <span>Relevan: {data.skor_relevan}</span>
        <span>Terpercaya: {data.skor_terpercaya}</span>
      </div>
      <div className="mb-2 text-gray-700">{data.komentar}</div>
      <div className="text-xs text-gray-400">Oleh: {data.user?.name}</div>
    </div>
  );
}
