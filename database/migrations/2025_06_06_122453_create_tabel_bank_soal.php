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
        Schema::create('paket_soal', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket');
            $table->string('deskripsi')->nullable();
            $table->string('author')->nullable();
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->string('kategori')->nullable();
            $table->integer('jumlah_soal');
            $table->integer('balance_minat');
            $table->integer('balance_bakat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_soal');
    }
};
