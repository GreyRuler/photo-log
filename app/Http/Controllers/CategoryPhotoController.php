<?php

namespace App\Http\Controllers;

use App\Http\Middleware\ConvertDateMiddleware;
use App\Http\Resources\CategoryPhotoResource;
use App\Models\Category;
use App\Models\CategoryPhoto;
use App\Services\CategoryPhotoService;
use Illuminate\Http\Request;

class CategoryPhotoController extends Controller
{
    public function __construct(
        private readonly CategoryPhotoService $photoService,
    )
    {
        $this->middleware(ConvertDateMiddleware::class);
    }

    /**
     * Display a listing of the resource.
     */
    public function all(Request $request)
    {
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');
        $photos = CategoryPhoto::query()
            ->when($dateFrom, function ($query, $dateFrom) {
                return $query->where('created_at', '>=', $dateFrom);
            })
            ->when($dateTo, function ($query, $dateTo) {
                return $query->where('created_at', '<=', $dateTo);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return CategoryPhotoResource::collection($photos);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Category $category)
    {
        return CategoryPhotoResource::collection($category->photos()->get());
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
