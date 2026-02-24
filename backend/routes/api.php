<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    
    Route::get('/users/{id}', [AuthController::class, 'show']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::get('/transactions', [TransactionController::class, 'index']);
});

Route::get('/test', function () {
    return response()->json(['message' => 'API работает!']);
});