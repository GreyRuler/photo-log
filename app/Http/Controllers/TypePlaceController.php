<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\TypePlace;
use App\Services\TypePlaceService;
use Illuminate\Http\Request;

class TypePlaceController extends Controller
{
    public function __construct(private readonly TypePlaceService $service)
    {
    }

    public function index(Hall $hall)
    {
        return $this->service->index($hall);
    }

    public function store(Request $request, Hall $hall)
    {
        $this->service->storeTypePlace($request->all(), $hall);

        return response('', 201);
    }

    public function show(Hall $hall, TypePlace $typePlace)
    {
        return $typePlace;
    }

    public function update(Request $request, Hall $hall, TypePlace $typePlace)
    {
        $typePlace->update($request->all());

        return $typePlace;
    }

    public function destroy(Hall $hall, TypePlace $typePlace)
    {
        $typePlace->delete();

        return response()->json();
    }
}
