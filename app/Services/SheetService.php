<?php

namespace App\Services;

use App\Models\Record;
use DateTime;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class SheetService
{
    public function structureData(Collection $data)
    {
        return $data->reduce(function ($acc, $curr) {
            if (!empty($curr['id'])) {
                $folder = $acc['stack']->reduce(fn ($acc, $curr) => $acc. '/'. rtrim($curr['number'], '.'), '');
                $acc['records']->push([...$curr, 'folder' => $folder]);
            }

            if (!empty($curr['number'])) {
                // Определяем уровень заголовка по количеству точек
                $level = substr_count($curr['number'], '.');

                // Создаем новый раздел
                $newSection = collect($curr)->put('subRows', collect());

                // Удаляем разделы из стека, которые выше текущего уровня
                while ($acc['stack']->count() >= $level) {
                    $acc['stack']->pop();
                }

                // Добавляем в родительский раздел или в корень
                if ($acc['stack']->isNotEmpty()) {
                    $acc['stack']->last()->get('subRows')->push($newSection);
                } else {
                    $acc['data']->push($newSection);
                }

                // Добавляем новый раздел в стек
                $acc['stack']->push($newSection);
            } else {
                // Добавляем объект в текущий раздел
                if ($acc['stack']->isNotEmpty()) {
                    $acc['stack']->last()->get('subRows')->push($curr);
                }
            }

            return $acc;
        }, [
            'data' => collect(),
            'stack' => collect(),
            'records' => collect()
        ]);
    }

    public function saveDataToJson(Collection $data)
    {
        $json = $data->toJson();
        Storage::put('data.json', $json);
    }

    public function updateOrCreateRecords(Collection $data)
    {
        $data->each(function ($curr) {
            Record::updateOrCreate(
                ['id' => $curr['id']],
                $curr
            );
        });
    }
}
