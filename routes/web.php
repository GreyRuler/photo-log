<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use App\Http\Controllers\FileController;
use Illuminate\Support\Facades\Route;

Route::get('/download/{path}', [FileController::class, 'download']);
Route::get('/zip', [FileController::class, 'zip']);
Route::get('/images/{path}', [FileController::class, 'image']);

Route::get('/{path?}', function () {
    return view('root');
})->where('path', '.*');
