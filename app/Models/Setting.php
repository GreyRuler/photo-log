<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];
    public $timestamps = false;

    public static function getValue($key) {
        return static::where('key', $key)->value('value');
    }

    public static function setValue($key, $value) {
        return static::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }

    /**
     * Геттер для event_name.
     *
     * @return mixed
     */
    public static function getEventName() {
        return self::getValue('event_name');
    }

    /**
     * Сеттер для event_name.
     *
     * @param string $value
     * @return bool
     */
    public static function setEventName($value) {
        return self::setValue('event_name', $value);
    }

    /**
     * Геттер для event_location.
     *
     * @return mixed
     */
    public static function getEventLocation() {
        return self::getValue('event_location');
    }

    /**
     * Сеттер для event_location.
     *
     * @param string $value
     * @return bool
     */
    public static function setEventLocation($value) {
        return self::setValue('event_location', $value);
    }

    /**
     * Геттер для sheet_api.
     *
     * @return mixed
     */
    public static function getSheetApi() {
        return self::getValue('sheet_api');
    }

    /**
     * Сеттер для sheet_api.
     *
     * @param string $value
     * @return bool
     */
    public static function setSheetApi($value) {
        return self::setValue('sheet_api', $value);
    }

    /**
     * Геттер для main_url.
     *
     * @return mixed
     */
    public static function getMainUrl() {
        return self::getValue('main_url');
    }

    /**
     * Сеттер для main_url.
     *
     * @param string $value
     * @return bool
     */
    public static function setMainUrl($value) {
        return self::setValue('main_url', $value);
    }
}
