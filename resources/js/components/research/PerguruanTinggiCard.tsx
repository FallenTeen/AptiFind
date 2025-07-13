import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Users, ExternalLink } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface PerguruanTinggiCardProps {
  perguruanTinggi: {
    id: number;
    nama: string;
    akronim: string;
    jenis: string;
    kota: string;
    provinsi: string;
    rating_average: number;
    total_evaluasi: number;
    program_studi_count: number;
    website?: string;
    logo?: string;
  };
  showActions?: boolean;
}

export default function PerguruanTinggiCard({ perguruanTinggi, showActions = true }: PerguruanTinggiCardProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.0) return 'text-green-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getJenisColor = (jenis: string) => {
    return jenis === 'negeri' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {perguruanTinggi.logo && (
              <img 
                src={perguruanTinggi.logo} 
                alt={perguruanTinggi.nama}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div>
              <CardTitle className="text-lg font-semibold">{perguruanTinggi.nama}</CardTitle>
              <p className="text-sm text-gray-600">{perguruanTinggi.akronim}</p>
            </div>
          </div>
          <Badge className={getJenisColor(perguruanTinggi.jenis)}>
            {perguruanTinggi.jenis === 'negeri' ? 'Negeri' : 'Swasta'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{perguruanTinggi.kota}, {perguruanTinggi.provinsi}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className={`w-4 h-4 ${getRatingColor(perguruanTinggi.rating_average)}`} />
            <span className={`font-medium ${getRatingColor(perguruanTinggi.rating_average)}`}>
              {perguruanTinggi.rating_average.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({perguruanTinggi.total_evaluasi} evaluasi)
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{perguruanTinggi.program_studi_count} Program Studi</span>
          </div>
        </div>
        
        {showActions && (
          <div className="flex space-x-2 pt-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={route('perguruan-tinggi.detail', perguruanTinggi.id)}>
                Detail
              </Link>
            </Button>
            
            <Button asChild size="sm" className="flex-1">
              <Link href={route('perguruan-tinggi.evaluate', perguruanTinggi.id)}>
                Evaluasi
              </Link>
            </Button>
            
            {perguruanTinggi.website && (
              <Button variant="ghost" size="sm" asChild>
                <a 
                  href={perguruanTinggi.website.startsWith('http') ? perguruanTinggi.website : `https://${perguruanTinggi.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 