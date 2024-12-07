<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Duck Cloud')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 text-gray-800">
    <nav class="bg-blue-600 p-4 text-white">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ url('/') }}" class="font-bold text-lg">Duck Cloud</a>
            <div>
                @auth
                    <a href="{{ route('dashboard') }}" class="mr-4">Dashboard</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="text-white">Logout</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="mr-4">Login</a>
                    <a href="{{ route('register') }}" class="text-white">Register</a>
                @endauth
            </div>
        </div>
    </nav>
    <main class="container mx-auto mt-8">
        @yield('content')
    </main>
</body>
</html>
