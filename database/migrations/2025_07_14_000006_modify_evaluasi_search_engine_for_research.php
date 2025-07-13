<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('evaluasi_search_engine', function (Blueprint $table) {
            $table->foreignId('skenario_pencarian_id')->nullable()->constrained('skenario_pencarian')->onDelete('set null');
            $table->decimal('seqi', 5, 2)->nullable();
            $table->decimal('ues', 5, 2)->nullable();
        });
    }
    public function down(): void
    {
        Schema::table('evaluasi_search_engine', function (Blueprint $table) {
            $table->dropForeign(['skenario_pencarian_id']);
            $table->dropColumn(['skenario_pencarian_id', 'seqi', 'ues']);
        });
    }
}; 