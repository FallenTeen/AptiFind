<?php

namespace App\Policies;

use App\Models\EvaluasiSearchEngine;
use App\Models\User;

class EvaluationPolicy
{
    public function view(User $user, EvaluasiSearchEngine $evaluasi)
    {
        return $user->id === $evaluasi->user_id;
    }
    public function update(User $user, EvaluasiSearchEngine $evaluasi)
    {
        return $user->id === $evaluasi->user_id;
    }
    public function delete(User $user, EvaluasiSearchEngine $evaluasi)
    {
        return $user->id === $evaluasi->user_id;
    }
} 