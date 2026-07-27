# VETS4VETS26

Official VETS4VETS26 website, built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

The production build is configured for:

```text
https://dylanjdev.github.io/vets4vets/
```

Deploy the current project to the `gh-pages` branch:

```bash
npm run deploy
```

The command builds the site, adds `.nojekyll`, and pushes `dist` to the
`gh-pages` branch. In the GitHub repository, set **Settings → Pages → Build and
deployment → Source** to **Deploy from a branch**, then select:

- Branch: `gh-pages`
- Folder: `/ (root)`

The included `404.html` redirect restores client-side routes, so direct visits
and browser refreshes work on `/mission`, `/services`, and `/contact`.
