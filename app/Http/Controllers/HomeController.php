<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Multipic;
use Image;
use Auth;
use App\Models\NewsletterSubscriber;

class HomeController extends Controller
{

    public function Home(){
        $brands = DB::table('brands')->get();
        $abouts = DB::table('home_abouts')->first();
        $images = Multipic::all();
        return view('home', compact('brands','abouts','images'));
    }

    // for the newsletters subscribers
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletter_subscribers,email',
            'name' => 'required|string|max:255',
        ]);

        // Create a new subscriber
        $subscriber = new NewsletterSubscriber();
        $subscriber->name = $request->name;
        $subscriber->email = $request->email;
        $subscriber->save();

        return redirect()->back()->with('success', 'You have successfully subscribed to our newsletter!');
    }

}


