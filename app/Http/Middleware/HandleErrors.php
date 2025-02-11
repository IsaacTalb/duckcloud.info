<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class HandleErrors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request);

        // Handle SSL errors (if request is not secure)
        if (!$request->secure()) {
            return response()->view('errors.ssl_error', [], 500);
        }

        // Handle specific HTTP error codes
        if ($response->getStatusCode() == 401) {
            return response()->view('errors.401', [], 401);
        }

        if ($response->getStatusCode() == 402) {
            return response()->view('errors.402', [], 402);
        }

        if ($response->getStatusCode() == 404) {
            return response()->view('errors.404', [], 404);
        }

        return $response;
    }
}
