<?php

namespace App\Services;

use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Collection;

class SeatService
{
    public function storeSeat($requestData, Hall $hall): Collection
    {
        $hall->seats()->each(fn($seat) => $seat->delete());
        $hall->update($requestData);
        collect($requestData['scheme'])->each(fn($row) => collect($row)->each(
            fn($column) => Seat::create($column)
        ));

        return Hall::all();
    }

    public function amountSeat($requestData, Hall $hall)
    {
        $places = $hall->seats()->whereIn('number', $requestData['places'])->get();
        return $places->map(fn(Seat $seat) => (
        $seat->hall->typePlaces->firstWhere('name', $seat->type_place)->price
        ))->sum();
    }
}
