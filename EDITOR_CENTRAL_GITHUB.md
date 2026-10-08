# Tradeverse — Editor central GitHub

Arquitectura tancada:

**Editor web → API server-side → GitHub central → tradeverse-project-master/main**

Font de veritat única:
- Tree: `01_LIBRARY/STRUCTURE/CURRENT/ARBRE_CANONIC_DEFINITIU.csv`
- Articles: `01_LIBRARY/ARTICLES_CURRENT/`

L'editor no utilitza còpia local ni base de dades intermèdia.

## Seguretat

El token de GitHub no es guarda al navegador. L'API `api/github.js` utilitza el secret de servidor `TRADEVERSE_GITHUB_TOKEN`.

Aquest secret s'ha de configurar al projecte d'allotjament.

## Guardat

- Cada modificació del Tree crea un commit a GitHub.
- Cada modificació d'article crea un commit a GitHub.
- El Tree i els articles continuen sent els fitxers centrals del repositori canònic.
- El guardat utilitza el SHA actual del fitxer; si hi ha hagut un canvi concurrent, GitHub rebutja l'actualització obsoleta en lloc de sobreescriure-la silenciosament.

## Prova final

1. Carregar Tree central.
2. Editar un node.
3. Guardar.
4. Comprovar el commit a `tradeverse-project-master`.
5. Recarregar.
6. Confirmar persistència.
7. Repetir amb un article.

L'allotjament només executa la interfície/API. **No és la font de dades.**
