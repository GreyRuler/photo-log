<?php

namespace App\Services;

use App\Models\Category;
use App\Models\CategoryPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryPhotoService
{
    public function create(Request $request, Category $category) {
        $files = $request->file('files');

        foreach ($files as $file) {
            $path = $this->save($category->name, $file);
            CategoryPhoto::create([
                'path' => $path,
                'category_id' => $category->id
            ]);
        }

        return true;
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
