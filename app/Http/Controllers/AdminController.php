<?php
// app/Http/Controllers/AdminController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quotation;
use App\Models\NewsletterSubscriber;

class AdminController extends Controller
{
    public function showSubscribers()
    {
        $subscribers = NewsletterSubscriber::all();
        return view('admin.subscribers.index', compact('subscribers'));
    }

    public function showQuotations()
    {
        $quotations = Quotation::all();
        return view('admin.quotations.index', compact('quotations'));
    }

    public function destroyQuotation($id)
    {
        Quotation::findOrFail($id)->delete();
        return redirect()->back()->with('message', 'Quotation deleted successfully')->with('alert-type', 'success');
    }
}
