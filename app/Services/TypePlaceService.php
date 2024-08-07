<?php

namespace App\Services;

use App\Models\Hall;
use App\Models\TypePlace;

class TypePlaceService
{
    public function index(Hall $hall)
    {
        $data = $hall->typePlaces()->get()->reduce(function ($carry, $typePlace) {
            $carry[$typePlace->name] = $typePlace->price;
            return $carry;
        }, []);
        if (count($data)) return $data;
        return [
            'standard' => null,
            'vip' => null,
        ];
    }

    public function storeTypePlace($requestData, Hall $hall): void
    {
        TypePlace::updateOrCreate(
            ['name' => 'standard', 'hall_id' => $hall->id],
            ['price' => $requestData['standard']]
        );
        TypePlace::updateOrCreate(
            ['name' => 'vip', 'hall_id' => $hall->id],
            ['price' => $requestData['vip']]
        );
    }
}
