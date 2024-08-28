<?php

namespace App\Services;

use App\Models\Record;
use Carbon\Carbon;

class RecordService
{
    public function getSortedRecordsByParams()
    {
        $now = Carbon::now();

        return Record::all()->map(function ($record) use ($now) {
            $innerCount = $record->photos->map(fn ($photo) => $photo->count)->sum();
            // Определяем приоритет
            if ($now->gt(Carbon::parse($record->timeEnd))) {
                if ($innerCount == 0) {
                    $priority = 1;
                } elseif ($innerCount < $record->count) {
                    $priority = 2;
                } elseif ($innerCount < $record->count * $record->k) {
                    $priority = 3;
                }
            } elseif ($now->gt(Carbon::parse($record->timeArrival)) && $now->lt(Carbon::parse($record->timeEnd))) {
                if ($innerCount == 0) {
                    $priority = 4;
                } elseif ($innerCount < $record->count) {
                    $priority = 5;
                } elseif ($innerCount < $record->count * $record->k) {
                    $priority = 6;
                }
            } else {
                $priority = 7; // Задачи на будущее
            }

            // Добавляем поле приоритета к записи
            $record->priority = $priority ?? 0;

            return $record;
        })->sortBy('priority')->values();
    }

    public function getSortedRecordsByStars()
    {
        return Record::where('stars', '>', 0)
            ->orderByDesc('stars')
            ->get();
    }
}
