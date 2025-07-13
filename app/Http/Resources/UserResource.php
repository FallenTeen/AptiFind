<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'perguruan_tinggi_id' => $this->perguruan_tinggi_id,
            'program_studi_id' => $this->program_studi_id,
            'role' => $this->role,
        ];
    }
} 