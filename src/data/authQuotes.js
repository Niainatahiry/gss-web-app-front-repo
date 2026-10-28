/**
 * Contenu rotatif de la page de connexion.
 *
 * Une entrée = une citation + son visuel. Une entrée est tirée au hasard à
 * chaque chargement complet de la page, sans répéter la précédente (mémorisée
 * dans `sessionStorage`).
 *
 * Pour ajouter une variante :
 *  1. dépose le visuel dans `src/assets/images/auth/`
 *  2. importe-le en haut de ce fichier
 *  3. duplique un objet ci-dessous avec un `id` unique.
 *
 * Propriétés :
 *  - `lines`          : lignes de la citation ; `accent: true` passe une ligne
 *                       en jaune (par défaut la dernière ligne est mise en avant).
 *  - `author/source`  : signature affichée sous la citation.
 *  - `image`          : visuel du personnage (facultatif).
 *  - `imageClassName` : réglage du cadrage du visuel (taille + décalage
 *                       horizontal). Le visuel est ancré sur le bord gauche de
 *                       la colonne de texte : le décalage négatif sert à placer
 *                       la tête juste avant le début de la citation. À ajuster
 *                       selon le rendu de chaque image.
 */

import ellieArt from '../assets/images/auth/ellie-auth.webp'

export const authQuotes = [
  {
    id: 'ellie-tlou',
    lines: [
      { text: 'No matter what,' },
      { text: 'you keep finding' },
      { text: 'something to fight for.', accent: true },
    ],
    author: 'Ellie Williams',
    source: 'The last Of Us',
    image: ellieArt,
    imageClassName: 'w-[28.5vw] max-w-[493px] -translate-x-[66%]',
  },
]
