<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class FileController extends Controller
{
    public function download($path)
    {
        $decodedPath = urldecode($path);

        if (Storage::exists($decodedPath)) {
            return Storage::download($decodedPath);
        }

        abort(404, 'File not found');
    }

    public function zip()
    {
        $zipFileName = 'all_files.zip';
        $zipFilePath = storage_path('app/' . $zipFileName);
        $directoryPath = storage_path('app');

        // Удаляем старый архив, если он существует
        if (file_exists($zipFilePath)) {
            unlink($zipFilePath);
        }

        // Создаем новый ZIP-архив
        $zip = new ZipArchive;
        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $files = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($directoryPath), \RecursiveIteratorIterator::LEAVES_ONLY);

            foreach ($files as $name => $file) {
                // Пропускаем директории (они будут добавлены автоматически)
                if (!$file->isDir()) {
                    $filePath = $file->getRealPath();
                    // Убираем из пути к файлу путь к корневой директории, чтобы сохранить структуру папок в архиве
                    $relativePath = substr($filePath, strlen($directoryPath) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }

            $zip->close();
        } else {
            abort(500, 'Could not create ZIP file.');
        }

        return response()->download($zipFilePath)->deleteFileAfterSend();
    }

    public function image($path)
    {
        $decodedPath = urldecode($path);

        if (Storage::exists($decodedPath)) {
            $fileContent = Storage::get($decodedPath);
            $mimeType = Storage::mimeType($decodedPath);

            return Response::make($fileContent, 200, [
                'Content-Type' => $mimeType,
            ]);
        }

        abort(404, 'Image not found');
    }
}
