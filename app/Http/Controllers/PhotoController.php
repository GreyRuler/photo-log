<?php

namespace App\Http\Controllers;

use App\Services\PhotoService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function __construct(
        private readonly PhotoService $photoService,
    )
    {
    }

    public function all() {
        return Storage::allDirectories('common');
    }

    public function allByCategory(Request $request) {
        $category = $request->query('category');
        return Storage::allFiles('common/' . $category);
    }

    public function upload(Request $request) {
        try {
            $category = $request->input('category');
            $file = $request->file('file');
            $this->photoService->saveCommon($category, $file);
            return "Фото загружено";
        } catch (Exception $e) {
            return $e;
        }
    }
}
