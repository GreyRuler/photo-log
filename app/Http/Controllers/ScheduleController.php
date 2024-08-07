<?php

namespace App\Http\Controllers;

use App\Http\Resources\ScheduleResource;
use App\Models\Hall;
use App\Models\Movie;
use App\Models\Schedule;
use App\Services\ScheduleService;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ScheduleController extends Controller
{
    public function __construct(private readonly ScheduleService $scheduleService)
    {
        $this->middleware('auth:sanctum')->except('show');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): array
    {
        $halls = Hall::all();

        return $this->scheduleService->index($halls);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $startTime = $request->input('time');
        $movieDuration = Movie::find($request->get('movie_id'))->duration * 60 * 1000;
        $endTime = $request->input('time') + $movieDuration;
        $hall = Hall::find($request->input('hall_id'));

        $range = $this->scheduleService->validateScheduleCreation($hall, $startTime, $endTime);

        if ($range) {
            return response($range, 422);
        }

        $data = $this->scheduleService->storeSchedule($request->all());

        return response($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        return new ScheduleResource($schedule);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        $schedule->update($request->all());

        return $schedule;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $data = $this->scheduleService->deleteSchedule($schedule);

        return response($data);
    }

    /**
     * Return dateMin, dateMax for schedule
     * @return Application|ResponseFactory|\Illuminate\Foundation\Application|Response
     */
    public function range()
    {
        $range = $this->scheduleService->range();

        return response($range);
    }
}
