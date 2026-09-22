# AB Hukuk Bürosu

Responsive Turkish and English static website. Open `index.html` for Turkish and `en.html` for English through a local HTTP server. The root directory is ready for static hosting; no build process, database, API keys or package installation is required.

## Preview

With Node.js installed, run `node preview.mjs` and open http://127.0.0.1:4173. With Python installed, `python -m http.server 4173 --bind 127.0.0.1` also works.

## Contents

- `index.html` / `en.html`: full, independently readable language versions, including metadata and alternate-language links.
- `assets/style.css`: responsive presentation and reduced-motion rules.
- `assets/app.js`: mobile navigation, practice filters/search, accessible process tabs, meeting preparation, contact topic and information dialogs.
- `assets/bodrum-*.webp`: two oil-painting assets, each with two added boats, compressed for the web.
- `assets/vendor` and `assets/fonts`: locally served libraries and typefaces.

The Google map connects only after the visitor explicitly requests it. No analytics, advertising scripts, data-submission forms or browser storage are added. Phone and email links use the visitor's own applications.

## Editing

Keep both language files in sync when changing content. Contact details are also present in JSON-LD metadata. Practice headings, categories and descriptive text are editable directly in HTML. Meeting preparation lists live in the TR/EN dictionaries in `assets/app.js`.

## Before launch

Review the draft practice descriptions and legal/privacy text and confirm usage rights for the supplied photographic references. `CNAME` is retained as supplied. A preview or branch does not change the domain's DNS or publish a new site. See `THIRD_PARTY_NOTICES.md` for dependencies, source-image notes and design references.

