<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecordPhotoResource;
use App\Models\Record;
use App\Models\RecordPhoto;
use App\Services\RecordPhotoService;
use Illuminate\Http\Request;

class RecordPhotoController extends Controller
{
    public function __construct(
        private readonly RecordPhotoService $photoService,
    )
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function all(Request $request)
    {
        $dateFrom = $request->query('dateFrom');
        $dateTo = $request->query('dateTo');
        $photos = RecordPhoto::query()
            ->when($dateFrom, function ($query, $dateFrom) {
                return $query->where('created_at', '>=', $dateFrom);
            })
            ->when($dateTo, function ($query, $dateTo) {
                return $query->where('created_at', '<=', $dateTo);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return RecordPhotoResource::collection($photos);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Record $record)
    {
        return RecordPhotoResource::collection($record->photos()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Record $record)
    {
        return $this->photoService->create($request, $record);
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record, RecordPhoto $photo)
    {
        return $photo;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record, RecordPhoto $photo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record, RecordPhoto $photo)
    {
        return $this->photoService->delete($photo);
    }
}
