<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecordResource;
use App\Models\Record;
use App\Services\RecordService;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function __construct(
        private readonly RecordService $recordService,
    )
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RecordResource::collection($this->recordService->getSortedRecordsByParams());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Record $record)
    {
        return new RecordResource($record);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Record $record)
    {
        return $record->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record)
    {
        //
    }

    public function favorites()
    {
        return RecordResource::collection($this->recordService->getSortedRecordsByStars());
    }
}
