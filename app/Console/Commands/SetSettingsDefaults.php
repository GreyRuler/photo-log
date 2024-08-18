<?php

namespace App\Console\Commands;

use Database\Seeders\SettingsSeeder;
use Illuminate\Console\Command;

class SetSettingsDefaults extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'settings:defaults';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Команда устанавливает настройки по умолчанию для приложения';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $seeder = new SettingsSeeder();
        $seeder->run();
        $this->info('Default settings have been seeded successfully');
    }
}
