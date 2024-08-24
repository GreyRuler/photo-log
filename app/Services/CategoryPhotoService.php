<?php

namespace App\Services;

use App\Models\Category;
use App\Models\CategoryPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CategoryPhotoService
{
    public function create(Request $request, Category $category) {
        $file = $request->file('file');
        Log::info('record');
        Log::info($file);

        $path = $this->save($category->name, $file);
        return CategoryPhoto::create([
            'path' => $path,
            'category_id' => $category->id
        ]);
    }

    public function save($category, $file)
    {
        $extension = $file->getClientOriginalExtension();
        $filePath = "/common/" . $category . "/" . time() . "." . $extension;
        Storage::put($filePath, file_get_contents($file));
        return $filePath;
    }

    public function delete(CategoryPhoto $photo)
    {
        Storage::delete($photo->path);
        return $photo->delete();
    }
}
