<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kriteria_evaluasi_search', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kriteria');
            $table->decimal('bobot_kriteria', 3, 2);
            $table->text('deskripsi');
            $table->enum('kategori', ['usability', 'performance', 'content', 'design']);
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('kriteria_evaluasi_search');
    }
}; 