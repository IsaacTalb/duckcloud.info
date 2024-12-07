@extends('layouts.app')

@section('title', 'Welcome to Duck Cloud')

@section('content')
<div class="text-center">
    <h1 class="text-4xl font-bold">Welcome to Duck Cloud</h1>
    <p class="mt-4">Explore our digital products, services, and community!</p>
    <a href="{{ route('login') }}" class="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded">Get Started</a>
</div>
@endsection
