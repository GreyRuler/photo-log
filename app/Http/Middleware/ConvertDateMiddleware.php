<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;

class ConvertDateMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next)
    {
        // Преобразуем дату "dateFrom"
        if ($request->has('dateFrom')) {
            $dateFrom = $request->query('dateFrom');
            $convertedDateFrom = Carbon::createFromFormat('d.m.Y H:i', $dateFrom)
                ->format('Y-m-d H:i:s');
            $request->query->set('dateFrom', $convertedDateFrom);
        }

        // Преобразуем дату "dateTo"
        if ($request->has('dateTo')) {
            $dateTo = $request->query('dateTo');
            $convertedDateTo = Carbon::createFromFormat('d.m.Y H:i', $dateTo)
                ->format('Y-m-d H:i:s');
            $request->query->set('dateTo', $convertedDateTo);
        }

        return $next($request);
    }
}
