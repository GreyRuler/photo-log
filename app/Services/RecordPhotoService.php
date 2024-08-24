<?php

namespace App\Services;

use App\Models\Record;
use App\Models\RecordPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RecordPhotoService
{
    public function create(Request $request, Record $record) {
        $increment = $record->photos()->max('increment') + 1 ?? 1;
        $count = $request->input('count');
        $file = $request->file('file');

        $path = $this->save($record, $file, $increment);
        return RecordPhoto::create([
            'path' => $path,
            'increment' => $increment,
            'count' => $count,
            'record_id' => $record->id
        ]);
    }

    public function save(Record $record, $file, $increment)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = $record->id . '_' . $increment . '.' . $extension;
        $filePath = '/records' . $record->folder . '/' . $filename;
        Storage::disk('local')->put($filePath, file_get_contents($file));
        return $filePath;
    }

    public function delete(RecordPhoto $photo)
    {
        Storage::delete($photo->path);
        return $photo->delete();
    }
}
