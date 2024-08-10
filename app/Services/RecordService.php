<?php

namespace App\Services;

use App\Models\Record;

class RecordService
{
    public function update(Record $record, $path, $increment, $count)
    {
        return $record->update([
            'innerCount' => $record->innerCount + $count,
            'images' => [
                ...$record->images,
                [
                    'path' => $path,
                    'count' => $count,
                    'increment' => $increment,
                ]
            ]
        ]);
    }

    public function increment(Record $record)
    {
        $lastImage = collect($record->images)->last();
        return $lastImage ? ++$lastImage['increment'] : 1;
    }
}
