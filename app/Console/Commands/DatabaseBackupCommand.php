<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class DatabaseBackupCommand extends Command
{
    protected $signature = 'db:backup';
    protected $description = 'Backup database ke storage';
    public function handle()
    {
        $filename = 'backup_' . now()->format('Ymd_His') . '.sql';
        $command = sprintf(
            'mysqldump -u%s -p%s %s > %s',
            env('DB_USERNAME'),
            env('DB_PASSWORD'),
            env('DB_DATABASE'),
            storage_path('app/' . $filename)
        );
        exec($command);
        $this->info('Backup selesai: ' . $filename);
    }
} 