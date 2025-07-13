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
        Schema::create('hasil_penelitian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->foreignId('program_studi_id')->constrained('program_studi')->onDelete('cascade');
            
            // Data evaluasi search engine
            $table->integer('skor_evaluasi_search_engine');
            $table->enum('kategori_kualitas_search', ['sangat_baik', 'baik', 'sedang', 'kurang', 'sangat_kurang']);
            
            // Data minat dan bakat
            $table->integer('skor_minat');
            $table->integer('skor_bakat');
            $table->enum('tingkat_minat', ['sangat_tinggi', 'tinggi', 'sedang', 'rendah', 'sangat_rendah']);
            $table->enum('tingkat_bakat', ['sangat_tinggi', 'tinggi', 'sedang', 'rendah', 'sangat_rendah']);
            
            // Korelasi dan analisis
            $table->decimal('korelasi_search_minat', 4, 3)->nullable();
            $table->decimal('korelasi_search_bakat', 4, 3)->nullable();
            $table->enum('pengaruh_kualitas', ['positif_kuat', 'positif_lemah', 'netral', 'negatif_lemah', 'negatif_kuat']);
            
            // Data interaksi
            $table->integer('durasi_interaksi_detik')->nullable();
            $table->integer('jumlah_klik')->nullable();
            $table->integer('jumlah_halaman_dikunjungi')->nullable();
            
            // Hasil akhir
            $table->boolean('meningkatkan_minat')->default(false);
            $table->boolean('meningkatkan_bakat')->default(false);
            $table->text('kesimpulan')->nullable();
            $table->text('rekomendasi')->nullable();
            
            $table->timestamp('waktu_penelitian');
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'waktu_penelitian'], 'hasil_user_time_idx');
            $table->index(['perguruan_tinggi_id', 'pengaruh_kualitas'], 'hasil_pt_pengaruh_idx');
            $table->index(['program_studi_id', 'meningkatkan_minat'], 'hasil_prodi_minat_idx');
            $table->index(['program_studi_id', 'meningkatkan_bakat'], 'hasil_prodi_bakat_idx');
            $table->unique(['user_id', 'perguruan_tinggi_id', 'program_studi_id'], 'hasil_user_pt_prodi_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_penelitian');
    }
};
