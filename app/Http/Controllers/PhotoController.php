<?php

namespace App\Http\Controllers;

use App\Models\Setting;
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
        $file = $request->file('file')[0];
        $extension = $file->getClientOriginalExtension();
        $filePath = "/common/" .  time() . "." . $extension;
        return Storage::put($filePath, file_get_contents($file));
//        try {
//            $category = $request->input('category');
//            $location = Setting::getEventLocation();
//            $file = $request->file('file')[0];
//            $extension = $file->getClientOriginalExtension();
//            $filePath = "/common/" . $category . "/" . time() . "." . $extension;
//            Storage::disk('local')->put($filePath, file_get_contents($file));
//            $path = Storage::disk('local')->path($filePath);
//            $date = $this->photoService->dateFromMetadata($path);
//            $this->photoService->annotateImage($path, $date, $location);
//            return "Фото загружено";
//        } catch (Exception $e) {
//            return $e;
//        }
    }
}
