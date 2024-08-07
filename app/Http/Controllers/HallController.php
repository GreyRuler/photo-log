<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Services\HallService;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HallController extends Controller
{
    public function __construct(private readonly HallService $hallService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Hall::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $hall = Hall::create($request->all());

        return response($hall, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hall $hall)
    {
        return $hall;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hall $hall)
    {
        $hall->update($request->all());

        return $hall;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hall $hall)
    {
        $hall->delete();

        return response("", 204);
    }

    public function toggleSale(): Application|Response|\Illuminate\Contracts\Foundation\Application|ResponseFactory
    {
        $halls = Hall::all();

        $this->hallService->toggleSale($halls);

        return response($halls);
    }
}
