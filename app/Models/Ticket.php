<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'schedule_id',
        'seat_id',
        'qr_code',
    ];

    public function seat(): BelongsTo
    {
        return $this->belongsTo(Seat::class);
    }
}
