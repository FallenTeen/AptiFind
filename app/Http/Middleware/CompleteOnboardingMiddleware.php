<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CompleteOnboardingMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && !Auth::user()->onboarded) {
            return response()->json(['onboarding' => false], 403);
        }
        return $next($request);
    }
} 