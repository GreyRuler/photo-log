<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Seat;
use App\Repositories\HallRepository;
use App\Services\SeatService;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class SeatController extends Controller
{
    public function __construct(
        private readonly SeatService $seatService,
        private readonly HallRepository $hallRepository,
    )
    {
        $this->middleware('auth:sanctum')->except(['index', 'amount']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Hall $hall)
    {
        $countRow = $request->query('countRow');
        $countColumn = $request->query('countColumn');
        return $this->hallRepository->getSeats($hall, $countRow, $countColumn);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Hall $hall)
    {
        $data = $this->seatService->storeSeat($request->all(), $hall);

        return response($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hall $hall, Seat $seat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hall $hall, Seat $seat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hall $hall, Seat $seat)
    {
        $seat->delete();

        return response("", 204);
    }

    /**
     * Считает общую стоимость зрительских мест,
     * переданных в queryParams
     * @param Request $request
     * @param Hall $hall
     * @return Application|\Illuminate\Contracts\Foundation\Application|Response|ResponseFactory
     */
    public function amount(Request $request, Hall $hall)
    {
        $price = $this->seatService->amountSeat($request->all(), $hall);

        return response($price, 200);
    }
}
