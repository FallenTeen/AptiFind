<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skenario_pencarian', function (Blueprint $table) {
            $table->id();
            $table->string('nama_skenario');
            $table->json('kata_kunci_default');
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('skenario_pencarian');
    }
}; 