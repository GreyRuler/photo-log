<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TypePlaceController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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


Route::get('images/{name}', function ($name) {
    return Storage::get("images/$name");
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [function () {
        return User::all();
    }]);
    Route::apiResource('halls', HallController::class);
    Route::post('/toggle-sale', [HallController::class, 'toggleSale']);
    Route::apiResource('halls.typePlaces', TypePlaceController::class);
    Route::apiResource('movies', MovieController::class);
    Route::get('/schedules/range', [ScheduleController::class, 'range']);
});

Route::apiResource('halls.seats', SeatController::class);
Route::apiResource('schedules', ScheduleController::class);
Route::get('/movies-for-interval', [MovieController::class, 'moviesForInterval']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/halls/{hall}/amount', [SeatController::class, 'amount']);
Route::apiResource('schedules.tickets', TicketController::class);
