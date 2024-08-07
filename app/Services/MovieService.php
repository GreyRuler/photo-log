<?php

namespace App\Services;

use App\Models\Schedule;

class MovieService
{
    public function moviesForInterval($from, $to): array
    {
        $schedules = Schedule::whereBetween('time', [$from, $to])->get();
        $movies = $schedules->unique(function (Schedule $schedule) {
            return $schedule->movie_id;
        })->reduce(function ($carry, Schedule $schedule) {
            $carry[$schedule->movie_id] = [
                ...$schedule->movie->toArray(),
                'halls' => [],
            ];
            return $carry;
        }, []);
        $moviesWithHalls = $schedules->reduce(function ($carry, Schedule $schedule) {
            $carry[$schedule->movie_id]['halls'][$schedule->hall_id] = [
                ...$schedule->hall->toArray(),
                'movieId' => $schedule->movie_id,
                'times' => [],
            ];
            return $carry;
        }, $movies);
        return $schedules->reduce(function ($carry, Schedule $schedule) {
            $carry[$schedule->movie_id]['halls'][$schedule->hall_id]['times'][$schedule->id] = $schedule->time;
            return $carry;
        }, $moviesWithHalls);
    }
}
