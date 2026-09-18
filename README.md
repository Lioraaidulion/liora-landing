# Liora AI — Landing page

Site vitrine multi-pages (`index.html` + pages sectorielles + pages légales), zéro dépendance de build. Hébergé en statique sur Render. Positionnement : cabinets dentaires, agences immobilières, cabinets d'avocats.

## Déploiement Render (Static Site, gratuit)

1. Pousser ce dépôt sur GitHub/GitLab (voir ci-dessous).
2. Render Dashboard → **New → Static Site** → connecter le dépôt.
   - **Build Command** : *(vide)*
   - **Publish Directory** : `.`
3. Render attribue une URL `https://<nom>.onrender.com` et active **HTTPS** automatiquement.

> Alternative : **New → Blueprint** (utilise `render.yaml` fourni).

## Domaines

- **lioraai.fr** + **www.lioraai.fr** → site Render (custom domains).
- **lioraai.ch** → redirection 301 vers `https://lioraai.fr` (via la redirection OVH).

### DNS chez OVH — lioraai.fr
| Type  | Nom (sous-domaine) | Valeur                       |
|-------|--------------------|------------------------------|
| A     | *(vide / `@`)*     | `216.24.57.1`                |
| CNAME | `www`              | `<nom>.onrender.com.`        |

### lioraai.ch → 301
OVH Manager → domaine `lioraai.ch` → **Redirection** → 301 visible vers `https://lioraai.fr`
(faire aussi `www.lioraai.ch`).

## Pousser sur GitHub
```bash
git remote add origin https://github.com/<user>/liora-landing.git
git branch -M main
git push -u origin main
```

## À finaliser avant mise en ligne définitive

- **Mentions légales** (`mentions-legales.html`) : compléter les champs `[À compléter]` — forme juridique, adresse du siège, SIRET, directeur de publication. Obligatoire légalement (LCEN art. 6-III).
- **Analytics** (`consent.js`) : remplacer le placeholder `GA_MEASUREMENT_ID = "G-XXXXXXXXXX"` par votre vrai identifiant Google Analytics 4. Tant que ce n'est pas fait, le bandeau cookies fonctionne mais rien n'est envoyé à Google.
- **Envoi du formulaire de démo** (dans `index.html`, variable `FORM_ENDPOINT`) : actuellement le formulaire ouvre le client mail de l'utilisateur (`mailto:`). Pour un envoi serveur direct, créez un formulaire gratuit sur [Formspree](https://formspree.io) et collez son URL dans `FORM_ENDPOINT`.
- **Réseaux sociaux** (pied de page de chaque HTML, bloc `.footer-social`) : les liens LinkedIn/Instagram pointent vers `#` — à remplacer par vos vraies pages une fois créées.
- Logo lion définitif (remplacer `<symbol id="lion">`), favicon `favicon.svg`, image `og-image.png`.
- Numéro de téléphone : rajouter dans la ligne `.cta-direct` si souhaité.
- Email de contact : `contact@lioraai.fr` (déjà en place).

## Structure du site

- `index.html` — accueil (3 secteurs)
- `pour-cabinets-dentaires.html`, `pour-agences-immobilieres.html`, `pour-cabinets-avocats.html` — pages sectorielles
- `pourquoi-cabinet-dentaire-perd-patients-telephone.html` — article de blog
- `rgpd.html`, `cgu.html`, `mentions-legales.html` — pages légales
- `404.html` — page d'erreur personnalisée (servie automatiquement par Render pour toute route inconnue)
- `consent.js` — bandeau cookies + chargement conditionnel de Google Analytics
- `site.css` — feuille de style partagée par toutes les pages sauf `index.html` (qui garde son propre `<style>` pour ses sections spécifiques : hero, stats, tableau comparatif, formulaire)
- `pour-chirurgie-esthetique.html` — ancienne offre retirée du positionnement ; conservée uniquement comme page de redirection 301 vers `pour-cabinets-dentaires.html` (voir `render.yaml`) pour préserver le SEO des liens externes existants
