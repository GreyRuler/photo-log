<?php

namespace App\Repositories;

use Illuminate\Support\Collection;

class HallRepository
{
    public function getSeats($hall, $countRow, $countColumn)
    {
        $seats = $hall->seats()->get();

        if ($hall->countRow == $countRow && $hall->countColumn == $countColumn) {
            return $seats->reduce(function ($carry, $seat) {
                $carry[$seat->row][$seat->column] = $seat;
                return $carry;
            }, []);
        }

        return $this->defaultScheme($hall, $countRow, $countColumn);
    }

    public function defaultScheme($hall, $countRow, $countColumn): Collection
    {
        return collect(range(0, $countRow - 1))->map(function ($item, $row) use ($countColumn, $hall) {
            return collect(range(0, $countColumn - 1))->map(function ($item, $column) use ($countColumn, $row, $hall) {
                return [
                    'row' => $row,
                    'column' => $column,
                    'type_place' => 'disabled',
                    'hall_id' => $hall->id,
                    'number' => $row * $countColumn + ($column + 1)
                ];
            });
        });
    }
}
