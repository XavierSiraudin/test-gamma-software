<?php

namespace App\Service;

use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Wrapper service to centralize the logic executed when receiving a file and parsing it.
 */
class SpreadsheetParser
{
    public function __construct(private readonly string $importDir)
    {
    }

    /**
     * Transforms an UploadedFile to an array.
     *
     * @param UploadedFile $file the object generated by Symfony to abstract a file uploaded via multipart
     *
     * @return array[] array of array representing the rows of the file
     *
     * @throws \Random\RandomException Can be thrown by the {@link \random_bytes} function
     */
    public function toArray(UploadedFile $file): array
    {
        $filename = sprintf('%s-%s', bin2hex(random_bytes(5)), $file->getClientOriginalName());

        $file->move($this->importDir, $filename);

        $spreadsheet = IOFactory::load(sprintf('%s%s%s', $this->importDir, DIRECTORY_SEPARATOR, $filename));
        $spreadsheet->getActiveSheet()->removeRow(1);

        return $spreadsheet->getActiveSheet()->toArray(null, true, true, true);
    }
}
