<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PrivacyPolicy;
use Illuminate\Support\Carbon;

class PrivacyPolicyController extends Controller
{
    public function Index(){
        $privacyPolicies = PrivacyPolicy::latest()->get();
        return view('admin.admin_privacy_policy', compact('privacyPolicies'));
    }

    public function AddPrivacyPolicy(){
        return view('admin.add_privacy_policy');
    }

    public function StorePrivacyPolicy(Request $request){
        $photo = $request->file('photo');
        if ($photo) {
            $name_gen = hexdec(uniqid());
            $img_ext = strtolower($photo->getClientOriginalExtension());
            $img_name = $name_gen.'.'.$img_ext;
            $up_location = 'image/privacy/';
            $last_img = $up_location.$img_name;
            $photo->move($up_location, $img_name);
        } else {
            $last_img = null;
        }

        PrivacyPolicy::insert([
            'title' => $request->title,
            'photo' => $last_img,
            'text' => $request->text,
            'created_at' => Carbon::now()
        ]);

        return Redirect()->route('admin.privacy.policy')->with('success', 'Privacy Policy Inserted Successfully');
    }

    public function EditPrivacyPolicy($id){
        $privacyPolicy = PrivacyPolicy::find($id);
        return view('admin.edit_privacy_policy', compact('privacyPolicy'));
    }

    public function UpdatePrivacyPolicy(Request $request, $id){
        $old_image = $request->old_image;
        $photo = $request->file('photo');

        if ($photo) {
            $name_gen = hexdec(uniqid());
            $img_ext = strtolower($photo->getClientOriginalExtension());
            $img_name = $name_gen.'.'.$img_ext;
            $up_location = 'image/privacy/';
            $last_img = $up_location.$img_name;
            $photo->move($up_location, $img_name);

            if ($old_image) {
                unlink($old_image);
            }

            PrivacyPolicy::find($id)->update([
                'title' => $request->title,
                'photo' => $last_img,
                'text' => $request->text,
            ]);

            return Redirect()->route('admin.privacy.policy')->with('success', 'Privacy Policy Updated Successfully');
        } else {
            PrivacyPolicy::find($id)->update([
                'title' => $request->title,
                'text' => $request->text,
            ]);

            return Redirect()->route('admin.privacy.policy')->with('success', 'Privacy Policy Updated Successfully');
        }
    }

    public function DeletePrivacyPolicy($id){
        $privacyPolicy = PrivacyPolicy::find($id);
        $old_image = $privacyPolicy->photo;
        if ($old_image) {
            unlink($old_image);
        }

        PrivacyPolicy::find($id)->delete();

        return Redirect()->back()->with('success', 'Privacy Policy Deleted Successfully');
    }

    public function PrivacyPolicy(){
        $privacyPolicy = PrivacyPolicy::latest()->first();
        return view('pages.privacy_policy', compact('privacyPolicy'));
    }
}
