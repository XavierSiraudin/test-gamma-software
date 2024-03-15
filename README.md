# Test technique - Gamme Software

Voici le code source se rapportant à l'exercice que vous m'avez donné.

Durée : ~4h30

Structure : 
 - dossier `back` : l'API Symfony 6.4
 - dossier `front` : l'IHM Angular 17
 - MySQL 8.0 comme SGBD

Fonctionnement :
- Symfony
  - un simple `composer install` dans le dossier `back` pour installer les dépendances
  - création de la base de données
  - changement de valeurs des variables d'environnement dans le fichier `back/.env` ou surcharge dans un `back/.env.local`
  - application de la migration
  - j'utilise `symfony serve` dans le dossier `back` en local pour lancer l'API, qui est accessible à `https://localhost:8000`
    (certificats auto-gérés par [Symfony CLI](https://symfony.com/download))
- Angular
  - j'ai utilisé Yarn pour les dépendances, donc j'utiliserais `yarn install --frozen-lockfile` dans le dossier `front`
  - changement de valeur si nécessaire pour l'URL de l'API dans `front/src/environments/environment.development.ts`
  - j'utilise `ng serve --live-reload=false` dans le dossier `front`
  - l'IHM est accessible à `http://localhost:4200`

J'ai également pris le temps d'installer PHP CS Fixer sur Symfony, et de faire passer `ng lint` et `ng test` sur Angular.