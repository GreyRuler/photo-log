<?php

namespace App\Providers;

use App\Http\Resources\CategoryPhotoResource;
use App\Http\Resources\RecordPhotoResource;
use App\Http\Resources\RecordResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RecordResource::withoutWrapping();
        UserResource::withoutWrapping();
        RecordPhotoResource::withoutWrapping();
        CategoryPhotoResource::withoutWrapping();
    }
}
