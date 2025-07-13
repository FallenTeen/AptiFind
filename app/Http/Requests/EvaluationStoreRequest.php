<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EvaluationStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'perguruan_tinggi_id' => 'required|exists:perguruan_tinggi,id',
            'skenario_pencarian_id' => 'required|exists:skenario_pencarian,id',
            'kriteria' => 'required|array',
            'kriteria.*.id' => 'required|exists:kriteria_evaluasi_search,id',
            'kriteria.*.skor' => 'required|numeric|min:0|max:5',
        ];
    }
} 