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

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/images/{path}', function ($path) {
    return Storage::get(urldecode($path));
});

Route::get('/{path?}', function () {
    return view('root');
})->where('path', '.*');
