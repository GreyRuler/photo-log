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
            $table->text('timeArrival')->nullable(); // Время прибытия
            $table->text('timeEnd')->nullable(); // Время окончания
            $table->text('contractor')->nullable(); // Подрядчик (можно хранить как текст)
            $table->float('k'); // Коэффициент
            $table->string('location')->nullable(); // Локация
            $table->text('comment')->nullable(); // Комментарий
            $table->integer('parent_id'); // раздел
            $table->integer('stars')->default(0);
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
