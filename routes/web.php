<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\ExaminationController;

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

Route::get('/', function () {
    return view('welcome');
});

Route::get('{path}', function () {
    return view('welcome');
})->where('path', '.+');

Route::post('/login', [AuthController::class, 'login']);

Route::prefix('consultation')->controller(ConsultationController::class)->group(function() {
    Route::get('/', 'index');
    Route::post('/store', 'store');
});

Route::prefix('examination')->controller(ExaminationController::class)->group(function() {
    Route::get('/', 'index');
});