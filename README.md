# Franck Hoffmann — Portfolio

Portfolio site for a Product Design Leader. Built with Vite + React + Tailwind CSS v4, deployed to GitHub Pages.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** (client-side SPA routing)
- **Radix UI** (accessible dropdown + lightbox dialog)

---

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`.

---

## Deploying to GitHub Pages

### 1. Create the GitHub repo

Name it something memorable — this becomes part of your site URL:
```
https://YOUR_USERNAME.github.io/REPO_NAME/
```

Suggested name: **`franck-hoffmann-portfolio`**

### 2. Push the code

```bash
cd /Users/franckhoffmann/projects/Portfolio
git init
git add .
git commit -m "Initial portfolio build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/franck-hoffmann-portfolio.git
git push -u origin main
```

### 3. Enable GitHub Pages

In your GitHub repo settings:

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

The workflow at `.github/workflows/deploy.yml` runs automatically on every push to `main`. It reads `github.event.repository.name` to set the Vite base path — so the repo name drives everything automatically.

### 4. Done

Your site will be live at:
```
https://YOUR_USERNAME.github.io/franck-hoffmann-portfolio/
```

The first deploy takes ~2 minutes. Subsequent pushes deploy in about 60 seconds.

---

## Adding a new case study

1. Create `src/pages/YourCaseName.tsx` (copy `SailPointDashboard.tsx` as a template)
2. Add a route in `src/main.tsx`
3. Add images to `public/images/`
4. Update the `CASE_STUDIES` array in `src/pages/Home.tsx`
5. Update the `WHAT_ITEMS` array in `src/components/Nav.tsx` if needed

---

## Project structure

```
public/
  images/           ← All case study images (served as static files)
  404.html          ← GitHub Pages SPA routing fix

src/
  components/
    Nav.tsx         ← Sticky nav with "What" dropdown + mobile hamburger
    Footer.tsx      ← Minimal footer with back-to-top

  pages/
    Home.tsx        ← Case study grid landing page
    SailPointDashboard.tsx  ← First live case study
    ComingSoon.tsx  ← Placeholder for in-progress pages

  styles/
    index.css       ← Imports all below
    fonts.css       ← Google Fonts (Inter + Liberation Mono)
    tailwind.css    ← Tailwind v4 + tw-animate-css
    theme.css       ← CSS custom properties + Tailwind theme

  main.tsx          ← React root + BrowserRouter + all routes

.github/
  workflows/
    deploy.yml      ← Build & deploy on push to main

index.html          ← Entry HTML with GitHub Pages SPA redirect handler
vite.config.ts      ← Base path set via VITE_BASE_PATH env var
```
