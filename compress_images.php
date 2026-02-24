<?php
ini_set('memory_limit', '2048M'); // Aumentamos la memoria porque imágenes de 15MB requieren mucha memoria para ser procesadas
set_time_limit(0); // Sin límite de tiempo

$directories = [
    __DIR__ . '/storage/app/images',
    __DIR__ . '/storage/app/public'
];

$maxFileSize = 2 * 1024 * 1024; // 2MB
$maxWidth = 1920; // Ancho máximo
$maxHeight = 1920; // Alto máximo

function compressImage($source, $destination, $quality, $maxWidth, $maxHeight) {
    $info = @getimagesize($source);
    if ($info === false) {
        return false;
    }

    $mime = $info['mime'];
    $width = $info[0];
    $height = $info[1];

    // Calcular nuevas dimensiones manteniendo la relación de aspecto
    $newWidth = $width;
    $newHeight = $height;

    // Si la imagen es muy grande, de todas maneras la redimensionamos un poco para asegurar que baje su peso extra
    if ($width > $maxWidth || $height > $maxHeight) {
        $ratio = min($maxWidth / $width, $maxHeight / $height);
        $newWidth = ceil($width * $ratio);
        $newHeight = ceil($height * $ratio);
    }

    $image = null;
    switch ($mime) {
        case 'image/jpeg':
            $image = @imagecreatefromjpeg($source);
            break;
        case 'image/png':
            $image = @imagecreatefrompng($source);
            break;
        case 'image/webp':
            $image = @imagecreatefromwebp($source);
            break;
    }

    if (!$image) return false;

    $newImage = imagecreatetruecolor($newWidth, $newHeight);

    // Manejar transparencias para PNG y WEBP
    if ($mime == 'image/png' || $mime == 'image/webp') {
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);
        $transparent = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
        imagefilledrectangle($newImage, 0, 0, $newWidth, $newHeight, $transparent);
    }

    imagecopyresampled($newImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

    $success = false;
    switch ($mime) {
        case 'image/jpeg':
            $success = imagejpeg($newImage, $destination, $quality); // 0-100
            break;
        case 'image/png':
            // Calidad en PNG es de 0-9 (0 sin compresión, 9 máx compresión)
            $pngQuality = round((100 - $quality) / 100 * 9);
            $success = imagepng($newImage, $destination, $pngQuality);
            break;
        case 'image/webp':
            $success = imagewebp($newImage, $destination, $quality);
            break;
    }

    imagedestroy($image);
    imagedestroy($newImage);

    return $success;
}

echo "Iniciando la compresión de imágenes...\n";
echo "Límite: " . ($maxFileSize / 1024 / 1024) . " MB\n";
echo "====================================\n";

$processedCount = 0;
$totalSavedBytes = 0;

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        echo "Directorio no encontrado: $dir\n";
        continue;
    }

    $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($iterator as $file) {
        if ($file->isFile()) {
            $filePath = $file->getPathname();
            $fileSize = $file->getSize();

            if ($fileSize > $maxFileSize) {
                $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
                if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
                    echo "Comprimiendo: " . basename($filePath) . " (" . round($fileSize / 1024 / 1024, 2) . " MB)\n";
                    
                    // Comprimir e intentar sobreescribir manteniendo formato
                    $success = compressImage($filePath, $filePath, 70, $maxWidth, $maxHeight);

                    clearstatcache();
                    $newSize = filesize($filePath);
                    
                    // Si aun pesa más de 2MB, volver a intentar con menos calidad
                    if ($success && $newSize > $maxFileSize) {
                        echo "  ! Sigue pesando " . round($newSize / 1024 / 1024, 2) . " MB, comprimiendo más...\n";
                        compressImage($filePath, $filePath, 50, $maxWidth * 0.75, $maxHeight * 0.75);
                        clearstatcache();
                        $newSize = filesize($filePath);
                    }
                    
                    if ($success) {
                        $saved = $fileSize - $newSize;
                        $totalSavedBytes += $saved;
                        $processedCount++;
                        echo "  -> Éxito. Nuevo tamaño: " . round($newSize / 1024 / 1024, 2) . " MB (Ahorro: " . round($saved / 1024 / 1024, 2) . " MB)\n";
                    } else {
                        echo "  -> Error al procesar la imagen.\n";
                    }
                }
            }
        }
    }
}

echo "====================================\n";
echo "Proceso finalizado.\n";
echo "Imágenes procesadas: $processedCount\n";
echo "Espacio total ahorrado: " . round($totalSavedBytes / 1024 / 1024, 2) . " MB\n";
?>
