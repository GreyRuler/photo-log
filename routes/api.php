<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryPhotoController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\RecordPhotoController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SheetController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('users', UserController::class);
    Route::post('/sheet/collect', [SheetController::class, 'collect']);
    Route::get('/sheet/data', [SheetController::class, 'data']);
    Route::get('/records/favorites', [RecordController::class, 'favorites']);
    Route::get('/records/photos', [RecordPhotoController::class, 'all']);
    Route::apiResource('records', RecordController::class);
    Route::apiResource('records.photos', RecordPhotoController::class);
    Route::get('/categories/photos', [CategoryPhotoController::class, 'all']);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('categories.photos', CategoryPhotoController::class);
    Route::apiResource('notifications', NotificationController::class);
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::post('/settings/update', [SettingsController::class, 'update']);
    Route::post('/settings/truncate-records', [SettingsController::class, 'truncateRecords']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/login', [AuthController::class, 'login']);
