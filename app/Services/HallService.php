<?php

namespace App\Services;

use App\Models\Hall;
use Illuminate\Database\Eloquent\Collection;

class HallService
{
    public function toggleSale(Collection $halls): Collection
    {
        if (!$halls->count()) {
            return response('Нет залов', 422);
        }

        $isConfiguration = $halls->every(
            fn(Hall $hall) => $hall->countRow && $hall->typePlaces()->get()->count() >= 2
        );
        if (!$isConfiguration) {
            return response('Залы не сконфигурированы', 422);
        }

        $halls->each(fn(Hall $hall) => $hall->update(['active' => !$hall->active]));

        return $halls;
    }
}
