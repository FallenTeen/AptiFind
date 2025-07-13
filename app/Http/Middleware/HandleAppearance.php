<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;

class HandleAppearance
{
    public function handle(Request $request, Closure $next)
    {
        $appearance = $request->cookie('appearance', 'system');
        
        // Share the appearance variable with Blade views
        View::share('appearance', $appearance);
        
        // Also share with Inertia for your React components
        Inertia::share('appearance', $appearance);
        
        return $next($request);
    }
}