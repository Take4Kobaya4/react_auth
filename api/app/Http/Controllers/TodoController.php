<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Todo::query();
        
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->input('search') . '%');
        }

        $todos = $query->latest()->get();

        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
        ]);

        $todo = $request->user()->todos()->create(
            $request->only('title', 'content')
        );
        return response()->json([
            'message' => 'Todo created successfully',
            'todo' => $todo
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return response()->json($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        Gate::authorize('update-todo', $todo);

        $request->validate([
            'title' => 'sometimes|string',
            'content' => 'nullable|string',
        ]);
        $todo->update($request->only('title', 'content'));
        return response()->json([
            'message' => 'Todo updated successfully',
            'todo' => $todo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        Gate::authorize('delete-todo', $todo);

        $todo->delete();
        return response()->json([
            'message' => 'Todo deleted successfully'
        ], 204);
    }
}
