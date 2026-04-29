# Glow & Glam 🌿

## Description
Site e-commerce de produits de beauté permettant de parcourir, filtrer et acheter des produits de soin.

## Technologies utilisées
- HTML
- CSS
- JavaScript

## Fonctionnalités principales
- Affichage des produits par catégorie
- Ajout et suppression d'articles dans le panier
- Calcul automatique du total
- Sauvegarde du panier avec localStorage
- Panneau panier latéral interactif

## Lien GitHub Pages
https://lama-zaouga.github.io/zaouga_lama_glow_and_glam/

## Nouveautés explorées
- Utilisation de localStorage pour sauvegarder le panier
- Manipulation dynamique du DOM avec JavaScript
- Déploiement d'un site sur GitHub Pages

## Difficultés rencontrées
- Les chemins absolus des images ne fonctionnaient pas sur d'autres machines
- local Storage : comprendre comment sauvegarder et récupérer un tableau d'objets avec JSON.stringify et JSON.parse
- Manipulation du DOM : mettre à jour l'affichage du panier en temps réel sans recharger la page était complexe au début
- Suppression d'un article : identifier et supprimer le bon article dans le tableau cart[] en utilisant son index sans affecter les autres articles


## Solutions apportées
- Remplacement des chemins absolus par des chemins relatifs (dossier images/)
- Utilisation de JSON.stringify() pour sauvegarder et JSON.parse() pour récupérer les données du panier depuis localStorage
- Création d'une fonction renderCartItems() appelée à chaque modification du panier pour reconstruire l'affichage dynamiquement
- Utilisation de data-index sur chaque bouton "Supprimer" pour identifier précisément l'article à retirer du tableau
