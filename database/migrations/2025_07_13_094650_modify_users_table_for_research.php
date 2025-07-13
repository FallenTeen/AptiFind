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
        Schema::table('users', function (Blueprint $table) {
            // Relasi dengan perguruan tinggi dan program studi
            $table->foreignId('perguruan_tinggi_id')->nullable()->constrained('perguruan_tinggi')->onDelete('set null');
            $table->foreignId('program_studi_id')->nullable()->constrained('program_studi')->onDelete('set null');
            
            // Data tambahan untuk penelitian
            $table->enum('status', ['calon_mahasiswa', 'mahasiswa_aktif'])->default('calon_mahasiswa');
            $table->string('nim')->nullable()->comment('Nomor Induk Mahasiswa');
            $table->string('asal_sekolah')->nullable()->comment('SMA/SMK asal untuk calon mahasiswa');
            $table->string('jurusan_sekolah')->nullable()->comment('Jurusan di SMA/SMK');
            $table->integer('tahun_lulus_sekolah')->nullable();
            $table->decimal('nilai_un', 4, 2)->nullable()->comment('Nilai Ujian Nasional');
            $table->decimal('nilai_rapor', 4, 2)->nullable()->comment('Nilai rata-rata rapor');
            $table->string('angkatan')->nullable();
            
            // Data demografis
            $table->enum('jenis_kelamin', ['laki_laki', 'perempuan'])->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->text('alamat')->nullable();
            $table->string('kota')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kode_pos', 10)->nullable();
            $table->string('no_hp')->nullable();
            
            // Data penelitian
            $table->boolean('sudah_tes_minat_bakat')->default(false);
            $table->timestamp('waktu_tes_minat_bakat')->nullable();
            $table->integer('total_evaluasi_search_engine')->default(0);
            $table->timestamp('waktu_evaluasi_terakhir')->nullable();
            
            // Indexes
            $table->index(['status', 'perguruan_tinggi_id']);
            $table->index(['sudah_tes_minat_bakat', 'status']);
            $table->index('nim');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['perguruan_tinggi_id']);
            $table->dropForeign(['program_studi_id']);
            $table->dropIndex(['status', 'perguruan_tinggi_id']);
            $table->dropIndex(['sudah_tes_minat_bakat', 'status']);
            $table->dropIndex(['nim']);
            
            $table->dropColumn([
                'perguruan_tinggi_id',
                'program_studi_id',
                'status',
                'nim',
                'asal_sekolah',
                'jurusan_sekolah',
                'tahun_lulus_sekolah',
                'nilai_un',
                'nilai_rapor',
                'jenis_kelamin',
                'tanggal_lahir',
                'tempat_lahir',
                'alamat',
                'kota',
                'provinsi',
                'kode_pos',
                'no_hp',
                'sudah_tes_minat_bakat',
                'waktu_tes_minat_bakat',
                'total_evaluasi_search_engine',
                'waktu_evaluasi_terakhir',
                'angkatan'
            ]);
        });
    }
};
