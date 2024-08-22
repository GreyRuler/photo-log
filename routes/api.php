<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\RecordController;
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
    Route::post('/records/{record}/photo', [RecordController::class, 'photo']);
    Route::apiResource('records', RecordController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('notifications', NotificationController::class);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/photos/upload', [PhotoController::class, 'upload']);
    Route::get('/photos', [PhotoController::class, 'all']);
    Route::get('/photos/category', [PhotoController::class, 'allByCategory']);
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::post('/settings/update', [SettingsController::class, 'update']);
});

Route::post('/login', [AuthController::class, 'login']);
