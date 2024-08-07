<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypePlace extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'price',
        'hall_id',
    ];
}
