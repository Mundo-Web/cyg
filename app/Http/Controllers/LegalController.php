<?php

namespace App\Http\Controllers;

use App\Models\General;
use Illuminate\Http\Request;

class LegalController extends BasicController
{
    public $reactView = 'Legal';
    public $reactRootView = 'public';

    public function privacyPolicy(Request $request)
    {
        $this->reactView = 'PrivacyPolicy';
        return $this->reactView($request);
    }

    public function termsAndConditions(Request $request)
    {
        $this->reactView = 'TermsAndConditions';
        return $this->reactView($request);
    }

    public function exchangePolicy(Request $request)
    {
        $this->reactView = 'ExchangePolicy';
        return $this->reactView($request);
    }

    public function setReactViewProperties(Request $request)
    {   
        $langId = app('current_lang_id');
        $generals = General::where('lang_id', $langId)->get();

        return [
            'generals' => $generals,
        ];
    }
}
