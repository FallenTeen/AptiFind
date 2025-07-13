<?php

use Illuminate\Support\Facades\Route;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

Route::get('/', fn () => Inertia::render('landing'))->name('home');


use App\Http\Controllers\DashboardController;
Route::middleware(['auth'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

require base_path('routes/admin.php');
require base_path('routes/user.php');
require base_path('routes/settings.php');
require base_path('routes/auth.php');
