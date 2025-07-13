<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('perguruan_tinggi', function (Blueprint $table) {
            $table->string('url_website')->nullable();
            $table->string('jenis_search_engine')->nullable();
        });
    }
    public function down(): void
    {
        Schema::table('perguruan_tinggi', function (Blueprint $table) {
            $table->dropColumn(['url_website', 'jenis_search_engine']);
        });
    }
}; 