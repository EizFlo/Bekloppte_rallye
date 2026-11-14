# Die total bekloppte Rallye – App-Paket

Alle Dateien in diesem Ordner gehören zusammen:

- `index.html` – das ganze Spiel (Version 139)
- `manifest.webmanifest` + `icons/` – Name, Farben und Icons, damit das Spiel als App auf den Startbildschirm kann
- `sw.js` – Offline-Speicher: nach dem ersten Besuch läuft das Spiel auch ohne Internet (der Onlinemodus braucht Internet)
- `favicon.ico` – kleines Symbol im Browser-Tab
- `.nojekyll` – sagt GitHub Pages, dass es die Dateien unverändert ausliefern soll

## Auf GitHub veröffentlichen

1. Auf GitHub ein neues Repository anlegen (z. B. `rallye`), öffentlich.
2. Alle Dateien aus diesem Ordner hochladen („Add file → Upload files“), inklusive dem Ordner `icons`.
3. Im Repository auf **Settings → Pages** gehen, bei „Source“ **Deploy from a branch** wählen, Branch `main` und Ordner `/ (root)`, speichern.
4. Nach etwa einer Minute ist das Spiel unter `https://DEINNAME.github.io/rallye/` erreichbar.

## Als App installieren

- **Android (Chrome):** Seite öffnen → Menü ⋮ → „App installieren“ oder „Zum Startbildschirm hinzufügen“.
- **iPhone (Safari):** Seite öffnen → Teilen-Knopf → „Zum Home-Bildschirm“.

## Neue Version einspielen

Einfach die neue `index.html` hochladen und die alte ersetzen. In `sw.js` die Zeile `const CACHE='rallye-v139';` auf die neue Versionsnummer ändern, dann holen sich alle Geräte beim nächsten Start die neue Fassung.
