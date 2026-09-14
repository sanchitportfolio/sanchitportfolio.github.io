# Sanchit S. Bhadoria | Engineering Portfolio

A responsive, dependency-free engineering portfolio prepared for GitHub Pages.

## Files

- `index.html`: portfolio content and structure
- `styles.css`: responsive visual design
- `script.js`: mobile navigation and current year
- `404.html`: fallback page
- `assets/Sanchit_Bhadoria_Resume.pdf`: downloadable résumé
- `PROMPT.md`: reusable prompt for expanding the portfolio with an AI coding assistant

## Publish with GitHub Pages

### Recommended: personal portfolio repository

1. Create a public repository named `YOUR-USERNAME.github.io`.
2. Upload all files and the `assets` folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then save.
6. Visit `https://YOUR-USERNAME.github.io` after deployment completes.

### Alternative: project repository

You may use a repository such as `engineering-portfolio`. Its URL will generally be `https://YOUR-USERNAME.github.io/engineering-portfolio/`. This site uses relative links, so it supports either approach.

## Before publishing

1. In `index.html`, replace the disabled LinkedIn placeholder with your profile URL.
2. Review descriptions and remove anything confidential or proprietary.
3. Decide whether you want your résumé and email address publicly accessible.
4. Add approved project images later under `assets/images/` and include meaningful `alt` text.
5. Test on desktop and mobile.

## Local preview

Open `index.html` directly, or run a simple local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Suggested first commit

```bash
git add .
git commit -m "Create engineering portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

## Privacy note

GitHub Pages websites are public. Do not publish proprietary drawings, customer-controlled information, internal performance data, personal addresses, or restricted photographs.


## Image update

This version includes an optimized hero background, three engineering project galleries, and a personal gallery. Web-ready `.webp` files are in `assets/images/`; original uploads are retained in `assets/images/originals/`. Confirm employer/customer authorization before publishing worksite or vehicle-interior photography.
