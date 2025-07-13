<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterStepOneRequest;
use App\Http\Requests\RegisterStepTwoRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function step1(RegisterStepOneRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        Auth::login($user);
        return response()->json(['step' => 2, 'user_id' => $user->id]);
    }

    public function step2(RegisterStepTwoRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $user->perguruan_tinggi_id = $data['perguruan_tinggi_id'];
        $user->program_studi_id = $data['program_studi_id'];
        $user->save();
        return response()->json(['step' => 3]);
    }

    public function step3(Request $request)
    {
        $user = Auth::user();
        $user->tech_profile = $request->input('tech_profile');
        $user->save();
        return response()->json(['step' => 4]);
    }

    public function complete(Request $request)
    {
        $user = Auth::user();
        $user->onboarded = true;
        $user->save();
        return response()->json(['success' => true]);
    }
} 