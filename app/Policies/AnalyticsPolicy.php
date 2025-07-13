<?php

namespace App\Policies;

use App\Models\User;

class AnalyticsPolicy
{
    public function view(User $user)
    {
        return $user->role === 'admin';
    }
} 