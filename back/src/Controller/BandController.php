<?php

namespace App\Controller;

use App\Entity\Band;
use App\Form\BandImportType;
use App\Form\BandType;
use App\Service\SpreadsheetParser;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/bands', name: 'band.')]
class BandController extends AbstractController
{
    #[Route('/import', name: 'import', methods: ['POST'])]
    #[Rest\View(statusCode: Response::HTTP_CREATED)]
    public function import(
        Request $request,
        SpreadsheetParser $spreadsheetParser,
        EntityManagerInterface $entityManager
    ): ?FormInterface {
        $file = $request->files->get('file');

        if (!$file instanceof UploadedFile) {
            throw new BadRequestHttpException();
        }

        // Get the array of parsed bands
        $result = $spreadsheetParser->toArray($file);

        // Create the form by wrapping our custom BandImportType in a CollectionType to validate every row at once
        $form = $this->createForm(CollectionType::class, null, [
            'entry_type' => BandImportType::class,
            'allow_add' => true,
        ]);

        $form->submit($result);

        // If the data is valid, we can persist it to the database
        if ($form->isSubmitted() && $form->isValid()) {
            foreach ($form->getData() as $band) {
                $entityManager->persist($band);
            }

            $entityManager->flush();

            return null;
        }

        return $form;
    }

    #[Route('', name: 'index', methods: ['GET'])]
    #[Rest\View(serializerGroups: ['read:band'])]
    public function index(EntityManagerInterface $entityManager): array
    {
        // Simply returns every band in the database
        return $entityManager
            ->getRepository(Band::class)
            ->findAll();
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    #[Rest\View(serializerGroups: ['read:band'])]
    public function show(Band $band): Band
    {
        return $band;
    }

    #[Route('/{id}', name: 'replace', methods: ['PUT'])]
    #[Rest\View(serializerGroups: ['read:band'])]
    public function replace(Band $band, Request $request, EntityManagerInterface $entityManager): Band|FormInterface
    {
        // Initializes the form with the data already persisted
        $form = $this->createForm(BandType::class, $band);

        // Submit the form with the data we received
        $form->submit($request->request->all());

        // If everything checks out, then flush (no need to persist since the entity is already managed)
        // and return the entity for serialization
        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $band;
        }

        return $form;
    }

    #[Route('/{id}', name: 'remove', methods: ['DELETE'])]
    public function remove(Band $band, EntityManagerInterface $entityManager): void
    {
        $entityManager->remove($band);
        $entityManager->flush();
    }
}
