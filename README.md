<p align="center">
  <a href="https://github.com/MovieVoice/roma-studies-interactive-scientific-paper" target="_blank">
    <img src="./src/assets/logo/logo-vertical.svg" alt="Roma Studies Logo" width="25%"><br/>
  </a>
  Interaktive wissenschaftliche Arbeit umgesetzt mit React
</p>

<p align="center">
  <a href="https://youtu.be/@movievoice.app" target="_blank">
    <img src="https://img.shields.io/badge/Watch-Demo_Video-red?style=flat-square&logo=youtube" alt="Demo Video">
  </a>
</p>

## Dokumentation

Die Anwendung **„RoMa Studies“** ist als interaktive Lernplattform konzipiert. Sie macht die Ergebnisse einer wissenschaftlichen Untersuchung nicht nur lesbar, sondern **erlebbar**: Nutzer können durch die Abschnitte einer echten Studie navigieren, Fragen beantworten, eigene Einschätzungen abgeben und ihre Entscheidungen mit den realen Befragungsergebnissen vergleichen.

Technisch basiert das Projekt auf **React** und wurde zunächst in **Figma** als Prototyp entworfen. Anschließend erfolgte die Umsetzung als Single‑Page‑Application, wobei die **Daten der Studie aus JSON‑Dateien dynamisch eingelesen** und auf verschiedene Weise visualisiert werden.  

Ziel war es, wissenschaftliche Inhalte in einem **interaktiven Multimediasystem** aufzubereiten.

## Features

- Darstellung der Forschungsfrage
- Interaktives, animiertes Flussdiagramm zum Ablauf der Studie
- Interaktiver Nachbau des in der Studie verwendeten Fragebogens
  - Unterseiten werden dynamisch auf Grundlage von JSON-Daten gerendert
  - Nutzer können ihre Entscheidungen mit den Ergebnissen der Studie vergleichen
- Interaktive Ergebnisübersicht
  - Daten werden dynamisch aus JSON-Dateien geladen
  - Verschiedene Diagrammtypen zur Visualisierung
- Präsentation des Fazits der Studie

## Installation

### Voraussetzungen

- [Node.js, npm](https://nodejs.org/en/download)

### Schritte

1. Projekt klonen:

  ```bash
  git clone https://github.com/MovieVoice/roma-studies-interactive-scientific-paper.git
  ```

2. Abhängigkeiten installieren:

  ```bash
  npm install
  ```

3. Entwicklungsserver starten:

  ```bash
  npm run dev
  ```

4. Im Browser öffnen: [http://localhost:5173/](http://localhost:5173/)

## Lizenz & Credits

- Copyright: © Marcel Otto 2026
- Entstanden als Projekt an der Hochschule Fulda (21 Tage Entwicklungsdauer)
