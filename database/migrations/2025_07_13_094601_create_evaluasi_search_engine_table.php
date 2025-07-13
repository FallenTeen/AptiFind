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
        Schema::create('evaluasi_search_engine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            
            // Kriteria evaluasi (1-5)
            $table->integer('kemudahan_pencarian')->comment('1-5: Kemudahan dalam mencari informasi');
            $table->integer('kecepatan_loading')->comment('1-5: Kecepatan loading website');
            $table->integer('relevansi_hasil')->comment('1-5: Relevansi hasil pencarian');
            $table->integer('kelengkapan_informasi')->comment('1-5: Kelengkapan informasi yang ditampilkan');
            $table->integer('tampilan_visual')->comment('1-5: Tampilan visual dan UI/UX');
            $table->integer('kemudahan_navigasi')->comment('1-5: Kemudahan navigasi website');
            
            // Skor total dan kategori
            $table->integer('skor_total')->comment('Total dari 6 kriteria (6-30)');
            $table->enum('kategori_kualitas', ['sangat_baik', 'baik', 'sedang', 'kurang', 'sangat_kurang']);
            
            // Data tambahan
            $table->text('komentar')->nullable();
            $table->text('saran_perbaikan')->nullable();
            $table->string('browser_used')->nullable();
            $table->string('device_type')->nullable();
            $table->timestamp('waktu_evaluasi');
            $table->timestamps();
            
            // Indexes
            $table->index(['perguruan_tinggi_id', 'kategori_kualitas'], 'eval_pt_kategori_idx');
            $table->index(['user_id', 'waktu_evaluasi'], 'eval_user_time_idx');
            $table->index('skor_total', 'eval_skor_idx');
            $table->unique(['perguruan_tinggi_id', 'user_id'], 'eval_pt_user_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluasi_search_engine');
    }
};
