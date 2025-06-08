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
        Schema::create('tabel_jawabanuser', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('paket_soal_id')->constrained('paket_soal')->onDelete('cascade');
            $table->timestamp('waktu_mulai')->nullable();
            $table->timestamp('waktu_selesai')->nullable();
            $table->integer('skor_minat')->nullable();
            $table->integer('skor_bakat')->nullable();
            $table->timestamps();
        });
        Schema::create('detail_jawaban_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jawaban_user_id')->constrained('tabel_jawabanuser')->onDelete('cascade');
            $table->foreignId('soal_id')->constrained('tabel_soal')->onDelete('cascade');
            $table->string('jawaban');
            $table->integer('bobot_minat');
            $table->integer('bobot_bakat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_jawaban_user');
        Schema::dropIfExists('tabel_jawabanuser');
    }
};
