<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecordPhotoResource extends JsonResource
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
            'path' => $this->path,
            'increment' => $this->increment,
            'count' => $this->count,
            'record_id' => $this->record_id,
            'owner' => $this->record_id,
            'record' => $this->record
        ];
    }
}
