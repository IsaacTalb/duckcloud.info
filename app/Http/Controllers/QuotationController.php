<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quotation;

class QuotationController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Received request', $request->all());

        $request->validate([
            'company' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phoneNumber' => 'required|string|max:15',
            'plan' => 'required|string'
        ]);

        try {
            $quotation = new Quotation();
            $quotation->company = $request->company;
            $quotation->name = $request->name;
            $quotation->email = $request->email;
            $quotation->phoneNumber = $request->phoneNumber;
            $quotation->plan = $request->plan;
            $quotation->save();

            return response()->json(['success' => true, 'data' => $quotation]);
        } catch (\Exception $e) {
            Log::error('Error saving data', ['error' => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Error saving data. Please try again.']);
        }
    }
}
