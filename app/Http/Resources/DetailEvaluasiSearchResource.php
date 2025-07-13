<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DetailEvaluasiSearchResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'kriteria' => new KriteriaEvaluasiSearchResource($this->whenLoaded('kriteria')),
            'skor' => $this->skor,
        ];
    }
} 