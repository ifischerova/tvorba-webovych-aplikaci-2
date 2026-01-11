# Běžci sobě - Technická dokumentace

**Semestrální práce pro předmět Tvorba webových aplikací**

## 1. Přehled projektu

Běžci sobě je moderní webová SPA aplikace pro sdílení dopravy mezi běžci na jejich cestách na závody. Aplikace je postavena na React frameworku s TypeScriptem a využívá moderní přístupy k vývoji webových aplikací.

### Technologický stack

- **Frontend Framework**: React 18 s TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS + Bootstrap 5
- **State Management**: React Context API
- **Data Persistence**: LocalStorage (mock backend)
- **Testing**:
  - Unit testy: Vitest + React Testing Library
  - E2E testy: Cypress
- **Linting**: ESLint s TypeScript pravidly

## 2. Architektura aplikace

### 2.1 Struktura projektu

```
src/
├── components/           # Znovupoužitelné UI komponenty
│   └── layout/          # Layout komponenty (Header, Footer, Layout)
├── pages/               # Komponenty stránek (views)
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── RacesPage.tsx
│   ├── OrganizersPage.tsx
│   ├── LoginPage.tsx
│   ├── RegistrationPage.tsx
│   ├── ProfilePage.tsx
│   └── TermsPage.tsx
├── contexts/            # React Context pro správu stavu
│   └── AuthContext.tsx
├── services/            # API služby a business logika
│   └── apiService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── routes/             # Konfigurace routování
│   └── AppRouter.tsx
├── test/               # Test utilities
│   └── setup.ts
├── App.tsx             # Hlavní aplikační komponenta
├── main.tsx            # Entry point
└── index.css           # Globální styly
```

### 2.2 Popis views (obrazovek)

Aplikace obsahuje **8 různých zobrazení**, což splňuje požadavek minimálně 5 views:

1. **HomePage** (`/`) - Úvodní stránka s informacemi o projektu
2. **AboutPage** (`/about`) - Informace o projektu, vizi a hodnotách
3. **RacesPage** (`/races`) - Seznam závodů a správa jízd (hlavní funkční stránka)
4. **OrganizersPage** (`/organizers`) - Informace pro pořadatele závodů
5. **LoginPage** (`/login`) - Přihlašovací formulář s validací
6. **RegistrationPage** (`/registration`) - Registrační formulář s validací
7. **ProfilePage** (`/profile`) - Uživatelský profil (vyžaduje autentizaci)
8. **TermsPage** (`/terms`) - Obchodní podmínky

## 3. Správa stavu (State Management)

### 3.1 AuthContext

Aplikace využívá React Context API pro správu autentizace:

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}
```

**Funkce:**

- Centralizovaná správa přihlášeného uživatele
- Perzistence přihlášení pomocí LocalStorage
- Kontrola autentizace při načtení aplikace
- Automatické přesměrování na chráněných stránkách

### 3.2 LocalStorage jako Mock Backend

Data jsou uložena v LocalStorage s následující strukturou:

- `bezci_sobe_users` - uživatelé
- `bezci_sobe_races` - závody
- `bezci_sobe_rides` - jízdy
- `bezci_sobe_calendars` - kalendáře závodů
- `bezci_sobe_track_lengths` - délky tratí
- `bezci_sobe_track_types` - typy tratí
- `bezci_sobe_certifications` - certifikace
- `bezci_sobe_current_user` - aktuálně přihlášený uživatel
- `bezci_sobe_auth_token` - autentizační token

## 4. Práce s daty

### 4.1 API Service

Vrstva `apiService` poskytuje rozhraní pro práci s daty:

**Autentizace:**

- `login(username, password)` - přihlášení uživatele
- `register(username, email, password)` - registrace nového uživatele
- `logout()` - odhlášení
- `getCurrentUser()` - získání aktuálního uživatele

**Závody:**

- `getRaces()` - seznam všech závodů
- `getRaceById(id)` - detail závodu

**Jízdy:**

- `getRides()` - všechny jízdy
- `getRidesByRace(raceId)` - jízdy pro konkrétní závod
- `createRide(ride)` - vytvoření nové jízdy
- `updateRide(id, updates)` - aktualizace jízdy
- `deleteRide(id)` - smazání jízdy

### 4.2 Validace dat

**Client-side validace** je implementována na několika úrovních:

1. **HTML5 validace**: `required`, `minLength`, `type="email"`
2. **Custom validace v komponentách**: kontrola shody hesel, formátu emailu
3. **Validační pravidla**:
   - Uživatelské jméno: minimálně 3 znaky, pouze písmena/čísla/spec. znaky
   - Email: validní formát emailu
   - Heslo: minimálně 6 znaků, obsahuje velké/malé písmeno nebo číslo

## 5. TypeScript typování

Všechny entity jsou plně typované v `src/types/index.ts`:

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  // ... další pole
}

interface Race {
  id: string;
  name: string;
  place: string;
  date: string;
  // ... další pole
}

interface Ride {
  id: string;
  raceId: string;
  userId: string;
  type: RideType;
  // ... další pole
}

enum RideType {
  OFFER = "OFFER",
  REQUEST = "REQUEST",
}
```

