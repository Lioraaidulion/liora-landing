# Liora AI — Landing page

Site vitrine one-page (un seul fichier `index.html`, zéro dépendance). Hébergé en statique sur Render.

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

## À finaliser
- Logo lion définitif (remplacer `<symbol id="lion">`), favicon `favicon.svg`, image `og-image.png`.
- Numéro de téléphone : rajouter dans la ligne `.cta-direct` si souhaité.
- Email de contact : `contact@lioraai.fr` (déjà en place).
