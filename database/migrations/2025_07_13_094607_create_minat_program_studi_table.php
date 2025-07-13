<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('minat_program_studi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('program_studi_id')->constrained('program_studi')->onDelete('cascade');
            
            // Skor minat dan bakat
            $table->integer('skor_minat')->comment('Skor minat terhadap program studi');
            $table->integer('skor_bakat')->comment('Skor bakat terhadap program studi');
            $table->enum('tingkat_minat', ['sangat_tinggi', 'tinggi', 'sedang', 'rendah', 'sangat_rendah']);
            $table->enum('tingkat_bakat', ['sangat_tinggi', 'tinggi', 'sedang', 'rendah', 'sangat_rendah']);
            
            // Data tambahan
            $table->text('alasan_minat')->nullable();
            $table->text('alasan_bakat')->nullable();
            $table->boolean('is_rekomendasi')->default(false);
            $table->integer('urutan_prioritas')->default(0);
            $table->timestamp('waktu_tes');
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'urutan_prioritas'], 'minat_user_prioritas_idx');
            $table->index(['program_studi_id', 'tingkat_minat'], 'minat_prodi_minat_idx');
            $table->index(['program_studi_id', 'tingkat_bakat'], 'minat_prodi_bakat_idx');
            $table->unique(['user_id', 'program_studi_id'], 'minat_user_prodi_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('minat_program_studi');
    }
};
