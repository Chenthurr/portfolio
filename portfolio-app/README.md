# Chenthurr C K — Developer Portfolio

Interactive developer portfolio with live system visualizers for AI/ML, computer vision, and full-stack projects. Built with React, Vite, Tailwind CSS, Lucide Icons, and Recharts.

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploy to Netlify

**Option A — connect your Git repo (recommended):**
1. Push this folder to a GitHub repo.
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Pick your repo. Netlify will auto-detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**. You'll get a live `.netlify.app` URL, and every future `git push` redeploys automatically.

**Option B — drag and drop (no Git needed):**
1. Run `npm install` then `npm run build` locally — this creates a `dist/` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the `dist/` folder onto the page.

**Option C — Netlify CLI:**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```
