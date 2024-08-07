<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use App\Models\Ticket;
use App\Services\TicketService;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function __construct(private readonly TicketService $ticketService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Schedule $schedule)
    {
        $uuid = $request->query('uuid');
        $isExist = $this->ticketService->validateTicket($uuid);
        if ($isExist) {
            return response('', 404);
        }

        $ticket = $this->ticketService->ticket($request, $uuid, $schedule);
        return response()->json($ticket);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Schedule $schedule)
    {
        $places = $request->get('places');
        $existsTickets = $this->ticketService->validateTicketStore($places, $schedule);
        if ($existsTickets) {
            return response('Выбранные Вами места уже забронированы', 422);
        }

        $uuid = $this->ticketService->storeTicket($request->all(), $schedule);

        return response()->json([
            'uuid' => $uuid
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule, Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule, Ticket $ticket)
    {
        //
    }
}
