<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    // GET /api/categories
    public function index()
    {
        return response()->json(Category::all());
    }
}