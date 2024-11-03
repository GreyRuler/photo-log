<?php

namespace App\Services;

use App\Models\Record;
use App\Models\Section;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class SheetService
{
    public function __construct(private readonly RecordService $recordService)
    {
    }

    public function structureData(Collection $data)
    {
        return $data->reduce(function ($acc, $curr) {
            if (!empty($curr['number'])) {
                // Определяем уровень заголовка по количеству точек
                $level = substr_count($curr['number'], '.');

                // Удаляем разделы из стека, которые выше текущего уровня
                while ($acc['stack']->count() >= $level) {
                    $acc['stack']->pop();
                }

                // Создаем новый раздел
                $parent_id = $acc['stack']->count() > 0 ? $acc['stack'][$acc['stack']->count() - 1]['id'] : null;
                $newSection = [
                    'id' => $acc['id']++,
                    'parent_id' => $parent_id,
                    'name' => $curr['name'],
                    'level' => $level,
                ];

                // Добавляем новый раздел в стек
                $acc['stack']->push(collect($newSection));

                // Сохраняем раздел в коллекцию для вставки в таблицу
                $acc['sections']->push($newSection);
            }

            if (!empty($curr['id'])) {
                $acc['records']->push([...$curr, 'parent_id' => $acc['stack']->last()->get('id')]);
            }

            return $acc;
        }, [
            'data' => collect(),
            'stack' => collect(),
            'records' => collect(),
            'sections' => collect(),
            'id' => 1,
        ]);
    }

    public function saveDataToJson(Collection $data)
    {
        $json = $data->toJson();
        Storage::disk('local')->put('data.json', $json);
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

    public function updateOrCreateSections(Collection $data)
    {
        Section::truncate();
        $data->each(function ($curr) {
            Section::updateOrCreate(
                ['id' => $curr['id']],
                $curr
            );
        });
    }

    public function buildTree($sections, $parentId = null)
    {
        $tree = collect();

        // Проходим по всем разделам и ищем те, у которых parent_id равен $parentId
        foreach ($sections->where('parent_id', $parentId) as $section) {
            // Рекурсивно строим дерево для каждого подраздела
            $children = $this->buildTree($sections, $section['id']);

            // Добавляем объекты в текущий раздел
            $section['subRows'] = $this->recordService->getSortedRecordsByParams(
                Record::where('parent_id', $section['id'])->get()
            );

            $section['priority'] = $section['subRows']->filter(fn($item) => $item['subRows'] ? $item : $item->priority === 2)->count('priority');

            // Если есть дети, добавляем их к разделу
            if ($children->isNotEmpty()) {
                $section['subRows'] = $children;
                $section['priority'] = $children->filter(fn($item) => $item->priority > 0)->count();
            }

            // Добавляем раздел в дерево
            $tree->push($section);
        }

        return $tree;
    }
}
