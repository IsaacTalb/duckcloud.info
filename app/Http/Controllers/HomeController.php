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
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{

    public function Home(){
        $brands = DB::table('brands')->get();
        $abouts = DB::table('home_abouts')->first();
        $images = Multipic::all();
        return view('home', compact('brands','abouts','images'));
    }

    // for the newsletters subscribers
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:newsletter_subscribers,email',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        // Create a new subscriber
        $subscriber = new NewsletterSubscriber();
        $subscriber->name = $request->name;
        $subscriber->email = $request->email;
        $subscriber->save();

        return response()->json(['success' => true, 'message' => 'You have successfully subscribed to our newsletter!']);
    }
}
