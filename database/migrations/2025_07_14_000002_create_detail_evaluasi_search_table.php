<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detail_evaluasi_search', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evaluasi_search_engine_id')->constrained('evaluasi_search_engine')->onDelete('cascade');
            $table->foreignId('kriteria_evaluasi_search_id')->constrained('kriteria_evaluasi_search')->onDelete('cascade');
            $table->decimal('skor', 3, 2);
            $table->timestamps();
            $table->index(['evaluasi_search_engine_id', 'kriteria_evaluasi_search_id']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('detail_evaluasi_search');
    }
}; 