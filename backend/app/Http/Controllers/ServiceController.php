<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    // GET /api/services 
    public function index(Request $request)
    {
        $query = Service::with(['user', 'category'])->where('is_active', true);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        return response()->json($query->paginate(15));
    }

    // GET /api/services/{id}
    public function show($id)
    {
        $service = Service::with(['user', 'category'])->findOrFail($id);
        return response()->json($service);
    }

    // POST /api/services (Создание)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|integer|min:1',
            'category_id' => 'required|exists:categories,id',
        ]);

        $service = auth()->user()->services()->create($request->all());

        return response()->json($service, 201);
    }

    // PUT /api/services/{id}
    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        if ($service->user_id !== auth()->id()) {
            return response()->json(['message' => 'Недостаточно прав'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'price' => 'sometimes|integer|min:1'
        ]);

        $service->update($request->all());
        return response()->json($service);
    }

    // DELETE /api/services/{id}
    public function destroy($id)
    {
        $service = Service::findOrFail($id);

        if ($service->user_id !== auth()->id()) {
            return response()->json(['message' => 'Недостаточно прав'], 403);
        }

        $service->delete();
        return response()->json(['message' => 'Удалено']);
    }
}