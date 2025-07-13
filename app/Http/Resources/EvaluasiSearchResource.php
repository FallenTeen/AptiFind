<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EvaluasiSearchResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'perguruan_tinggi' => $this->whenLoaded('perguruanTinggi'),
            'skenario' => $this->whenLoaded('skenario'),
            'skor_total' => $this->skor_total,
            'kategori_kualitas' => $this->kategori_kualitas,
            'waktu_evaluasi' => $this->waktu_evaluasi,
            'detail' => DetailEvaluasiSearchResource::collection($this->whenLoaded('detail')),
        ];
    }
} 