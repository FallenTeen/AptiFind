import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Star, TrendingUp, Zap, Search, Info, MousePointer, Eye } from 'lucide-react';
import { router } from '@inertiajs/react';

interface SearchEngineEvaluationFormProps {
  perguruanTinggi: {
    id: number;
    nama: string;
    akronim: string;
  };
}

const evaluationCriteria = [
  {
    key: 'kemudahan_pencarian',
    label: 'Kemudahan Pencarian',
    description: 'Seberapa mudah mencari informasi di website',
    icon: Search,
    min: 1,
    max: 5
  },
  {
    key: 'kecepatan_loading',
    label: 'Kecepatan Loading',
    description: 'Seberapa cepat website memuat halaman',
    icon: Zap,
    min: 1,
    max: 5
  },
  {
    key: 'relevansi_hasil',
    label: 'Relevansi Hasil',
    description: 'Seberapa relevan hasil pencarian yang ditampilkan',
    icon: TrendingUp,
    min: 1,
    max: 5
  },
  {
    key: 'kelengkapan_informasi',
    label: 'Kelengkapan Informasi',
    description: 'Seberapa lengkap informasi yang ditampilkan',
    icon: Info,
    min: 1,
    max: 5
  },
  {
    key: 'tampilan_visual',
    label: 'Tampilan Visual',
    description: 'Seberapa menarik dan user-friendly tampilan website',
    icon: Eye,
    min: 1,
    max: 5
  },
  {
    key: 'kemudahan_navigasi',
    label: 'Kemudahan Navigasi',
    description: 'Seberapa mudah menavigasi antar halaman',
    icon: MousePointer,
    min: 1,
    max: 5
  }
];

export default function SearchEngineEvaluationForm({ perguruanTinggi }: SearchEngineEvaluationFormProps) {
  const [formData, setFormData] = useState({
    kemudahan_pencarian: 3,
    kecepatan_loading: 3,
    relevansi_hasil: 3,
    kelengkapan_informasi: 3,
    tampilan_visual: 3,
    kemudahan_navigasi: 3,
    komentar: '',
    saran_perbaikan: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSliderChange = (key: string, value: number[]) => {
    setFormData(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };

  const getTotalScore = () => {
    return Object.values(formData).reduce((total, value) => {
      if (typeof value === 'number') {
        return total + value;
      }
      return total;
    }, 0);
  };

  const getAverageScore = () => {
    const numericValues = Object.values(formData).filter(value => typeof value === 'number');
    return numericValues.reduce((total, value) => total + value, 0) / numericValues.length;
  };

  const getScoreCategory = (score: number) => {
    if (score >= 4.5) return { label: 'Sangat Baik', color: 'bg-green-100 text-green-800' };
    if (score >= 3.5) return { label: 'Baik', color: 'bg-blue-100 text-blue-800' };
    if (score >= 2.5) return { label: 'Sedang', color: 'bg-yellow-100 text-yellow-800' };
    if (score >= 1.5) return { label: 'Kurang', color: 'bg-orange-100 text-orange-800' };
    return { label: 'Sangat Kurang', color: 'bg-red-100 text-red-800' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await router.post(route('evaluasi-search-engine.store'), {
        perguruan_tinggi_id: perguruanTinggi.id,
        ...formData,
        browser_used: navigator.userAgent,
        device_type: window.innerWidth < 768 ? 'mobile' : 'desktop'
      });
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalScore = getTotalScore();
  const averageScore = getAverageScore();
  const scoreCategory = getScoreCategory(averageScore);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>Evaluasi Search Engine - {perguruanTinggi.nama}</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Berikan penilaian untuk 6 kriteria evaluasi search engine. Setiap kriteria dinilai dari 1 (sangat buruk) hingga 5 (sangat baik).
          </p>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Evaluation Criteria */}
        <div className="grid gap-6">
          {evaluationCriteria.map((criteria) => {
            const Icon = criteria.icon;
            const value = formData[criteria.key as keyof typeof formData] as number;
            
            return (
              <Card key={criteria.key}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <Label className="text-base font-medium">{criteria.label}</Label>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                      </div>
                      <Badge variant="outline" className="text-lg font-semibold">
                        {value}/5
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Slider
                        value={[value]}
                        onValueChange={(val) => handleSliderChange(criteria.key, val)}
                        max={criteria.max}
                        min={criteria.min}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Sangat Buruk</span>
                        <span>Sangat Baik</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Score Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Skor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalScore}</div>
                <div className="text-sm text-gray-600">Total Skor</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{averageScore.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Rata-rata</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Badge className={scoreCategory.color}>
                  {scoreCategory.label}
                </Badge>
                <div className="text-sm text-gray-600 mt-1">Kategori</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <div className="grid gap-4">
          <div>
            <Label htmlFor="komentar">Komentar (Opsional)</Label>
            <Textarea
              id="komentar"
              placeholder="Berikan komentar tentang pengalaman Anda menggunakan search engine perguruan tinggi ini..."
              value={formData.komentar}
              onChange={(e) => setFormData(prev => ({ ...prev, komentar: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="saran_perbaikan">Saran Perbaikan (Opsional)</Label>
            <Textarea
              id="saran_perbaikan"
              placeholder="Berikan saran untuk meningkatkan kualitas search engine..."
              value={formData.saran_perbaikan}
              onChange={(e) => setFormData(prev => ({ ...prev, saran_perbaikan: e.target.value }))}
              rows={3}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.visit(route('perguruan-tinggi.detail', perguruanTinggi.id))}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Kirim Evaluasi'}
          </Button>
        </div>
      </form>
    </div>
  );
} 