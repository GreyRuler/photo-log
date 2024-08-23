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
        Schema::create('category_photos', function (Blueprint $table) {
            $table->id();
            $table->string('path'); // путь к изображению
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade'); // внешний ключ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_photos');
    }
};
