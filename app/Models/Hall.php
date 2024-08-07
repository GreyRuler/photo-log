<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Hall extends Model
{
    use HasFactory;

    public $timestamps = false;
    public $fillable = [
        'name',
        'countRow',
        'countColumn',
        'active',
    ];

    public function seats(): HasMany
    {
        return $this->hasMany(Seat::class, 'hall_id');
    }

    public function typePlaces(): HasMany
    {
        return $this->hasMany(TypePlace::class, 'hall_id');
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'hall_id');
    }
}
