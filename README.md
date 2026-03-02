# IFIAAS — Landing Page

Site officiel d'IFIAAS à déployer sur **ifiaas.com** via Vercel.

## 🚀 Déploiement sur Vercel

### Méthode 1 — Via GitHub (recommandée)

1. Crée un repo GitHub et pousse ce projet :
```bash
git init
git add .
git commit -m "Initial IFIAAS landing"
git remote add origin https://github.com/TON_COMPTE/ifiaas-landing.git
git push -u origin main
```

2. Va sur [vercel.com](https://vercel.com) → **New Project**
3. Importe ton repo GitHub
4. Vercel détecte automatiquement Vite → clique **Deploy**
5. Dans **Settings → Domains** → ajoute `ifiaas.com`

### Méthode 2 — Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Configuration DNS pour ifiaas.com

Dans ton registrar de domaine, ajoute ces enregistrements :
```
Type  Nom   Valeur
A     @     76.76.19.61
CNAME www   cname.vercel-dns.com
```

## 🛠 Développement local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173

## 📁 Structure

```
ifiaas-vercel/
├── index.html          # Entry point + SEO meta
├── vercel.json         # SPA routing config
├── vite.config.js      # Vite config
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    └── App.jsx         # Toute l'app (composants + styles)
```

## 🎨 Plateformes représentées

- **z.ifiaas.com** — GigaZone WiFi Pro
- **money.ifiaas.com** — ifiMoney (Tontine numérique)
- **chat.ifiaas.com** — ifiChat (Live × Telegram)

---

**Armel SANGAN** · IFIAAS · Zinvié, Bénin 🇧🇯
