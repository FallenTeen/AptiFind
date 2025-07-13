<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AnalyticsPermissionMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role !== 'admin') {
            return response()->json(['analytics' => false], 403);
        }
        return $next($request);
    }
} 