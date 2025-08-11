<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Ad;
use App\Models\Brand;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\Item;
use App\Models\LandingHome;
use App\Models\Lang;
use App\Models\Post;
use App\Models\Service;
use App\Models\Solution;
use App\Models\PurchaseOption;
use App\Models\Slider;
use App\Models\Staff;
use App\Models\Strength;
use App\Models\Supply;
use App\Models\Testimony;
use Illuminate\Http\Request;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {

        $langId = app('current_lang_id');

        $landing = LandingHome::where('correlative', 'like', 'page_home%')->where('lang_id', $langId)->get();
        /*CAMBIO Y GERENCIA */
        $sliders = Slider::where('status', true)->where('visible', true)->orderBy('created_at', 'DESC')->get();
        $brands = Brand::where('status', true)->where('visible', true)->orderBy('created_at', 'DESC')->get();
        $strengths = Strength::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();
        $posts = Post::where('status', true)->orderBy('created_at', 'desc')->with('category')->where('lang_id', $langId)->limit(3)->get();
        $testimonios = Testimony::where('status', true)->where('lang_id', $langId)->get();
        $indicators = Indicator::where('status', true)->where('lang_id', $langId)->get();

        $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();
        return [
            'landing' => $landing,
            'sliders' => $sliders,
            'brands' => $brands,
            'strengths' => $strengths,
            'posts' => $posts,
            'testimonios' => $testimonios,
            'indicators' => $indicators,
            'allServices' => $allServices,
        ];
    }
}
