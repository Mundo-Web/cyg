<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Brand;
use App\Models\CoreValue;
use App\Models\General;
use App\Models\Indicator;
use App\Models\InstagramPost;
use App\Models\LandingHome;
use App\Models\Lang;
use App\Models\Service;
use App\Models\Specialty;
use App\Models\Staff;
use App\Models\Strength;
use App\Models\SuccessStory;
use App\Models\Testimony;
use Illuminate\Http\Request;

class AboutController extends BasicController
{
    public $reactView = 'About';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $langId = app('current_lang_id');
        // $defaultLangId = Lang::where('is_default', true)->value('id');

        // LANDING
        $landing = LandingHome::where('correlative', 'like', 'page_aboutus%')
            ->where('lang_id', $langId)
            ->get();

        /* if ($landing->isEmpty()) {
            $landing = LandingHome::where('correlative', 'like', 'page_aboutus%')
                ->where('lang_id', $defaultLangId)
                ->get();
        }
*/
        // STAFF
        $staffData = Staff::where('visible', true)
            ->where('status', true)
            ->where('lang_id', $langId)
            ->get();


        $brands = Brand::where('visible', true)
            ->where('status', true)

            ->get();


        $strengths = Strength::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();


        $aboutus = Aboutus::where('status', true)
            ->get();

        $core_values = CoreValue::where('status', true)
            ->where('lang_id', $langId)
            ->get();

        $casosExito = SuccessStory::where('status', true)->where('visible', true)->get();
        $allServices = Service::where('status', true)->where('visible', true)->where('lang_id', $langId)->get();

        return [
            'landing' => $landing,
            'strengths' => $strengths,
            'staff' => $staffData,

            'brands' => $brands,
            'aboutus' => $aboutus,
            'core_values' => $core_values,
            'casosExito' => $casosExito,
            'allServices' => $allServices,
        ];
    }
}
