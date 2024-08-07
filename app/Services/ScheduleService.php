<?php

namespace App\Services;

use App\Models\Schedule;

class ScheduleService
{
    public function index($halls): array
    {
        $hallsRaw = $halls->reduce(function ($carry, $item) {
            $carry[$item->id] = [
                'name' => $item->name,
                'data' => [],
            ];
            return $carry;
        }, []);
        return Schedule::all()->reduce(function ($carry, $item) {
            $carry[$item->hall->id]['data'][$item->id] = [
                'name' => $item->movie->name,
                'startDate' => $item->time,
                'duration' => $item->movie->duration,
                'color' => $item->movie->color,
            ];
            return $carry;
        }, $hallsRaw);
    }

    public function validateScheduleCreation($hall, $startTime, $endTime)
    {
        $times = $hall->schedules->map(fn(Schedule $schedule) => [
            'startTime' => $schedule->time,
            'endTime' => $schedule->time + ($schedule->movie->duration * 60 * 1000),
        ]);

        return $times->first(fn($item) => (
            ($startTime > $item['startTime'] && $startTime < $item['endTime']) ||
            ($endTime > $item['startTime'] && $endTime < $item['endTime']) ||
            ($startTime > $item['startTime'] && $endTime < $item['endTime']) ||
            ($startTime < $item['startTime'] && $endTime > $item['endTime'])
        ));
    }

    public function storeSchedule($requestData): array
    {
        $schedule = Schedule::create($requestData);

        return [
            'id' => $schedule->id,
            'name' => $schedule->movie->name,
            'startDate' => (int)$schedule->time,
            'hall_id' => $schedule->hall_id,
            'duration' => $schedule->movie->duration,
            'color' => $schedule->movie->color,
        ];
    }

    public function deleteSchedule(Schedule $schedule): array
    {
        $schedule->delete();
        return [
            'id' => $schedule->id,
            'hall_id' => $schedule->hall_id,
        ];
    }

    public function range(): array
    {
        $dateMin = Schedule::min('time');
        $dateMax = Schedule::all()->map(
            fn(Schedule $schedule) => $schedule->time + $schedule->movie->duration * 60 * 1000
        )->max();
        return [
            'dateMin' => $dateMin,
            'dateMax' => $dateMax,
        ];
    }
}
