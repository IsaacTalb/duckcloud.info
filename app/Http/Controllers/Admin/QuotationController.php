<?php
namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phoneNumber' => 'required',
            'plan' => 'required|exists:plans,id',
        ]);

        $quotation = Quotation::create($request->all());

        // Generate the quotation and return the result
        // You can also add your company information here
        $companyInfo = [
            'name' => 'Your Company Name',
            'email' => 'info@yourcompany.com',
            'phone' => '+123456789',
            'address' => '123 Company Address',
        ];

        return view('quotation.result', compact('quotation', 'companyInfo'));
    }
}
