<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Seat extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $guarded = [];

    public function hall(): BelongsTo
    {
        return $this->belongsTo(Hall::class);
    }
}
