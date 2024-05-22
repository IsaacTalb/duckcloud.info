<?php
// app/Http/Controllers/AdminController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NewsletterSubscriber;

class AdminController extends Controller
{
    public function showSubscribers()
    {
        $subscribers = NewsletterSubscriber::all();
        return view('admin.subscribers.index', compact('subscribers'));
    }
}
