<?php

namespace App\Http\Controllers;

use App\Services\SheetService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SheetController extends Controller
{
    private string $apiSheetURL = "https://sheetdb.io/api/v1/";

    public function __construct(private readonly SheetService $sheetService)
    {
    }

    public function collect(Request $request): JsonResponse
    {
        $url = $request->input('url');
        $response = Http::withOptions(['verify' => false])->get($this->apiSheetURL . $url, [
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
}
