<?php

namespace App\Services;

use App\Models\Record;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class RecordService
{
    public function getSortedRecordsByParams(Collection $records)
    {
        $now = Carbon::now();

        return $records->map(function ($record) use ($now) {
            $innerCount = $record->photos->map(fn ($photo) => $photo->count)->sum();
            try {
                $record->innerCount = $innerCount / ($record->count * $record->k) * 100;
            } catch (\Throwable $th) {
                $record->innerCount = 0;
            }

            // Определяем приоритет
            if ($innerCount >= ($record->count * $record->k)) {
                // приоритет зеленый - Задача закрыта
                $record->priority = 4;
                $record->innerCount = 100;
            } elseif ($now->gt(Carbon::parse($record->timeEnd))) {
                // приоритет красный - Задача просроченна
                $record->priority = 3;
            } elseif ($now->gt(Carbon::parse($record->timeArrival)) && $now->lt(Carbon::parse($record->timeEnd))) {
                // приоритет желтый - Текущая задача
                $record->priority = 2;
            } elseif ($now->lt(Carbon::parse($record->timeArrival))) {
                // приоритет голубой - Задача на будущее
                $record->priority = 1;
            } else {
                $record->priority = 0;
            }

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
