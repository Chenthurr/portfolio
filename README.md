# Chenthurr C K — AI/ML Engineer Portfolio

A premium, interactive personal portfolio website built with React + Vite + Tailwind CSS.
100% frontend — no backend required. Designed to deploy directly to Netlify.

## Theme Colors
- **Dominant (60%)** `#0B0F19` — Midnight Blue background
- **Secondary (30%)** `#E2E8F0` — Cool Gray text
- **Accent (10%)** `#38BDF8` — Sky Cyan highlights & interactive elements

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Deploy the `dist` folder to Netlify (or connect the repo — `netlify.toml` is already
   configured with the correct build command, publish directory, and SPA redirect rule
   so client-side routes like `/projects` or `/admin` don't 404 on refresh).

## Admin Panel
- Navigate to `/admin`
- Primary passkey: `Chen@1234#`
- Change the password anytime from Admin → Change Password
- Every section (Profile, About, Projects, Skills, Experience, Achievements,
  Certifications, Resume, Social Links, Site Settings) is editable from the panel
- All content is stored in the browser's localStorage — no database, no server
- Use Import/Export to back up or migrate your data (exports a JSON file)

## Portrait
- Default portrait lives at `public/assets/chenthurr-portrait.jpg`
- Replace it anytime from Admin → Profile Image (drag/drop a new image — stored
  locally in the browser, overriding the default)

## Resume
- The Resume page links out to your Google Drive folder by default
  (editable at Admin → Site Settings → "Resume Google Drive Link")
- For a true inline PDF preview + one-click download, upload the actual PDF file
  from Admin → Resume — it's stored as a local data URL, still 100% frontend

## Features
- Custom cursor themed to the site's Sky Cyan accent
- Dedicated pages: Home, About, Projects, Skills, Experience, Achievements,
  Certifications, Resume, Contact
- Project filtering and detail modals
- Full admin content management with a changeable passkey
- Fully responsive, keyboard accessible, reduced motion support
