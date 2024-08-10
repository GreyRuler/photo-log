<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    use HasFactory;

    protected $guarded = [
        'created_at', 'updated_at'
    ];

    protected $casts = [
        'images' => 'array',
        'k' => 'float',
    ];
}
