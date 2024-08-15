<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use DateTime;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Notification::orderBy('id', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $date = new DateTime();
        return Notification::create([
            ...$request->all(),
            'date' => $date->format('d.m.Y H:i'),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        return $notification;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        return $notification->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        return $notification->delete();
    }
}
