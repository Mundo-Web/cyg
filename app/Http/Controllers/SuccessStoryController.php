<?php

namespace App\Http\Controllers;

use App\Models\LandingHome;
use App\Models\Service;
use App\Models\SuccessStory;
use App\Models\Testimony;
use Illuminate\Http\Request;

class SuccessStoryController extends BasicController
{
  public $model = SuccessStory::class;
  // public $reactView = 'ServiciosPage';
  public $reactView = 'SuccessStory';
  public $reactRootView = 'public';



  public function setReactViewProperties(Request $request)
  {
    $langId = app('current_lang_id');
    //$landing = LandingHome::where('correlative', 'like', 'page_services%')->where('lang_id', $langId)->get();

    $successStories = SuccessStory::where('status', true)->where('visible', true)->get();

    $testimonios = Testimony::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();
    $landing = LandingHome::where('correlative', '=', 'page_home_testimonios')->where('lang_id', $langId)->first();
    $casosExito = SuccessStory::where('status', true)->where('visible', true)->get();
    $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();


    return [
      'landing' => $landing,
      'successStories' => $successStories,
      'testimonios' => $testimonios,
      'casosExito' => $casosExito,
      'allServices' => $allServices,
    ];
  }
}
