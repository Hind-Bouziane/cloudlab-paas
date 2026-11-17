const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  const machine = os.hostname();
  const nodeVersion = process.version;
  const commit = process.env.SOURCE_COMMIT || 'non disponible';
  const publicAddress = process.env.COOLIFY_FQDN || process.env.COOLIFY_URL || 'non disponible';
  const pageDate = new Date().toUTCString();

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bonjour depuis le Cloud Lab</title>
  <style>
    :root {
      --bg: #f8fafc;
      --card-bg: #ffffff;
      --text: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --accent: #2563eb;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #0f172a;
        --card-bg: #1e293b;
        --text: #f8fafc;
        --text-muted: #94a3b8;
        --border: #334155;
        --accent: #38bdf8;
      }
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1.25rem 1rem;
    }
    .container {
      width: 100%;
      max-width: 980px;
    }
    header {
      margin-bottom: 1.25rem;
      text-align: center;
    }
    h1 {
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
      color: var(--accent);
    }
    p.subtitle {
      font-size: 0.95rem;
      color: var(--text-muted);
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
    @media (min-width: 768px) {
      .content-grid {
        grid-template-columns: 1.15fr 0.85fr;
      }
    }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
    }
    .card h2 {
      font-size: 1.15rem;
      margin-bottom: 0.85rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.4rem;
    }
    .info-list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.55rem;
    }
    .info-item {
      display: flex;
      flex-direction: column;
      font-size: 0.9rem;
    }
    @media (min-width: 480px) {
      .info-item {
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .info-label {
      font-weight: 600;
      color: var(--text-muted);
    }
    .info-value {
      word-break: break-all;
      font-family: SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.875rem;
    }
    ul.checklist {
      list-style-type: none;
      padding-left: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 0.25rem;
    }
    ul.checklist li {
      position: relative;
      padding-left: 1.5rem;
      font-size: 0.925rem;
    }
    ul.checklist li::before {
      content: "✓";
      position: absolute;
      left: 0;
      color: var(--accent);
      font-weight: bold;
    }
    footer {
      text-align: center;
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border);
      font-size: 0.85rem;
      color: var(--text-muted);
    }
    footer p {
      margin-bottom: 0.15rem;
    }
  </style>
</head>
<body>
  <main class="container">
    <header>
      <h1>Bonjour depuis le Cloud Lab</h1>
      <p class="subtitle">Modèle PaaS : application Node.js déployée avec Coolify depuis un dépôt Git.</p>
    </header>

    <div class="content-grid">
      <section class="card">
        <h2>Informations d'exécution</h2>
        <div class="info-list">
          <div class="info-item">
            <span class="info-label">Machine</span>
            <span class="info-value">${machine}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Version de Node</span>
            <span class="info-value">${nodeVersion}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Port d'écoute</span>
            <span class="info-value">${PORT}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Modèle</span>
            <span class="info-value">PaaS</span>
          </div>
          <div class="info-item">
            <span class="info-label">Date de la page</span>
            <span class="info-value">${pageDate}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Commit déployé</span>
            <span class="info-value">${commit}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Adresse publique</span>
            <span class="info-value">${publicAddress}</span>
          </div>
        </div>
      </section>

      <section class="card">
        <h2>Ce que la plateforme a géré pour nous</h2>
        <ul class="checklist">
          <li>Le système d'exploitation</li>
          <li>L'installation de Node et des dépendances (build automatique)</li>
          <li>L'attribution du port</li>
          <li>Le certificat HTTPS</li>
        </ul>
      </section>
    </div>

    <footer>
      <p>Projet Virtualisation & Cloud - EMSI Rabat</p>
      <p>Réalisé par : Hind Bouziane / Chahd Benjelloun</p>
    </footer>
  </main>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

app.get('/api/info', (req, res) => {
  res.json({
    message: 'Bonjour depuis le Cloud Lab',
    modele: 'PaaS',
    machine: os.hostname(),
    node: process.version,
    port: Number(PORT),
    commit: process.env.SOURCE_COMMIT || 'non disponible',
    date: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, HOST, () => {
  console.log(`Serveur démarré sur http://${HOST}:${PORT}`);
});
