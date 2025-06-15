<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('todos', TodoController::class);
});

// 認証チェックの際、ユーザー情報を取得するためのルート
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});