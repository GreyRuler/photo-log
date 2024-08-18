<?php

namespace App\Services;

use App\Models\Record;
use DateTime;
use Illuminate\Support\Facades\Storage;
use Imagick;
use ImagickDraw;
use ImagickException;
use ImagickPixel;
use IntlDateFormatter;

class PhotoService
{
    public function save(Record $record, $file, $increment)
    {
        $extension = $file->getClientOriginalExtension();
        $filename = $record->id . '_' . $increment . '.' . $extension;
        $filePath = '/records' . $record->folder . '/' . $filename;
        Storage::disk('local')->put($filePath, file_get_contents($file));
        return Storage::disk('local')->path($filePath);
    }

    public function annotateImage($path, $date, $location)
    {
        try {
            $img = new Imagick($path);
            $draw = new ImagickDraw();
            $pixel = new ImagickPixel('black');
            $textX = 10;
            $fontSize = 60;
            $draw->setFontSize($fontSize);
            $draw->setFillColor($pixel);
            $img->annotateImage($draw, $textX, $fontSize, 0, $date);
            $img->annotateImage($draw, $textX, $fontSize * 2 + 10, 0, $location);
            $img->writeImage($path);
        } catch (ImagickException $e) {
            echo 'Ошибка обработки изображения: ' . $e->getMessage();
        }
    }

    public function dateFromMetadata($path)
    {
        $exif = exif_read_data($path);

        // Проверяем, есть ли данные о времени съемки
        if (isset($exif['DateTimeOriginal'])) {
            $dateTimeOriginal = $exif['DateTimeOriginal'];
            $date = DateTime::createFromFormat('Y:m:d H:i:s', $dateTimeOriginal);
            $formatter = new IntlDateFormatter(
                'ru_RU',
                IntlDateFormatter::FULL,
                IntlDateFormatter::FULL,
                null,
                IntlDateFormatter::GREGORIAN,
                'd MMMM yyyy г., HH:mm:ss'
            );
            return $formatter->format($date);
        } else {
            return null;
        }
    }
}
