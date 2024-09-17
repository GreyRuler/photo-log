<?php

namespace App\Http\Controllers;

use App\Models\Record;
use App\Models\RecordPhoto;
use App\Models\Section;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        return response()->json([
            'event_name' => Setting::getEventName(),
            'event_location' => Setting::getEventLocation(),
            'sheet_api' => Setting::getSheetApi(),
            'main_url' => Setting::getMainUrl(),
        ]);
    }

    public function update(Request $request)
    {
        Setting::setEventName($request->input('event_name'));
        Setting::setEventLocation($request->input('event_location'));
        Setting::setMainUrl($request->input('main_url'));
        return response('Настройки обновлены', 201);
    }

    public function truncateRecords()
    {
        try {
            Section::truncate();
            RecordPhoto::truncate();
            Record::truncate();
            Storage::deleteDirectory('records');
            return response()->json([
                'message' => 'Таблицы успешно очищены, директория "records" удалена.',
                'status' => 'success'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Произошла ошибка при очистке данных: ' . $e->getMessage(),
                'status' => 'error'
            ], 500);
        }
    }
}
