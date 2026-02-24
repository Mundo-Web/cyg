<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;

use App\Models\Service;
use App\Models\SuccessStory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use Illuminate\Support\Str;

class SuccessStoryController extends BasicController

{
    public $model = SuccessStory::class;
    public $reactView = 'Admin/SuccessStories';
    public $imageFields = ['image', 'image_challenges', 'company_logo'];



    public function beforeSave(Request $request)
    {
        $body = $request->all();

        // Procesar galería de imágenes
        $gallery = [];
        // En ServiceController.php
        /*  if ($request->has('category_name')) {
            $langId = app('current_lang_id'); // Obtener el lang_id del middleware

            $category = CategoryService::firstOrCreate(
                [
                    'name' => trim(ucfirst($request->category_name)),
                    'lang_id' => $langId // Añadir lang_id a la búsqueda/creación
                ],
                [
                    'name' => trim(ucfirst($request->category_name)),
                    'lang_id' => $langId, // Campo obligatorio
                    'slug' => Str::slug($request->category_name)
                ]
            );

            $body['category_service_id'] = $category->id;
        }*/

        // Agregar imágenes nuevas
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $fileName = $this->saveImageFile($file, "images/service");
                $gallery[] = $fileName;
            }
        }

        // Mantener imágenes existentes
        if ($request->has('existing_gallery')) {
            $existing = json_decode($request->existing_gallery, true);
            $gallery = array_merge($gallery, $existing);
        }

        $body['gallery'] = $gallery;


        // Procesar características compuestas
        $processedSolutions = [];
        if ($request->has('solutions')) {
            $solutions = $request->solutions;

            foreach ($solutions as $index => $sol) {
                $title = trim($sol['title'] ?? '');


                if ($title) {
                    $processedSolutions[] = [
                        'title' => $title

                    ];
                }
            }
        }
        // $body['characteristics'] = $processedCharacteristics;
        $body['solutions'] = $processedSolutions;

        // Procesar desafíos (similar a características)
        $processedChallenges = [];
        if ($request->has('challenges')) {
            $challenges = $request->challenges;

            foreach ($challenges as $index => $challenge) {
                $title = trim($challenge['title'] ?? '');

                if ($title) {
                    $processedChallenges[] = [
                        'title' => $title

                    ];
                }
            }
        }
        $body['challenges'] = $processedChallenges;

        // Procesar beneficios (similar a características)
        $processedBenefits = [];
        if ($request->has('benefits')) {
            $benefits = $request->benefits;

            foreach ($benefits as $index => $benefit) {
                $title = trim($benefit['title'] ?? '');
                $description = trim($benefit['description'] ?? '');
                $image = null;

                if ($request->hasFile("benefits.{$index}.image")) {
                    $file = $request->file("benefits.{$index}.image");
                    $image = $this->saveImageFile($file, "images/success_story");
                } elseif (!empty($benefit['existing_image'])) {
                    $image = $benefit['existing_image'];
                } else {
                    // No hay imagen
                    $image = null;
                }

                if ($title || $description || $image) {
                    $processedBenefits[] = [
                        'title' => $title,
                        'description' => $description,
                        'image' => $image
                    ];
                }
            }
        }
        $body['benefits'] = $processedBenefits;




        return $body;
    }

    public function afterSave(Request $request, $service, ?bool $isNew)
    {
        // Eliminar imágenes marcadas para borrar (si implementas esta función)
        return $service;
    }
}
