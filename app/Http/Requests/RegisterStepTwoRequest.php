<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterStepTwoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'perguruan_tinggi_id' => 'required|exists:perguruan_tinggi,id',
            'program_studi_id' => 'required|exists:program_studi,id',
        ];
    }
} 