<?php

namespace App\Entity;

use App\Repository\BandRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: BandRepository::class)]
class Band
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Le nom du groupe est obligatoire.')]
    #[Assert\Length(max: 255, maxMessage: 'Le nom du groupe peut faire au plus 255 caractères.')]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: 'Le pays du groupe peut faire au plus 255 caractères.')]
    private ?string $country = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: 'La ville du groupe peut faire au plus 255 caractères.')]
    private ?string $city = null;

    #[ORM\Column(nullable: true)]
    private ?int $startingYear = null;

    #[ORM\Column(nullable: true)]
    private ?int $separationYear = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: 'Le nom des fondateurs du groupe peut faire au plus 255 caractères.')]
    private ?string $founders = null;

    #[ORM\Column(nullable: true)]
    private ?int $membersCount = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Length(max: 255, maxMessage: 'Le style musical du groupe peut faire au plus 255 caractères.')]
    private ?string $musicalStyle = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(?string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getStartingYear(): ?int
    {
        return $this->startingYear;
    }

    public function setStartingYear(?int $startingYear): static
    {
        $this->startingYear = $startingYear;

        return $this;
    }

    public function getSeparationYear(): ?int
    {
        return $this->separationYear;
    }

    public function setSeparationYear(?int $separationYear): static
    {
        $this->separationYear = $separationYear;

        return $this;
    }

    public function getFounders(): ?string
    {
        return $this->founders;
    }

    public function setFounders(?string $founders): static
    {
        $this->founders = $founders;

        return $this;
    }

    public function getMembersCount(): ?int
    {
        return $this->membersCount;
    }

    public function setMembersCount(?int $membersCount): static
    {
        $this->membersCount = $membersCount;

        return $this;
    }

    public function getMusicalStyle(): ?string
    {
        return $this->musicalStyle;
    }

    public function setMusicalStyle(?string $musicalStyle): static
    {
        $this->musicalStyle = $musicalStyle;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
