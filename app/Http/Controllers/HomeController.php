<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Multipic;
use Image;
use Auth;

class HomeController extends Controller
{

    public function Home(){
        $brands = DB::table('brands')->get();
        $abouts = DB::table('home_abouts')->first();
        $images = Multipic::all();
        return view('home', compact('brands','abouts','images'));
    }

}
