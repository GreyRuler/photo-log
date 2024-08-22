<?php

namespace App\Services;

use App\Models\Record;
use Illuminate\Support\Facades\Storage;

class PhotoService
{
    public function save(Record $record, $file, $increment)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = $record->id . '_' . $increment . '.' . $extension;
        $filePath = '/records' . $record->folder . '/' . $filename;
        return Storage::disk('local')->put($filePath, file_get_contents($file));
    }

    public function saveCommon($category, $file)
    {
        $extension = $file->getClientOriginalExtension();
        $filePath = "/common/" . $category . "/" . time() . "." . $extension;
        return Storage::disk('local')->put($filePath, file_get_contents($file));
    }
}
