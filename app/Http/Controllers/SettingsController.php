<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function index()
    {
        return response()->json([
            'event_name' => Setting::getEventName(),
            'event_location' => Setting::getEventLocation(),
            'sheet_api' => Setting::getSheetApi(),
        ]);
    }

    public function update(Request $request)
    {
        Setting::setEventName($request->input('event_name'));
        Setting::setEventLocation($request->input('event_location'));
        return response('Настройки обновлены', 201);
    }
}