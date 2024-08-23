<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('record_photos', function (Blueprint $table) {
            $table->id();
            $table->string('path'); // путь к изображению
            $table->integer('increment')->default(1); // инкремент
            $table->integer('count')->default(0); // количество
            $table->foreignId('record_id')->constrained('records')->onDelete('cascade'); // внешний ключ
            $table->timestamps(); // поля created_at и updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record_photos');
    }
};
