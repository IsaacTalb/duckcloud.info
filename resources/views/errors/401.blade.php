@extends('layouts.master_home') {{-- Use your layout file --}}

@section('content')
    <div class="flex items-center justify-center h-screen">
        <div class="text-center px-4 md:px-0">
            <h1 class="text-4xl font-bold text-red-600">401 - Unauthorized</h1>
            <p class="text-gray-500 mt-4">Sorry, you are not authorized to access this page.</p>
            <a href="{{ url('/') }}" class="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg">Go Back Home</a>
        </div>
    </div>
@endsection
