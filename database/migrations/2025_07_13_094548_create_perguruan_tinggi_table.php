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
        Schema::create('perguruan_tinggi', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->unique();
            $table->string('akronim')->unique();
            $table->enum('jenis', ['negeri', 'swasta'])->default('swasta');
            $table->text('alamat');
            $table->string('kota');
            $table->string('provinsi');
            $table->string('kode_pos', 10)->nullable();
            $table->string('telepon')->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->string('logo')->nullable();
            $table->string('no_telp')->nullable();
            $table->text('deskripsi')->nullable();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->decimal('rating_average', 3, 2)->default(0.00);
            $table->integer('total_evaluasi')->default(0);
            $table->timestamps();

            // Indexes
            $table->index(['jenis', 'status']);
            $table->index(['kota', 'provinsi']);
            $table->index('rating_average');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perguruan_tinggi');
    }
};
