<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\CategoryPhoto;
use App\Services\CategoryPhotoService;
use App\Services\RecordPhotoService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryPhotoController extends Controller
{
    public function __construct(
        private readonly CategoryPhotoService $photoService,
    )
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Category $category)
    {
        return $category->photos()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Category $category)
    {
        return $this->photoService->create($request, $category);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category, CategoryPhoto $categoryPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category, CategoryPhoto $categoryPhoto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, CategoryPhoto $photo)
    {
        return $this->photoService->delete($photo);
    }
}
