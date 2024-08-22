<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecordResource;
use App\Models\Record;
use App\Services\PhotoService;
use App\Services\RecordService;
use Illuminate\Http\Request;

class RecordController extends Controller
{
    public function __construct(
        private readonly PhotoService $photoService,
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

    public function photo(Request $request, Record $record)
    {
        $count = $request->input('count');
        $file = $request->file('file');
        $increment = $this->recordService->increment($record);

        $path = $this->photoService->save($record, $file, $increment);
        $this->recordService->update($record, $path, $increment, $count);
        return $record;
    }

    public function favorites()
    {
        return RecordResource::collection($this->recordService->getSortedRecordsByStars());
    }
}
