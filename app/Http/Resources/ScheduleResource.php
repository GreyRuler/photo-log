<?php

namespace App\Http\Resources;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'time' => $this->time,
            'hall' => $this->hall,
            'movie' => $this->movie,
            'takenPlaces' => $this->tickets->map(function (Ticket $ticket) {
                return $ticket->seat->id;
            }),
        ];
    }
}
