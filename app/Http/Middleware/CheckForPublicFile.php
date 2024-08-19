<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckForPublicFile
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Получаем путь к файлу в папке public
        $filePath = public_path($request->path());

        // Проверяем, существует ли файл
        if (file_exists($filePath) && !is_dir($filePath)) {
            // Если файл найден, возвращаем его содержимое
            return response()->file($filePath);
        }

        // Если файл не найден, передаем запрос дальше
        return $next($request);
    }
}
