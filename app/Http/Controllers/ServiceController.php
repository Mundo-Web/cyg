<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\LandingHome;
use App\Models\Service;
use App\Models\SuccessStory;
use App\Models\Testimony;
use Illuminate\Http\Request;

class ServiceController extends BasicController
{
    public $model = Service::class;
    // public $reactView = 'ServiciosPage';
    public $reactView = 'DetailService';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        //$landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();
        $landing = LandingHome::where('correlative', '=', 'page_home_testimonios')->where('lang_id', $langId)->first();
        $services = Service::where('slug', $request->slug)->where('lang_id', $langId)->with('faqs')->first();
        // $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->where('category_service_id', $services->category_service_id)->with('category')->orderBy('updated_at', 'DESC')->get();
        $brands = Brand::where('status', true)->where('visible', true)->orderBy('updated_at', 'DESC')->get();
        $testimonios = Testimony::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();
        //dump($services);
        $casosExito = SuccessStory::where('status', true)->where('visible', true)->get();
        $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();
        return [
            'landing' => $landing,
            'services' => $services,
            'brands' => $brands,
            'testimonios' => $testimonios,
            'casosExito' => $casosExito,
            'allServices' => $allServices,
        ];
    }
}
