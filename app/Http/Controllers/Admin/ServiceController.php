<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\CategoryService;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use SoDe\Extend\Crypto;
use SoDe\Extend\Response;
use Illuminate\Support\Str;

class ServiceController extends BasicController

{
    public $model = Service::class;
    public $reactView = 'Admin/Services';
    public $imageFields = ['image', 'image_secondary', 'image_banner'];

    public function setPaginationInstance(string $model)
    {
        return $model::with(['category']);
    }

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

        // Procesar características
        /*  if ($request->has('characteristics')) {
            $characteristics = json_decode($request->characteristics, true);
            $body['characteristics'] = array_values(array_filter($characteristics, function ($item) {
                return !empty(trim($item));
            }));
        }*/
        // Procesar características compuestas
        $processedCharacteristics = [];
        if ($request->has('characteristics')) {
            $characteristics = $request->characteristics;

            foreach ($characteristics as $index => $char) {
                $title = trim($char['title'] ?? '');
                /*  $description = trim($char['description'] ?? '');
                $image = null;

                // Procesar imagen si se subió
                if ($request->hasFile("characteristics.{$index}.image")) {
                    $file = $request->file("characteristics.{$index}.image");
                    $uuid = Crypto::randomUUID();
                    $ext = $file->getClientOriginalExtension();
                    $path = "images/service/{$uuid}.{$ext}";
                    Storage::put($path, file_get_contents($file));
                    $image = "{$uuid}.{$ext}";
                } elseif (!empty($char['existing_image'])) {
                    // Mantener imagen existente
                    $image = $char['existing_image'];
                } else {
                    // No hay imagen
                    $image = null;
                }

                // Solo agregar si hay al menos un campo con contenido
                if ($title || $description || $image) {
                    $processedCharacteristics[] = [
                        'title' => $title,
                        'description' => $description,
                        'image' => $image
                    ];
                }*/

                if ($title) {
                    $processedCharacteristics[] = [
                        'title' => $title

                    ];
                }
            }
        }
        // $body['characteristics'] = $processedCharacteristics;
        $body['characteristics_approach'] = $processedCharacteristics;

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
                    $image = $this->saveImageFile($file, "images/service");
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


        $processedSteps = [];
        if ($request->has('steps')) {
            $steps = $request->steps;

            foreach ($steps as $index => $step) {
                $title = trim($step['title'] ?? '');
                $description = trim($step['description'] ?? '');
                $image = null;

                if ($request->hasFile("steps.{$index}.image")) {
                    $file = $request->file("steps.{$index}.image");
                    $image = $this->saveImageFile($file, "images/service");
                } elseif (!empty($step['existing_image'])) {
                    $image = $step['existing_image'];
                } else {
                    // No hay imagen
                    $image = null;
                }

                if ($title || $description || $image) {
                    $processedSteps[] = [
                        'title' => $title,
                        'description' => $description,
                        'image' => $image
                    ];
                }
            }
        }
        $body['steps_methodology'] = $processedSteps;

        return $body;
    }

    public function afterSave(Request $request, $service, ?bool $isNew)
    {



        // Eliminar imágenes marcadas para borrar (si implementas esta función)
        return $service;
    }
}
