<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Services\SheetService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class SheetController extends Controller
{
    public function __construct(private readonly SheetService $sheetService)
    {
    }

    public function collect(Request $request): JsonResponse
    {
        $sheet_api = $request->input('sheet_api');
        Setting::setSheetApi($sheet_api);
        $response = Http::withOptions(['verify' => false])->get($sheet_api, [
            'offset' => 1,
            'cast_numbers' => 'count,k,innerCount'
        ]);

        if ($response->successful()) {
            $data = $response->json();
            // Обработка данных и их сохранение через сервис
            $processedData = $this->sheetService->structureData(collect($data));
            $this->sheetService->saveDataToJson($processedData['data']);
            $this->sheetService->updateOrCreateRecords($processedData['records']);
            return response()->json(['message' => 'Data processed and saved successfully']);
        } else {
            return response()->json(['status' => 'error', 'message' => $response->reason()], 500);
        }
    }

    public function data()
    {
        return response()->json(Storage::disk('local')->json('data.json'));
    }
}
