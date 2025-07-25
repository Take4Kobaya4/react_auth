<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Todo extends Model
{
    protected $table = 'todos';

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'is_completed',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
