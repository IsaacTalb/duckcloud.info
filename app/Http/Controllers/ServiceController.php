<?php

namespace App\Http\Controllers;
use App\Models\Service;
use App\Models\Quotation;
use Illuminate\Http\Request;
class ServiceController extends Controller
{
    public function showServices()
    {
        return view('pages.services'); // Assuming 'services.blade.php' is your service page template
    }

    public function storeQuotation(Request $request)
    {
        $validatedData = $request->validate([
            'company' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone_number' => 'required|string|max:20', // Adjusted to 'string' and 'max:20'
            'plan' => 'required|string|in:Foundation,Standard,Advanced',
        ]);

        $quotation = Quotation::create([
            'company' => $validatedData['company'],
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'plan' => $validatedData['plan'],
        ]);

        return response()->json(['success' => 'Quotation generated successfully.', 'quotation' => $quotation]);
    }

    public function showQuotations()
    {
        $quotations = Quotation::all();
        return view('admin.quotations.index', compact('quotations'));
    }
}
