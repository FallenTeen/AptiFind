<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('evaluasi_search_engine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('universitas_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            $table->string('url_website');
            $table->tinyInteger('skor_akurat');
            $table->tinyInteger('skor_relevan');
            $table->tinyInteger('skor_terpercaya');
            $table->text('komentar')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('evaluasi_search_engine');
    }
};
