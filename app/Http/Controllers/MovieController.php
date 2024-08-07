<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SaveFile;
use App\Models\Movie;
use App\Models\Schedule;
use App\Models\Ticket;
use App\Services\MovieService;
use Illuminate\Http\Request;
use Ramsey\Collection\Collection;

class MovieController extends Controller
{
    public function __construct(private readonly MovieService $movieService)
    {
        $this->middleware([
            SaveFile::class,
        ])->only('store', 'update');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Movie::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $movie = Movie::create($request->all());

        return response($movie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movie $movie)
    {
        return $movie;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Movie $movie)
    {
        $movie->update($request->all());

        return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movie $movie)
    {
        $movie->schedules()->each(fn(Schedule $schedule) => $schedule->delete());
        $movie->delete();

        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function moviesForInterval(Request $request)
    {
        $from = $request->query('from');
        $to = $request->query('to');

        $data = $this->movieService->moviesForInterval($from, $to);

        return response($data);
    }
}
