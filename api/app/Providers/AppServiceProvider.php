<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Gate;
use App\Models\Todo;
use App\Models\User;

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
        Gate::define('update-todo', function (User $user, Todo $todo) {
            return $user->id === $todo->user_id;
        });

        Gate::define('delete-todo', function (User $user, Todo $todo) {
            return $user->id === $todo->user_id;
        });
    }
}
