<?php
namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Image;

class SliderController extends Controller
{
    public function HomeSlider()
    {
        $sliders = Slider::latest()->get();
        return view('admin.slider.index', compact('sliders'));
    }

    public function AddSlider()
    {
        return view('admin.slider.create');
    }

    public function StoreSlider(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $slider_image = $request->file('image');
        $name_gen = hexdec(uniqid()) . '.' . $slider_image->getClientOriginalExtension();
        Image::make($slider_image)->resize(1920, 1088)->save('image/slider/' . $name_gen);
        $last_img = 'image/slider/' . $name_gen;

        Slider::insert([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $last_img,
            'created_at' => Carbon::now()
        ]);

        return Redirect()->route('home.slider')->with('success', 'Slider Inserted Successfully');
    }

    public function edit($id)
    {
        $slider = Slider::find($id);
        if (!$slider) {
            return redirect()->route('home.slider')->with('error', 'Slider not found');
        }
        return view('admin.slider.edit', compact('slider'));
    }

    public function update(Request $request, $id)
    {
        $slider = Slider::find($id);
        if (!$slider) {
            return redirect()->route('home.slider')->with('error', 'Slider not found');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $slider->title = $request->title;
        $slider->description = $request->description;

        if ($request->file('image')) {
            $old_image = $slider->image;
            $image = $request->file('image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('image/slider'), $name_gen);
            $slider->image = 'image/slider/' . $name_gen;

            if (File::exists($old_image)) {
                File::delete($old_image);
            }
        }

        $slider->save();

        return redirect()->route('home.slider')->with('success', 'Slider Updated Successfully');
    }

    public function delete($id)
    {
        $slider = Slider::find($id);
        if (!$slider) {
            return redirect()->route('home.slider')->with('error', 'Slider not found');
        }

        $old_image = $slider->image;

        if (File::exists($old_image)) {
            File::delete($old_image);
        }

        $slider->delete();
        return redirect()->back()->with('success', 'Slider Deleted Successfully');
    }
}