## 6. Testování

### 6.1 Unit testy (Vitest)

**Umístění**: `src/**/*.test.ts(x)`

**Pokryté oblasti:**

- API Service (`apiService.test.ts`) - 100% coverage klíčových funkcí
- Komponenty (`Footer.test.tsx`, `HomePage.test.tsx`)
- Stránky s logikou (`LoginPage.test.tsx`)

**Spuštění:**

```bash
npm test              # Spustí testy
npm run test:ui       # Spustí testy s UI
npm run test:coverage # Spustí testy s coverage reportem
```

### 6.2 E2E testy (Cypress)

**Umístění**: `cypress/e2e/*.cy.ts`

**Testované scénáře:**

1. **registration.cy.ts** - Registrace uživatele (happy path + negative scenarios)
2. **login.cy.ts** - Přihlášení uživatele (happy path + negative scenarios)
3. **navigation.cy.ts** - Navigace mezi stránkami
4. **races.cy.ts** - Vytváření a správa jízd

**Spuštění:**

```bash
npm run cypress          # Otevře Cypress UI
npm run cypress:headless # Spustí testy v headless módu
npm run e2e              # Spustí dev server a pak testy
```

## 7. Optimalizace a výkon

### 7.1 Build optimalizace

- **Code splitting**: Vendor bundle oddělen od aplikačního kódu
- **Tree shaking**: Automatické odstranění nepoužitého kódu
- **Minifikace**: Terser pro minifikaci produkčního buildu
- **Source maps vypnuty**: Pro zabránění odhalení zdrojového kódu v produkci

### 7.2 Performance best practices

- React.StrictMode pro detekci problémů
- Lazy loading routes (možnost rozšíření)
- Memoizace komponent kde je to vhodné
- Optimalizované re-rendery pomocí správného state managementu

## 8. Bezpečnost

### 8.1 NPM bezpečnost

- `.npmrc` s `ignore-scripts=true` - zabraňuje spuštění post-install skriptů
- `save-exact=true` - používá přesné verze balíčků
- Pravidelné `npm audit` pro kontrolu zranitelností

### 8.2 Aplikační bezpečnost

- Client-side validace všech vstupů
- XSS ochrana díky React (automatické escapování)
- CSRF ochrana není potřeba (žádný real backend)
- Bezpečné ukládání hesel (v reálné aplikaci by byly hashované)

## 9. Spuštění projektu

```bash
# Instalace závislostí
npm install

# Development server
npm run dev

# Build pro produkci
npm run build

# Preview produkčního buildu
npm run preview

# Linting
npm run lint

# Testy
npm test
npm run cypress
```

## 10. Další rozvoj

Možná rozšíření aplikace:

- Real-time chat mezi uživateli
- Hodnocení uživatelů/jízd
- Push notifikace
- Integrace s mapovými službami
- Real backend API
- Pokročilé filtrování a vyhledávání závodů
- Platební brána pro sdílení nákladů

---

**Autor**: Iva Fischerová  
**Datum**: Prosinec 2025  
**Předmět**: Tvorba webových aplikací
