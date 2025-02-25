<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChangePass;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\QuotationController;
use App\Models\User;
use App\Models\Multipic;
use Illuminate\Support\Facades\DB;


// for checking php version in local

Route::get('/version', function() {
    return app()->version();
});

// Then vist here: http://your-app-url/version

// Route::get('/register', function () {
//     return redirect('/login'); // Redirect from register to login
// })->name('register');

// Route::get('/email/verify', function () {
//     return view('auth.verify-email');
// })->middleware(['auth'])->name('verification.notice');

// Home Route
Route::get('/', function () {
    $brands = DB::table('brands')->get();
    $abouts = DB::table('home_abouts')->first();
    $images = Multipic::all();
    return view('home', compact('brands', 'abouts', 'images'));
})->name('home');

// Route::get('/home', function () {
//     echo " This is Home page ";
// });

Route::get('/about', function () {
    return view('about');
});

// Admin Routes
// Category Controller
Route::get('/category/all', [CategoryController::class, 'AllCat'])->name('all.category');
Route::post('/category/add', [CategoryController::class, 'AddCat'])->name('store.category');
Route::get('/category/edit/{id}', [CategoryController::class, 'Edit']);
Route::post('/category/update/{id}', [CategoryController::class, 'Update']);
Route::get('/softdelete/category/{id}', [CategoryController::class, 'SoftDelete']);
Route::get('/category/restore/{id}', [CategoryController::class, 'Restore']);
Route::get('/pdelete/category/{id}', [CategoryController::class, 'Pdelete']);

// Brand Routes
Route::get('/brand/all', [BrandController::class, 'AllBrand'])->name('all.brand');
Route::post('/brand/add', [BrandController::class, 'StoreBrand'])->name('store.brand');
Route::get('/brand/edit/{id}', [BrandController::class, 'Edit']);
Route::post('/brand/update/{id}', [BrandController::class, 'Update']);
Route::get('/brand/delete/{id}', [BrandController::class, 'Delete']);

// Multi Image Routes
Route::get('/multi/image', [BrandController::class, 'Multpic'])->name('multi.image');
Route::post('/multi/add', [BrandController::class, 'StoreImg'])->name('store.image');
Route::delete('/multi/image/{id}', [BrandController::class, 'deleteImage'])->name('delete.image');

// Home Slider Routes
Route::get('/home/slider', [SliderController::class, 'HomeSlider'])->name('home.slider');
Route::get('/add/slider', [SliderController::class, 'AddSlider'])->name('add.slider');
Route::post('/store/slider', [SliderController::class, 'StoreSlider'])->name('store.slider');

// edit by Isaac for the slider
Route::get('slider/edit/{id}', [SliderController::class, 'edit'])->name('slider.edit');
Route::post('slider/update/{id}', [SliderController::class, 'update'])->name('slider.update');
Route::get('slider/delete/{id}', [SliderController::class, 'delete'])->name('slider.delete');


// Home About Routes
Route::get('/home/About', [AboutController::class, 'HomeAbout'])->name('home.about');
Route::get('/add/About', [AboutController::class, 'AddAbout'])->name('add.about');
Route::post('/store/About', [AboutController::class, 'StoreAbout'])->name('store.about');
Route::get('/about/edit/{id}', [AboutController::class, 'EditAbout']);
Route::post('/update/homeabout/{id}', [AboutController::class, 'UpdateAbout']);
Route::get('/about/delete/{id}', [AboutController::class, 'DeleteAbout']);

// Public Routes
Route::get('/portfolio', [AboutController::class, 'Portfolio'])->name('portfolio');
Route::get('/contact', [ContactController::class, 'Contact'])->name('contact');
Route::get('/about', [AboutController::class, 'About'])->name('about');
Route::get('/blog', function () {
    return view('pages.blog');
})->name('blog');

// Admin Contact Routes edit by Isaac
Route::get('/admin/contact', [ContactController::class, 'AdminContact'])->name('admin.contact');
Route::get('/admin/add/contact', [ContactController::class, 'AdminAddContact'])->name('add.contact');
Route::post('/admin/store/contact', [ContactController::class, 'AdminStoreContact'])->name('store.contact');
Route::get('/admin/contact/edit/{id}', [ContactController::class, 'AdminEditContact'])->name('contact.edit');
Route::post('/admin/contact/update/{id}', [ContactController::class, 'AdminUpdateContact'])->name('contact.update');
Route::get('/admin/contact/delete/{id}', [ContactController::class, 'AdminDeleteContact'])->name('contact.delete');
Route::get('/admin/message', [ContactController::class, 'AdminMessage'])->name('admin.message');
Route::post('/admin/message/reply/{id}', [ContactController::class, 'AdminReplyMessage'])->name('admin.message.reply');
Route::delete('/admin/message/delete/{id}', [ContactController::class, 'AdminDeleteMessage'])->name('admin.message.delete');

// Home Contact Page Routes
Route::post('/contact/form', [ContactController::class, 'ContactForm'])->name('contact.form');
Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('admin.index');
})->name('dashboard');
Route::get('/user/logout', [BrandController::class, 'Logout'])->name('user.logout');

// Change Password and User Profile Routes
Route::get('/user/password', [ChangePass::class, 'CPassword'])->name('change.password');
Route::post('/password/update', [ChangePass::class, 'UpdatePassword'])->name('password.update');

// User Profile
Route::get('/user/profile', [ChangePass::class, 'PUpdate'])->name('profile.update');
Route::post('/user/profile/update', [ChangePass::class, 'UpdateProfile'])->name('update.user.profile');

// subscribe
Route::post('/subscribe', [HomeController::class, 'subscribe'])->name('subscribe');
Route::get('/admin/subscribers', [AdminController::class, 'showSubscribers'])->name('admin.subscribers');

//Privacy of DuckCloud
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'PrivacyPolicy'])->name('privacy-policy');
Route::get('/admin/privacy-policy', [PrivacyPolicyController::class, 'Index'])->name('admin.privacy.policy');
Route::get('/admin/privacy-policy/add', [PrivacyPolicyController::class, 'AddPrivacyPolicy'])->name('add.privacy.policy');
Route::post('/admin/privacy-policy/store', [PrivacyPolicyController::class, 'StorePrivacyPolicy'])->name('store.privacy.policy');
Route::get('/admin/privacy-policy/edit/{id}', [PrivacyPolicyController::class, 'EditPrivacyPolicy']);
Route::post('/admin/privacy-policy/update/{id}', [PrivacyPolicyController::class, 'UpdatePrivacyPolicy']);
Route::get('/admin/privacy-policy/delete/{id}', [PrivacyPolicyController::class, 'DeletePrivacyPolicy'])->name('delete.privacy.policy');

//Services Routes;
Route::get('/services', [ServiceController::class, 'showServices'])->name('services');
Route::post('/services/quotation', [ServiceController::class, 'storeQuotation'])->name('quotation.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/admin/quotations', [ServiceController::class, 'showQuotations'])->name('admin.quotations');
});
Route::get('/admin/quotation/{id}/reply', [QuotationController::class, 'reply'])->name('admin.reply');
Route::delete('/admin/quotation/{id}/delete', [QuotationController::class, 'destroy'])->name('admin.delete');

Route::get('/admin/quotation', [QuotationController::class, 'index'])->name('admin.quotation');
