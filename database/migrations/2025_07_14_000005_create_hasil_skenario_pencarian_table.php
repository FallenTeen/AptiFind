<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hasil_skenario_pencarian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->foreignId('skenario_pencarian_id')->constrained('skenario_pencarian')->onDelete('cascade');
            $table->timestamp('waktu_skenario');
            $table->decimal('skor_keberhasilan', 5, 2);
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('hasil_skenario_pencarian');
    }
}; 