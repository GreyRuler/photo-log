<?php

namespace App\Http\Resources;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TicketResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $uuid = $request->query('uuid');
        $tickets = Ticket::where('qr_code', $uuid)->get();
        return [
            'id' => $this->id,
            'time' => $this->time,
            'hall' => $this->hall,
            'movie' => $this->movie,
            'seats' => $tickets->map(function (Ticket $ticket) {
                return $ticket->seat->number;
            }),
        ];
    }
}
