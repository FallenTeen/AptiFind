<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ResearchParticipantMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->status !== 'mahasiswa_aktif') {
            return response()->json(['participant' => false], 403);
        }
        return $next($request);
    }
} 