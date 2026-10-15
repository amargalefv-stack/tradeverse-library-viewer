# Editor de pàgines v2 — protecció i procediment

## Enllaç estable
- Entrada estable: https://amargalefv-stack.github.io/tradeverse-library-viewer/editor-pagina.html
- Implementació versionada actual: `editor-pagina-v2.html`
- Versió: 2.0.0
- Branca del codi de les pàgines: `PAGEWEB01` de `amargalefv-stack/tradeverse-project-master`.

## Disseny
- L'editor es publica a GitHub Pages, mai a Vercel.
- La llista de pàgines es construeix llegint el Git Tree de `PAGEWEB01` i `web/data/page-editor.json`. No s'usa una matriu de noms/rutes hardcoded.
- El token GitHub el proporciona l'usuari al navegador i només es desa a `sessionStorage`; no es posa al codi ni al repositori.
- Per llegir/modificar `PAGEWEB01` es necessita accés de repositori. Per demanar el workflow manual també es necessita permís d'executar workflows (`workflow` en PAT clàssic o accés Actions equivalent).
- Publicar una pàgina actualitza la llista explícita `preview.published_routes` i després executa `.github/workflows/publish-preview-manual.yml`. El workflow només es dispara manualment: no hi ha trigger `push`.
- El workflow registra a GitHub la URL de Preview que retorna Vercel. L'editor mostra URL només si hi ha deployment `preview` verificat i la ruta hi està publicada; altrament, mostra `null`.
- Esborrar de Preview retira la ruta de la llista explícita i demana un nou deployment Preview, que retorna 404 per a la ruta retirada. Les URL immutables dels deployments antics de Vercel poden continuar accessibles fins i tot després de retirar una ruta del deployment nou.
- Esborrar una pàgina de codi crea, en un únic commit de `PAGEWEB01`, una còpia a `web/_page_editor_backups/PAGEWEB01/<timestamp>/...` i elimina el fitxer original. No dispara un deployment per si sol; la retirada de Preview és una acció separada.
- La creació de pàgines i la gestió de publicació d'articles dinàmics no s'implementen en aquesta versió, tal com s'ha demanat.

## Protecció contra pèrdua / rollback
- L'inventari anterior es preserva a `editor-pagina-inventari-2026-10-15.html`.
- També es preserva en la branca `backup/editor-pagina-inventory-before-v2-2026-10-15`.
- No editar la versió publicada en el mateix fitxer quan es faci la propera millora. Crear `editor-pagina-v2.0.1.html` (o una nova versió), validar-la i només llavors canviar l'entrada estable `editor-pagina.html`.
- No esborrar fitxers de `PAGEWEB01` sense còpia de seguretat i confirmació atòmica en el mateix commit.
- L'editor no modifica la seva pròpia implementació ni cap fitxer del repositori `tradeverse-library-viewer`.

## Estat de verificació d'aquesta entrega
- Codi HTML/JavaScript generat i comprovació sintàctica JavaScript executada localment.
- Còpia de seguretat del codi anterior confirmada a GitHub.
- Pendent abans de considerar l'editor totalment operatiu: una sessió real del propietari amb un token que tingui els permisos indicats, prova d'una publicació Preview i comprovació del URL retornat. No afirmar aquesta prova fins que s'hagi executat.
