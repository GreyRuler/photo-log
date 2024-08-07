<?php

namespace App\Services;

use App\Http\Resources\TicketResource;
use App\Models\Schedule;
use App\Models\Ticket;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class TicketService
{
    public function validateTicket($uuid): bool
    {
        return !Ticket::where('qr_code', $uuid)->exists();
    }

    public function ticket(Request $request, $uuid, Schedule $schedule): array
    {
        $clientUrl = $request->header('Origin') . "/schedules/$schedule->id/tickets?uuid=$uuid";
        $qrCode = base64_encode(QrCode::format('png')->size(300)->generate($clientUrl));
        return [
            'ticket' => new TicketResource($schedule),
            'qrCode' => $qrCode,
        ];
    }

    public function validateTicketStore($places, Schedule $schedule): bool
    {
        return Ticket::where('schedule_id', $schedule->id)
            ->whereIn('seat_id', $places)->exists();
    }

    public function storeTicket($requestData, Schedule $schedule): ?string
    {
        $uuid = uuid_create();
        collect($requestData['places'])->each(function ($placeId) use ($uuid, $schedule) {
            Ticket::create([
                'schedule_id' => $schedule->id,
                'seat_id' => $placeId,
                'qr_code' => $uuid,
            ]);
        });
        return $uuid;
    }
}
