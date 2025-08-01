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

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->foreignId('skenario_pencarian_id')->nullable()->constrained('skenario_pencarian')->onDelete('set null');

            $table->tinyInteger('kemudahan_pencarian')->comment('1-5: Kemudahan dalam mencari informasi');
            $table->tinyInteger('kecepatan_loading')->comment('1-5: Kecepatan loading website');
            $table->tinyInteger('relevansi_hasil')->comment('1-5: Relevansi hasil pencarian');
            $table->tinyInteger('kelengkapan_informasi')->comment('1-5: Kelengkapan informasi yang ditampilkan');
            $table->tinyInteger('tampilan_visual')->comment('1-5: Tampilan visual dan UI/UX');
            $table->tinyInteger('kemudahan_navigasi')->comment('1-5: Kemudahan navigasi website');

            $table->tinyInteger('skor_akurat')->comment('Skor akurasi hasil');
            $table->tinyInteger('skor_relevan')->comment('Skor relevansi hasil');
            $table->tinyInteger('skor_terpercaya')->comment('Skor kepercayaan terhadap sumber');
            $table->decimal('seqi', 5, 2)->nullable()->comment('Search Engine Quality Index score');
            $table->decimal('ues', 5, 2)->nullable()->comment('User Engagement Score');

            $table->integer('skor_total')->nullable()->comment('Total skor, bisa dihitung dari kriteria di atas');
            $table->enum('kategori_kualitas', ['sangat_baik', 'baik', 'sedang', 'kurang', 'sangat_kurang'])->nullable();
            $table->string('url_website');
            $table->text('komentar')->nullable();
            $table->text('saran_perbaikan')->nullable();
            $table->string('browser_used')->nullable();
            $table->string('device_type')->nullable();
            $table->timestamp('waktu_evaluasi')->useCurrent();
            $table->timestamps();

            $table->index('skor_total', 'eval_skor_total_idx');
            $table->index(['perguruan_tinggi_id', 'kategori_kualitas'], 'eval_pt_kategori_idx');
            $table->unique(['perguruan_tinggi_id', 'user_id', 'skenario_pencarian_id'], 'eval_pt_user_skenario_unique');
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
