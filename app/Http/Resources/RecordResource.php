<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'unit' => $this->unit,
            'count' => $this->count,
            'innerCount' => $this->innerCount,
            'timeArrival' => $this->timeArrival,
            'timeEnd' => $this->timeEnd,
            'contractor' => $this->contractor,
            'k' => $this->k,
            'location' => $this->location,
            'comment' => $this->comment,
        ];
    }
}
