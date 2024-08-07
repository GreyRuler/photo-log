<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'name',
        'description',
        'duration',
        'origin',
        'image',
        'color',
    ];

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class, 'movie_id');
    }
}
