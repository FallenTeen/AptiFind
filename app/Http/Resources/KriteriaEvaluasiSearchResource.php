<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KriteriaEvaluasiSearchResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nama_kriteria' => $this->nama_kriteria,
            'bobot_kriteria' => $this->bobot_kriteria,
            'deskripsi' => $this->deskripsi,
            'kategori' => $this->kategori,
            'status' => $this->status,
        ];
    }
} 