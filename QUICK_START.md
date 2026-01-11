# Běžci sobě - Quick Start Guide

## 🚀 Rychlý start

### 1. Instalace závislostí

```bash
cd bezci-sobe-app
npm install
```

### 2. Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace běží na: http://localhost:5173

### 3. Přihlášení (demo účet)

- **Username**: `admin`
- **Password**: `admin123`

## 🧪 Testování

### Unit testy (Vitest)

```bash
npm test              # Spustí testy v watch módu
npm test -- --run     # Spustí testy jednou
npm run test:coverage # Zobrazí coverage report
```

### E2E testy (Cypress)

```bash
# Nejprve spusťte dev server (v jiném terminálu)
npm run dev

# Pak spusťte Cypress
npm run cypress          # Otevře Cypress UI
npm run cypress:headless # Spustí testy bez UI

# Nebo spusťte vše najednou
npm run e2e
```

## 📦 Build

```bash
npm run build   # Vytvoří produkční build v /dist
npm run preview # Náhled produkčního buildu
```

## 🔍 Linting

```bash
npm run lint    # Zkontroluje kód
```

## 📱 Funkce aplikace

### Pro nepřihlášené uživatele:

- ✅ Procházení úvodní stránky
- ✅ Zobrazení informací o projektu
- ✅ Prohlížení závodů
- ✅ Registrace nového účtu
- ✅ Přihlášení

### Pro přihlášené uživatele:

- ✅ Všechny funkce nepřihlášených
- ✅ Vytváření nabídek jízd
- ✅ Vytváření poptávek po jízdě
- ✅ Zobrazení profilu
- ✅ Odhlášení

## 🗂️ Struktura projektu

```
bezci-sobe-app/
├── src/
│   ├── components/     # Komponenty (Header, Footer, Layout)
│   ├── pages/          # Stránky (8 views)
│   ├── contexts/       # React Context (Auth)
│   ├── services/       # API služby (LocalStorage)
│   ├── types/          # TypeScript typy
│   ├── routes/         # Routing konfigurace
│   ├── utils/          # Utility funkce
│   └── test/           # Test setup
├── cypress/
│   ├── e2e/           # E2E testy
│   └── support/       # Cypress utilities
├── public/            # Statické soubory
└── *.config.ts        # Konfigurační soubory
```

## 📊 Testovací scénáře

### E2E testy pokrývají:

1. **Registrace** - happy path + validace
2. **Přihlášení** - happy path + chybové stavy
3. **Navigace** - všechny stránky
4. **Jízdy** - vytváření nabídek a poptávek

### Unit testy pokrývají:

1. **API Service** - auth, CRUD operace
2. **Komponenty** - rendering, props
3. **Validace** - email, heslo, username
4. **Pages** - logika a interakce

## 🔒 Bezpečnostní konfigurace

Projekt používá `.npmrc` s těmito nastaveními:

```
ignore-scripts=true    # Blokuje post-install skripty
audit=true            # Automatické security audity
save-exact=true       # Přesné verze balíčků
```

## 🎯 Splnění požadavků

- ✅ **SPA architektura** - React s React Router
- ✅ **Komponenty** - Znovupoužitelné komponenty
- ✅ **Routing** - 8 různých stránek
- ✅ **State Management** - React Context API
- ✅ **Data** - LocalStorage jako mock backend
- ✅ **Validace** - Client-side validace vstupů
- ✅ **TypeScript** - 100% typovaný kód
- ✅ **Testování** - Unit + E2E testy
- ✅ **Optimalizace** - Vite, code splitting
- ✅ **Dokumentace** - Technická dokumentace

## 💡 Tipy pro prezentaci

1. **Spusťte dev server** před prezentací
2. **Otevřete Cypress** pro ukázku testů
3. **Ukažte registraci** nového uživatele
4. **Ukažte vytvoření jízdy** po přihlášení
5. **Ukažte responsive design** (mobil/desktop)
6. **Ukažte validaci** na registračním formuláři

## 📞 Kontakt

**Autor**: Iva Fischerová  
**Email**: (váš email)  
**Předmět**: Tvorba webových aplikací  
**Rok**: 2025

---

## Troubleshooting

### Port 5173 už běží

```bash
# Zastavte jiný process nebo změňte port
PORT=5174 npm run dev
```

### Testy selhávají

```bash
# Vymažte node_modules a nainstalujte znovu
rm -rf node_modules package-lock.json
npm install
```

### Cypress se nespouští

```bash
# Nainstalujte Cypress znovu
npm install cypress --force
```
