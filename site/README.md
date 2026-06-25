# Rangmandap — trilingual website

A lightweight, elegant, **static** site for Rangmandap, a not-for-profit theatre and
performing-arts space in Nagpur (managed by the Nirupak Foundation).

- **No build step, no framework** — plain HTML, CSS and a little vanilla JS.
- **Three languages** in one set of pages: English, हिन्दी, मराठी.
- Ticketing links out to **rangmandap.com**.
- Content and images are based on the existing site at rangmandap.org.

## Pages

| File | Section |
|------|---------|
| `index.html` | Home — hero, intro, *Coming Up*, philosophy, call to action |
| `experience.html` | The stages and spaces, house rules |
| `contribute.html` | Restoration progress, three ways to help, floor plans |
| `about.html` | About the theatre, purpose, philosophy |
| `contact.html` | Address, phone, email, hours |

## Run locally

```bash
cd site
python3 -m http.server 8765
# open http://localhost:8765
```

(Open via a server, not `file://` — the language system and shared header/footer
are loaded with JavaScript.)

## How it works

- **Shared header & footer** are injected by `assets/js/main.js`, so there's one
  place to change navigation, the logo, social links and the tickets URL
  (`TICKETS_URL` at the top of that file).
- **Translations** live in `assets/js/i18n.js` as a single dictionary with
  `en` / `hi` / `mr` keys. Any element with `data-i18n="some.key"` gets its text
  from the dictionary. The chosen language is saved in `localStorage`.

### Editing content

1. Find the `data-i18n` key on the element (in the `.html` file).
2. Edit its value under **all three** languages in `assets/js/i18n.js`.

> ⚠️ **The Hindi and Marathi strings were machine-drafted.** Please have a native
> speaker review `assets/js/i18n.js` before going live — especially names,
> addresses and the call-to-action wording.

### Images

All photos/illustrations in `assets/images/` are the originals from rangmandap.org.
Two PNGs (`about-theater.png`, `philosophy.png`) are ~3.6 MB — worth compressing
before launch, but they lazy-load so they don't block the page.

## Deploying to GitHub Pages

A workflow at `.github/workflows/pages.yml` publishes the `site/` folder
automatically. After pushing to GitHub:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. The site goes live at `https://<user>.github.io/<repo>/`.

Share that URL for comments.
