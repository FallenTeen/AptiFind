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
        Schema::create('interaksi_search_engine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('perguruan_tinggi_id')->constrained('perguruan_tinggi')->onDelete('cascade');
            
            // Data session
            $table->string('session_id');
            $table->timestamp('waktu_mulai');
            $table->timestamp('waktu_selesai')->nullable();
            $table->integer('durasi_detik')->nullable();
            
            // Tracking interaksi
            $table->integer('jumlah_klik')->default(0);
            $table->integer('jumlah_halaman_dikunjungi')->default(0);
            $table->integer('jumlah_pencarian')->default(0);
            $table->text('halaman_dikunjungi')->nullable(); // JSON array
            $table->text('kata_kunci_pencarian')->nullable(); // JSON array
            
            // Device info
            $table->string('browser')->nullable();
            $table->string('device_type')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            
            // Status
            $table->enum('status', ['aktif', 'selesai', 'timeout'])->default('aktif');
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'waktu_mulai'], 'interaksi_user_time_idx');
            $table->index(['perguruan_tinggi_id', 'status'], 'interaksi_pt_status_idx');
            $table->index('session_id', 'interaksi_session_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interaksi_search_engine');
    }
};
