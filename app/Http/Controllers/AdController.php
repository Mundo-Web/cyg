<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Http\Requests\StoreAdRequest;
use App\Http\Requests\UpdateAdRequest;

class AdController extends BasicController
{
    public $throwMediaError = true;
    public $model = Ad::class;

    public function getByCorrelative($correlative)
    {
        $ad = Ad::getByCorrelative($correlative);
        
        if (!$ad) {
            return response()->json(['message' => 'No se encontró anuncio para este correlativo'], 404);
        }

        return response()->json($ad);
    }
}
