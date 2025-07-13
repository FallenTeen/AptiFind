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
        Schema::create('program_studi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->string('nama');
            $table->enum('jenjang', ['D3', 'D4', 'S1', 'S2', 'S3'])->default('S1');
            $table->string('kode_prodi', 20)->nullable();
            $table->enum('akreditasi', ['A', 'B', 'C', 'D', 'E', 'belum'])->default('belum');
            $table->integer('kuota_mahasiswa')->default(0);
            $table->decimal('biaya_kuliah', 12, 2)->nullable();
            $table->text('deskripsi')->nullable();
            $table->text('prospek_karir')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->integer('total_minat')->default(0);
            $table->timestamps();
            
            // Indexes
            $table->index(['perguruan_tinggi_id', 'status']);
            $table->index(['jenjang', 'akreditasi']);
            $table->index('total_minat');
            $table->unique(['perguruan_tinggi_id', 'nama', 'jenjang']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_studi');
    }
};
