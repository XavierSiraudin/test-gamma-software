<?php

namespace App\Form;

use App\Entity\Band;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BandImportType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('A', TextType::class, [
                'property_path' => 'name',
            ])
            ->add('B', TextType::class, [
                'property_path' => 'country',
            ])
            ->add('C', TextType::class, [
                'property_path' => 'city',
            ])
            ->add('D', IntegerType::class, [
                'property_path' => 'startingYear',
            ])
            ->add('E', IntegerType::class, [
                'property_path' => 'separationYear',
            ])
            ->add('F', TextType::class, [
                'property_path' => 'founders',
            ])
            ->add('G', TextType::class, [
                'property_path' => 'membersCount',
            ])
            ->add('H', TextType::class, [
                'property_path' => 'musicalStyle',
            ])
            ->add('I', TextType::class, [
                'property_path' => 'description',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Band::class,
        ]);
    }
}
