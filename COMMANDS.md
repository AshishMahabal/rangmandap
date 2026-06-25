# Commands used

The shell commands run while building and verifying the site, grouped by purpose.
Shell is **zsh** on macOS. Run from the repo root unless noted.

## 1. Download images from the live site

`coming-up/` images (1–12):

```bash
cd site/assets/images
base="https://rangmandap.org/assets/images"
for i in $(seq 1 12); do
  curl -sS -f -o "coming-up/image-$i.jpg" "$base/coming-up/image-$i.jpg"
done
```

`events/` images — note zsh does **not** word-split an unquoted variable, so use
an array:

```bash
cd site/assets/images
base="https://rangmandap.org/assets/images/events"
events=(gray-logo-removebg.png home-image-one.png about-theater.png philosophy.png \
        theater.png box.png bookshop.png cafe.jpeg gust-house.jpeg parking.jpeg \
        Rangmandap_gf.png Rangmandap_ff.png Rangmandap_sf.png)
for f in $events; do
  curl -sS -f -o "events/$f" "$base/$f"
done
```

Sanity-check what was downloaded:

```bash
file events/gray-logo-removebg.png events/home-image-one.png coming-up/image-1.jpg
```

## 2. Serve the site locally

```bash
cd site
python3 -m http.server 8765
# open http://localhost:8765
```

## 3. Check every page + asset returns HTTP 200

```bash
for p in index experience contribute about contact; do
  curl -s -o /dev/null -w "%{http_code}  $p.html\n" "http://localhost:8765/$p.html"
done
```

## 4. Validate the JavaScript

Syntax check:

```bash
node --check site/assets/js/main.js
node --check site/assets/js/i18n.js
```

Check that en / hi / mr have identical translation keys (no missing strings):

```bash
cd site
node -e '
let src = require("fs").readFileSync("assets/js/i18n.js","utf8");
src = src.replace(/const I18N =/, "globalThis.I18N =").replace(/window\.RM_I18N.*/,"");
eval(src);
const I18N = globalThis.I18N;
const enKeys = Object.keys(I18N.en);
for (const l of Object.keys(I18N)) {
  const k = new Set(Object.keys(I18N[l]));
  const missing = enKeys.filter(x => !k.has(x));
  console.log(`${l}: ${Object.keys(I18N[l]).length} keys, missing ${missing.length}`);
}'
```

## 5. Render in headless Chrome (JS executed)

`CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`

Dump the fully-rendered DOM of the homepage to confirm the header/footer inject
and the carousel builds:

```bash
"$CHROME" --headless --disable-gpu --no-sandbox --virtual-time-budget=4000 \
  --dump-dom "http://localhost:8765/index.html" > /tmp/rm-home.html
grep -o 'class="site-header"' /tmp/rm-home.html      # header injected?
grep -oc 'coming-up/image-' /tmp/rm-home.html        # carousel images built?
```

> Note: use the plain `--headless` flag. `--headless=new` together with a custom
> `--user-data-dir` hung in this environment.

Confirm translation works (a tiny self-contained page that calls `applyLang`):

```bash
cd site
cat > _test_mr.html <<'EOF'
<!doctype html><body>
<span id="a" data-i18n="nav.experience"></span>
<script src="assets/js/i18n.js"></script>
<script>window.RM_I18N.applyLang("mr");document.title="L:"+document.documentElement.lang;</script>
</body>
EOF
"$CHROME" --headless --disable-gpu --no-sandbox --virtual-time-budget=3000 \
  --dump-dom "http://localhost:8765/_test_mr.html" | grep -E '<title>|id="a"'
rm _test_mr.html
# expect: <title>L:mr</title> and id="a">अनुभव
```

## 6. Screenshot the homepage

```bash
"$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1280,2400 --virtual-time-budget=6000 \
  --screenshot=/tmp/rm-home.png "http://localhost:8765/index.html"
```

## 7. Stop the local server when done

```bash
pkill -f "http.server 8765"
```
