<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use App\Models\EvaluasiSearchEngine;

class EvaluationLimitMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $count = EvaluasiSearchEngine::where('user_id', Auth::id())->count();
            if ($count >= 10) {
                return response()->json(['limit' => true], 429);
            }
        }
        return $next($request);
    }
} 