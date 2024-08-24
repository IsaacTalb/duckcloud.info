<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\ContactForm;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReplyToContactForm;

class ContactController extends Controller
{

 public function AdminContact(){
     $contacts = Contact::all();
     return view('admin.contact.index',compact('contacts'));
 }

 public function AdminAddContact(){
     return view('admin.contact.create');
 }

 public function AdminStoreContact(Request $request){

    Contact::insert([
        'email' => $request->email,
        'phone' => $request->phone,
        'address' => $request->address,
        'created_at' => Carbon::now()
    ]);

    return Redirect()->route('admin.contact')->with('success','Contact Inserted Successfully');

 }


    public function Contact(){
        $contacts = DB::table('contacts')->first();
        return view('pages.contact',compact('contacts'));
    }


    public function ContactForm(Request $request){
        ContactForm::insert([
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'message' => $request->message,
            'created_at' => Carbon::now()
        ]);

        return Redirect()->route('contact')->with('success','Your Message Send Successfully');

    }

    public function AdminMessage(){
        $messages = ContactForm::all();
        return view('admin.contact.message',compact('messages'));
    }

    public function AdminEditContact($id)
    {
        $contact = Contact::findOrFail($id);
        return view('admin.contact.edit', compact('contact'));
    }

    public function AdminUpdateContact(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $request->validate([
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        $contact->update([
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'updated_at' => Carbon::now()
        ]);

        return redirect()->route('admin.contact')->with('success', 'Contact Updated Successfully');
    }

    public function AdminDeleteContact($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return redirect()->route('admin.contact')->with('success', 'Contact Deleted Successfully');
    }

    public function AdminReplyMessage(Request $request, $id)
    {
        $request->validate([
            'reply' => 'required|string',
        ]);

        $contactForm = ContactForm::findOrFail($id);
        $contactForm->replies()->create([
            'message' => $request->reply,
        ]);

        // Optionally, send the reply email
        Mail::to($contactForm->email)->send(new ReplyToContactForm($request->reply));

        return redirect()->route('admin.message')->with('success', 'Reply sent and saved successfully.');
    }

    public function AdminDeleteMessage($id)
    {
        $message = ContactForm::findOrFail($id);
        $message->delete();
        return redirect()->route('admin.message')->with('success', 'Message Deleted Successfully');
    }

}
