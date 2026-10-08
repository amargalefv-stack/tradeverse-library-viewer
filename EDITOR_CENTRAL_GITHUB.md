# Tradeverse · Editor central GitHub

Aquest repositori conté el visor/editor intern de Tradeverse.

## Font de veritat

L'editor **NO treballa sobre una còpia local ni sobre una base de dades pròpia**.

Llegeix i escriu directament:

- Repositori canònic: `amargalefv-stack/tradeverse-project-master`
- Branch: `main`
- Tree: `01_LIBRARY/STRUCTURE/CURRENT/ARBRE_CANONIC_DEFINITIU.csv`
- Articles: `01_LIBRARY/ARTICLES_CURRENT/`

## Editor

Fitxer: `editor.html`

Funcions MVP:

- carregar el Tree canònic
- cercar i navegar nodes
- editar metadades del node
- canviar títol mantenint la jerarquia dels descendents
- crear fills
- editar/crear el contingut Markdown de l'article associat
- guardar directament a GitHub mitjançant commits
- obrir l'article al GitHub

Cada canvi queda en l'historial de GitHub. No hi ha una base de dades intermèdia que pugui convertir-se en una segona font de veritat.

## Seguretat del token

L'editor demana un GitHub fine-grained personal access token amb accés **Contents: Read and write** al repositori canònic.

El token només es guarda a `sessionStorage` del navegador i no es desa al repositori.

Per a una versió posterior es pot substituir aquest mecanisme per GitHub App/OAuth amb autenticació server-side.

## Regla d'arquitectura

**Tree central de GitHub → Editor → commit al mateix Tree central.**

L'editor no crea ni manté una rèplica del Tree com a font operativa.
