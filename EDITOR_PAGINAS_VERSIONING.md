# Editor de Pàgines — contracte de versions i seguretat

## URL estable
- Editor: https://amargalefv-stack.github.io/tradeverse-library-viewer/editor-paginas.html
- Versió implementada: `editor-paginas-v1.html` (blob SHA `a454698f2133b0ef1341026782dd952ea284e814`).
- Fitxer `editor-pagina.html`: entrada anterior que redirigeix a `editor-pagina-v2.html`; no s'ha modificat durant la creació de l'editor nou. No reutilitzar aquest nom singular.

## Regles per no perdre l'editor
1. `editor-paginas-v1.html` és una entrega versionada i preservada. No editar-la ni eliminar-la per introduir canvis posteriors.
2. Qualsevol evolució s'ha de crear com `editor-paginas-v2.html`, `editor-paginas-v3.html`, etc. Validar-la abans de canviar el redireccionament estable `editor-paginas.html`.
3. No reutilitzar el nom `editor-pagina.html` per al nou editor.
4. El codi de l'editor viu al repositori `tradeverse-library-viewer`, independent del codi de les pàgines de web/Tradeverse.
5. Una edició de l'editor no s'ha de publicar a Vercel. GitHub Pages és el seu allotjament.
6. Els commits de contingut de `tradeverse-project-master` no han d'iniciar cap deploy automàtic de Vercel. Només els botons explícits de Preview poden activar el workflow manual.

## Funcions v1
- Llegir les rutes `web/app/**/page.tsx`, articles de `web/data/library.json`, i registres/snapshots de `web/data/page-editor.json` de la branca seleccionada. No manté una llista hardcoded de pàgines.
- Mostrar una URL de Vercel només quan existeix un registre de deployment manual `Preview manual · <ruta> · branch <branca>` amb estat `success` i URL validada. En cas contrari, mostrar `null`.
- Publicar una pàgina: si cal, afegeix primer el snapshot a la configuració de Preview; després activa explícitament `.github/workflows/publish-preview-manual.yml`. Aquest workflow sempre es limita a Preview, mai Production.
- Esborrar una pàgina de la branca seleccionada: elimina la ruta o l'entrada de catàleg web. Conserva els fitxers Markdown originals dels articles i les deployments de Preview, perquè són accions separades.
- Esborrar pàgina de Preview: retira el snapshot, si n'hi ha, i activa explícitament `.github/workflows/delete-preview-manual.yml`. El workflow comprova la ruta, la branca, el registre GitHub, el projecte Vercel i bloqueja les deployments de Production abans de suprimir les deployments Preview registrades.

## Seguretat i limitacions
- Les escriptures estan bloquejades a `main`; seleccionar `main` és només de lectura.
- Cada canvi comprova que HEAD no hagi avançat des de la càrrega. Si hi ha concurrència, atura l'operació sense force push.
- El token de GitHub es desa només a `sessionStorage` d'aquesta sessió; mai s'escriu en fitxers o al repositori.
- El token de Vercel només existeix com a secret de GitHub Actions i no s'envia al navegador.
- La portada `/` i les rutes dinàmiques genèriques estan protegides contra esborrat.
- El botó d'eliminar un article treu l'entrada de `web/data/library.json` però preserva els originals de la biblioteca canònica.
- Cada URL de Preview és una deployment immutable del web sencer, associada a la ruta que va iniciar la publicació; no és un servidor aïllat que contingui exclusivament una sola pàgina.

## Verificació registrada
- La llista v1 es genera en temps real a partir de l'arbre GitHub i els dos fitxers de dades; no existeix cap constant `pages=[...]` hardcoded.
- La sintaxi JavaScript de l'editor s'ha validat compilant el script sense executar-lo.
- No s'ha fet cap deployment de Vercel durant la creació de l'editor.
- Pendent: prova real autenticada al navegador amb el token del propietari, primera publicació Preview i primera retirada Preview. No marcar aquestes proves com a completades fins que es facin.
