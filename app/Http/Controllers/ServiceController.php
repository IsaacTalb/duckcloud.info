<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
class ServiceController extends Controller
{
    public function showServices()
    {
        return view('pages.services'); // Assuming 'services.blade.php' is your service page template
    }
}
