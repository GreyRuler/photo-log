<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheImages
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if ($request->is('images/*')) {
            $response->header('Cache-Control', 'public, max-age=31536000'); // Кэшировать на 1 год
        }

        return $response;
    }
}
