# Rangmandap website — build notes

Notes on how the site was built, the decisions made, and what's left to do.
The site itself lives in [`site/`](site/) — see [`site/README.md`](site/README.md)
for how to run and deploy it.

## What this is

A lightweight, **static** trilingual website (English / हिन्दी / मराठी) for
Rangmandap, a not-for-profit theatre in Nagpur run by the Nirupak Foundation.
No framework, no build step — plain HTML, CSS and vanilla JS.

Source content and all images come from the existing site at **rangmandap.org**.
Ticketing links out to **rangamandap.com**.

## Structure

```
site/
├── index.html          Home — hero, intro, Coming Up, philosophy, CTA
├── experience.html     Stages + spaces + house rules
├── contribute.html     Restoration progress, 3 ways to help, floor plans
├── about.html          About the theatre, purpose, philosophy
├── contact.html        Address, phone, email, hours
├── README.md
└── assets/
    ├── css/style.css   All styling (one file, CSS variables for the palette)
    ├── js/i18n.js      Translation dictionary (en/hi/mr) + language switching
    ├── js/main.js      Injects shared header/footer, mobile menu, carousel
    └── images/         Original photos/illustrations from rangmandap.org
```

## How the trilingual system works

- One set of pages serves all three languages.
- Any element with `data-i18n="some.key"` gets its text from the dictionary in
  `assets/js/i18n.js`, which has `en` / `hi` / `mr` blocks (124 keys each).
- The chosen language is saved in `localStorage` and re-applied on the next visit;
  first-time visitors get their browser language if it's one of the three.
- For Hindi/Marathi the font stack swaps to **Mukta** (Devanagari) automatically
  via `html[lang="hi"]` / `html[lang="mr"]` CSS rules.
- The **header and footer are injected by JS** (`main.js`) so navigation, the
  logo, social links and the tickets URL live in one place.

## Decisions made (content wasn't all on the old site)

- Wrote the intro and call-to-action copy; the old site was sparse there.
- Restoration **progress bar = ~25%**, derived from the figures on the old
  contribute page: ₹75,37,502 raised of a ₹2,97,35,880 total.
- **Art Gallery** card reuses the bookshop image — the old site had no distinct
  gallery photo. Swap when a real one is available.
- Palette: warm cream paper, maroon + gold accents. Fonts: Cormorant Garamond
  (display, Latin), Inter (body, Latin), Mukta (Devanagari).
- Social links in the footer point to bare facebook.com / instagram.com / etc.
  as placeholders — replace with the real handles.

## Verification done

- All 5 pages + assets serve HTTP 200 locally.
- `node --check` passes on both JS files.
- i18n key parity checked: en/hi/mr all have the same 124 keys (0 missing/extra).
- Headless Chrome render confirmed: header/footer inject, carousel builds,
  and switching to Marathi sets `<html lang="mr">` and translates the text.
- Homepage screenshot reviewed for layout/elegance.

## TODO before launch

- [ ] **Native-speaker review of Hindi & Marathi** in `assets/js/i18n.js`
      (strings are machine-drafted — names, addresses, CTAs especially).
- [ ] Compress `about-theater.png` and `philosophy.png` (~3.6 MB each; they
      lazy-load, but still worth shrinking).
- [ ] Replace placeholder social-media links with real handles.
- [ ] Add a real Art Gallery image.
- [ ] Confirm the ticketing domain (rangamandap.com vs rangmandap.com).
- [ ] Wire up the footer legal links (Privacy / Terms / Refund) — currently `#`.
