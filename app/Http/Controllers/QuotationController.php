<?php

namespace App\Http\Controllers;
use App\Models\Quotation;
use App\Mail\QuotationReply;
use Illuminate\Support\Facades\Mail;
use PDF;


class QuotationController extends Controller
{
    public function index()
    {
        $quotations = Quotation::all();
        return view('admin.quotations.index', compact('quotations'));
    }

    public function reply($id)
    {
        $quotation = Quotation::findOrFail($id);
        // Assuming you have a view for composing and sending the reply email
        return view('admin.quotations.reply', compact('quotation'))->with('mail', 'admin');
    }

    public function destroy($id)
    {
        Quotation::destroy($id);
        return redirect()->route('admin.quotation')->with('success', 'Quotation deleted successfully.');
    }

    public function sendReply(Request $request, $id)
    {
        $quotation = Quotation::findOrFail($id);

        // Process reply message
        $replyMessage = $request->input('reply_message');

        // Generate PDF file (if necessary)
        $pdf = PDF::loadView('admin.quotations.pdf_template', ['data' => $quotation]);
        $pdfPath = public_path('pdfs/quotation_' . $quotation->id . '.pdf');
        $pdf->save($pdfPath);

        // Send email to the user with attachment
        Mail::to($quotation->email)->send(new QuotationReply($replyMessage, $pdfPath));

        // Optionally, delete the generated PDF file after sending the email
        unlink($pdfPath);

        return redirect()->back()->with('success', 'Reply sent successfully!');
    }
}
