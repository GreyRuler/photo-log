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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('number')->nullable(); // Поле для номера
            $table->text('name'); // Название баннера
            $table->string('unit'); // Единица измерения
            $table->integer('count'); // Количество
            $table->integer('innerCount')->default(0); // счетчик сфотографированного количества
            $table->text('timeArrival')->nullable(); // Время прибытия
            $table->text('timeEnd')->nullable(); // Время окончания
            $table->text('contractor')->nullable(); // Подрядчик (можно хранить как текст)
            $table->float('k'); // Коэффициент
            $table->string('location')->nullable(); // Локация
            $table->text('comment')->nullable(); // Комментарий
            $table->json('images')->default(json_encode([])); // картинки
            $table->text('folder'); // раздел
            $table->timestamps(); // Поля created_at и updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
