<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ConsultationController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(PatientController::class)->prefix('patient')->group(function() {
    Route::post('/retrieve', 'retrieve');
    Route::get('/index', 'index');
    Route::get('/show/{id}', 'show');
    Route::post('/store', 'store');
    Route::put('/update/{patient}', 'update');
    Route::post('/delete', 'delete');
    Route::get('/archive', 'archive');
});



Route::prefix('consultation')->controller(ConsultationController::class)->group(function() {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::get('/show/{id}', 'show');
});