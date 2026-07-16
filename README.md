# THE SOIRÉE — Onepage événementielle

**Dîner dansant & Showcase · La soirée du boss · par DJ BIX**
Samedi 12 septembre 2026 · dès 18h30 · Salle Foirail — Piton Saint-Leu · **COMPLET**

Site statique premium (HTML5 / CSS3 / JS vanilla), sans build, sans backend, sans dépendance obligatoire. Fonctionne en local en ouvrant simplement `index.html`.

---

## 📁 Structure

```
the-soiree/
├── index.html      # Page unique (toutes les sections)
├── style.css       # Direction artistique complète (tokens en tête de fichier)
├── script.js       # Loader, particules, countdown, reveal, parallax, tilt 3D…
├── README.md
└── assets/         # Vos médias (voir ci-dessous)
```

## 🖼 Assets attendus

Déposez vos fichiers dans `/assets` avec ces noms exacts :

| Fichier | Usage |
|---|---|
| `affiche-the-soiree.jpg` | Hero (carte 3D) + galerie + Open Graph |
| `programme-the-soiree.jpg` | Galerie |
| `logo-djbix.png` | Partenaires |
| `logo-424.png` | Partenaires |
| `video-annonce.mp4` | Galerie (vidéo) |
| `video-teaser.mp4` | Galerie (vidéo) |
| `artiste-madii-madii.jpg` | Carte artiste (carré, ex. 600×600) |
| `artiste-lea-churros.jpg` | Carte artiste |
| `artiste-anthony-gussie.jpg` | Carte artiste |
| `artiste-speaker.jpg` | Carte artiste |
| `artiste-deejay-patrice.jpg` | Carte artiste |
| `artiste-dany-malli.jpg` | Carte artiste |

➡️ **Si un fichier est absent, le site affiche automatiquement un placeholder propre et cohérent avec la DA.** Rien ne casse.

## 🚀 Déploiement GitHub Pages

1. Créez un dépôt GitHub (ex. `the-soiree`).
2. Déposez tous les fichiers **à la racine** du dépôt (index.html, style.css, script.js, README.md, dossier `assets/`).
3. Sur GitHub : **Settings → Pages**.
4. Dans **Build and deployment → Source**, choisissez **Deploy from a branch**.
5. Branche : `main` · Dossier : `/ (root)` → **Save**.
6. Attendez 1–2 minutes : la page est en ligne sur
   `https://VOTRE-UTILISATEUR.github.io/the-soiree/`

### Après mise en ligne
- Dans `index.html`, mettez à jour la balise `<link rel="canonical">` avec votre URL réelle.
- Pour un aperçu Facebook parfait, remplacez `og:image` par l'URL **absolue** de l'affiche :
  `https://VOTRE-UTILISATEUR.github.io/the-soiree/assets/affiche-the-soiree.jpg`

## 🎨 Personnalisation rapide

Toute la DA est pilotée par les variables CSS en tête de `style.css` :

```css
--noir: #0b0507;      /* fond */
--rouge: #a3122b;     /* rouge profond */
--or: #d3a64b;        /* doré */
--ivoire: #f6efe2;    /* blanc cassé */
--fumee: #5fb6dc;     /* bleu fumée */
```

- **Photos artistes** : déposez simplement les fichiers `artiste-*.jpg` dans `/assets` (noms exacts ci-dessus). Sans photo, la carte affiche l'initiale dorée de l'artiste.
- **Countdown** : la date cible est dans `script.js` (`TARGET`), réglée sur le 12/09/2026 18h30 heure Réunion (UTC+4).
- **Partenaires** : dupliquez un bloc `.partner` pour ajouter un logo.

## ✅ Inclus

- Compte à rebours, loader d'ouverture, bouton retour en haut
- Bandeau SOLD OUT animé (marquee + tampon sur l'affiche)
- Particules dorées & bleues, halos de fumée animés, parallax, tilt 3D de l'affiche
- Reveal au scroll, FAQ accordéon, CTA sticky mobile
- Boutons Appel / WhatsApp / Google Maps
- Bloc « Devenir partenaire » (sponsors) avec WhatsApp pré-rempli — le message se modifie dans le lien `wa.me` de `index.html` (section `#devenir-partenaire`)
- Version imprimable des infos pratiques (bouton « Imprimer les infos »)
- SEO de base + Open Graph + favicon
- Responsive mobile-first, `prefers-reduced-motion` respecté

---

*Une direction artistique inspirée de l'univers officiel de l'événement.*
