<?php

namespace App\Http\Controllers;

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
    public function index(Record $record)
    {
        return $record->photos()->get();
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
