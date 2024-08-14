<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecordResource;
use App\Models\Record;
use App\Services\PhotoService;
use App\Services\RecordService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        return response()->json(Storage::json('data.json'));
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
        //
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
        $file = $request->file('file')[0];
        $increment = $this->recordService->increment($record);

        $path = $this->photoService->save($record, $file, $increment);
        $date = $this->photoService->dateFromMetadata($path);
        $location = $record->location;
        $this->photoService->annotateImage($path, $date, $location);
        $this->recordService->update($record, $path, $increment, $count);
        return $record;
    }
}
