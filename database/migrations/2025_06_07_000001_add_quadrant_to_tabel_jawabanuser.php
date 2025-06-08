<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('tabel_jawabanuser', function (Blueprint $table) {
            $table->string('quadrant', 10)->nullable()->after('skor_bakat');
        });
    }
    public function down(): void
    {
        Schema::table('tabel_jawabanuser', function (Blueprint $table) {
            $table->dropColumn('quadrant');
        });
    }
};
