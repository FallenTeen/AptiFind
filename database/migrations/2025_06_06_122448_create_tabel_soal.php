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
        Schema::create('tabel_soal', function (Blueprint $table) {
            $table->id();
            $table->string('text_soal');
            $table->integer('bobot_minat')->default(0); // -1, 0, 1
            $table->integer('bobot_bakat')->default(0); // -1, 0, 1
            $table->string('author')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tabel_soal');
    }
};
