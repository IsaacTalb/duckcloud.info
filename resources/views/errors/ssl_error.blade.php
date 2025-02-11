@extends('layouts.master_home') {{-- Use your layout file --}}

@section('content')
    <div class="flex items-center justify-center h-screen">
        <div class="text-center px-4 md:px-0">
            <h1 class="text-4xl font-bold text-red-600">Unknown - SSL Errors</h1>
            <p class="text-gray-500 mt-4">Sorry, Secure connection is required. Duck Cloud is trying to fix it soon and please come back later.</p>
            <a href="{{ url('/') }}" class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg">Go Home</a>
        </div>
    </div>
@endsection
