<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kata_kunci_pencarian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->string('kata_kunci');
            $table->timestamp('waktu_pencarian');
            $table->text('hasil_pencarian')->nullable();
            $table->timestamps();
            $table->index(['user_id', 'perguruan_tinggi_id']);
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('kata_kunci_pencarian');
    }
}; 