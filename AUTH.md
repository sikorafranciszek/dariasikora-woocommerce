# System Autentykacji - Better-auth + Prisma + PostgreSQL

## ✅ Co zostało zaimplementowane

Sklep posiada pełny system autentykacji użytkowników z integracją WooCommerce:

1. **Better-auth** - Nowoczesny system autentykacji dla Next.js
2. **Prisma ORM** - Zarządzanie bazą danych PostgreSQL (Neon)
3. **Profil użytkownika** - Dodatkowe dane klienta (adres, telefon, firma)
4. **Integracja z WooCommerce** - Automatyczne łączenie zamówień z użytkownikami

## 🎯 Architektura

```
┌─────────────────────────────────┐
│ Frontend (Next.js Client)       │
│ - Formularze login/register     │
│ - useSession() hook             │
│ - Chronione strony              │
└─────────────────────────────────┘
           │
           │ Better-auth Client
           ▼
┌─────────────────────────────────┐
│ Better-auth API                 │
│ - /api/auth/[...all]            │
│ - Session management            │
│ - Email/Password auth           │
└─────────────────────────────────┘
           │
           │ Prisma Client
           ▼
┌─────────────────────────────────┐
│ PostgreSQL (Neon)               │
│ - users                         │
│ - accounts                      │
│ - sessions                      │
│ - verification_tokens           │
└─────────────────────────────────┘
           │
           │ Email matching
           ▼
┌─────────────────────────────────┐
│ WooCommerce Orders              │
│ - Filtrowanie po billing.email │
│ - Meta data z user_id           │
└─────────────────────────────────┘
```

## 📋 Schemat bazy danych

### Model User

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Dodatkowe informacje o kliencie
  phone         String?
  company       String?

  // Adres
  address1      String?
  address2      String?
  city          String?
  postcode      String?
  state         String?
  country       String?   @default("PL")

  // Integracja z WooCommerce
  woocommerceCustomerId Int?  @unique

  accounts      Account[]
  sessions      Session[]
}
```

## 🔑 Konfiguracja

### 1. Zmienne środowiskowe

Dodaj do `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# Better-auth (opcjonalnie - auto-generowane)
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
```

### 2. Migracja bazy danych

Schemat Prisma jest już skonfigurowany. Jeśli potrzebujesz zmigrować:

```bash
# Generuj Prisma Client
bunx prisma generate

# Utwórz migrację
bunx prisma migrate dev --name your_migration_name

# Push do produkcji
bunx prisma migrate deploy
```

## 🎨 Kluczowe pliki

### Backend (Server-side)

1. **[prisma/schema.prisma](prisma/schema.prisma)** - Schemat bazy danych
2. **[src/lib/prisma.ts](src/lib/prisma.ts)** - Prisma Client singleton
3. **[src/lib/auth.ts](src/lib/auth.ts)** - Konfiguracja Better-auth
4. **[src/app/api/auth/[...all]/route.ts](src/app/api/auth/[...all]/route.ts)** - API routes dla auth
5. **[src/app/api/user/update/route.ts](src/app/api/user/update/route.ts)** - API do aktualizacji profilu

### Frontend (Client-side)

1. **[src/lib/auth-client.ts](src/lib/auth-client.ts)** - Better-auth client hooks
2. **[src/components/auth/login-form.tsx](src/components/auth/login-form.tsx)** - Formularz logowania
3. **[src/components/auth/register-form.tsx](src/components/auth/register-form.tsx)** - Formularz rejestracji
4. **[src/app/login/page.tsx](src/app/login/page.tsx)** - Strona logowania
5. **[src/app/register/page.tsx](src/app/register/page.tsx)** - Strona rejestracji

### Strony użytkownika

1. **[src/app/account/page.tsx](src/app/account/page.tsx)** - Dashboard konta
2. **[src/app/account/orders/page.tsx](src/app/account/orders/page.tsx)** - Moje zamówienia
3. **[src/app/account/settings/page.tsx](src/app/account/settings/page.tsx)** - Ustawienia profilu
4. **[src/components/account/orders-list.tsx](src/components/account/orders-list.tsx)** - Lista zamówień

### Integracja z WooCommerce

1. **[src/lib/woocommerce.ts](src/lib/woocommerce.ts)** - Dodano `getOrdersByEmail()`
2. **[src/components/checkout/checkout-form-client.tsx](src/components/checkout/checkout-form-client.tsx)** - Pre-fill danych użytkownika

### Nawigacja

1. **[src/components/layout/header.tsx](src/components/layout/header.tsx)** - Dropdown menu użytkownika

## 🚀 Jak używać

### Rejestracja nowego użytkownika

```typescript
import { signUp } from '@/lib/auth-client';

await signUp.email({
  email: 'user@example.com',
  password: 'secure-password',
  name: 'Jan Kowalski',
  phone: '+48 123 456 789',
});
```

### Logowanie

```typescript
import { signIn } from '@/lib/auth-client';

await signIn.email({
  email: 'user@example.com',
  password: 'secure-password',
});
```

### Pobieranie sesji (Client Component)

```typescript
'use client';

import { useSession } from '@/lib/auth-client';

export function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Ładowanie...</div>;
  if (!session) return <div>Niezalogowany</div>;

  return <div>Witaj, {session.user.name}!</div>;
}
```

### Pobieranie sesji (Server Component)

```typescript
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function ServerPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  return <div>Witaj, {session.user.name}!</div>;
}
```

### Wylogowanie

```typescript
import { signOut } from '@/lib/auth-client';

await signOut();
```

### Aktualizacja profilu

```typescript
const response = await fetch('/api/user/update', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Nowe Imię',
    phone: '+48 999 888 777',
    address1: 'ul. Przykładowa 123',
    city: 'Warszawa',
    postcode: '00-001',
    country: 'PL',
  }),
});
```

## 🔗 Integracja z WooCommerce

### Jak to działa

1. **Checkout pre-fill**: Jeśli użytkownik jest zalogowany, formularz checkout automatycznie wypełnia się danymi z profilu
2. **Zamówienia po emailu**: System automatycznie znajduje zamówienia WooCommerce po adresie email użytkownika
3. **Strona "Moje zamówienia"**: Wyświetla wszystkie zamówienia powiązane z emailem użytkownika

### Pobieranie zamówień użytkownika

```typescript
// Server Component
import { getOrdersByEmail } from '@/lib/woocommerce';

const orders = await getOrdersByEmail(user.email);
```

### Opcjonalnie: Powiązanie z WooCommerce Customer ID

Jeśli chcesz stworzyć pełne konto WooCommerce dla użytkownika:

```typescript
import { createCustomer } from '@/lib/woocommerce';
import { prisma } from '@/lib/prisma';

// Utwórz klienta w WooCommerce
const wcCustomer = await createCustomer({
  email: user.email,
  first_name: firstName,
  last_name: lastName,
  username: user.email,
  password: 'auto-generated-password',
});

// Zapisz ID do użytkownika
if (wcCustomer) {
  await prisma.user.update({
    where: { id: user.id },
    data: { woocommerceCustomerId: wcCustomer.id },
  });
}
```

## 🎯 Strony i funkcjonalności

### Publiczne strony

- `/login` - Logowanie
- `/register` - Rejestracja

### Chronione strony (wymagają logowania)

- `/account` - Dashboard konta
- `/account/orders` - Moje zamówienia (z WooCommerce)
- `/account/settings` - Edycja profilu

### Automatyczne przekierowania

- Niezalogowany użytkownik → `/login`
- Po zalogowaniu → `/account`
- Po rejestracji → `/login` (z prośbą o zalogowanie)

## 🔒 Bezpieczeństwo

### Co jest zabezpieczone:

✅ **Hasła hashowane** - bcrypt automatycznie przez Better-auth
✅ **Session tokens** - Bezpieczne tokeny w bazie danych
✅ **CSRF protection** - Wbudowane w Better-auth
✅ **Server-side validation** - Wszystkie operacje walidowane
✅ **Environment variables** - Klucze nigdy w kodzie

### Best practices:

1. **Nigdy nie commit `.env`** - Dodaj do `.gitignore`
2. **Używaj silnych haseł** - Minimum 8 znaków (możesz zwiększyć w walidacji)
3. **HTTPS w produkcji** - Zawsze używaj SSL
4. **Rate limiting** - Rozważ dodanie limitu requestów (np. przez middleware)

## 🧪 Testowanie

### Lokalne testowanie

1. Uruchom dev server:
```bash
bun dev
```

2. Przejdź do `/register` i utwórz konto testowe
3. Zaloguj się przez `/login`
4. Sprawdź:
   - Dashboard `/account`
   - Zamówienia `/account/orders`
   - Edycja profilu `/account/settings`
   - Pre-fill w checkout `/checkout`

### Testowanie integracji z WooCommerce

1. Dodaj produkty do koszyka
2. Przejdź do checkout - dane powinny być wypełnione automatycznie
3. Złóż zamówienie (użyj Stripe test card lub innej metody)
4. Sprawdź `/account/orders` - zamówienie powinno się pojawić

## 📊 Monitoring

### Sprawdzanie użytkowników w bazie

```bash
# Prisma Studio - GUI do bazy danych
bunx prisma studio
```

Otwórz http://localhost:5555 i przeglądaj tabele:
- `users` - Wszyscy użytkownicy
- `sessions` - Aktywne sesje
- `accounts` - Konta (jeśli dodasz OAuth)

### Logi

Better-auth automatycznie loguje:
- Udane/nieudane logowania
- Tworzenie kont
- Błędy autentykacji

Sprawdzaj terminal Next.js dla logów.

## 🌐 Produkcja

### 1. Zmienne środowiskowe produkcyjne

Ustaw w swoim hosting provider (Vercel, Railway, etc.):

```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_URL="https://twoja-domena.pl"
BETTER_AUTH_SECRET="długi-losowy-ciąg-znaków"
```

### 2. Migracja bazy danych

```bash
bunx prisma migrate deploy
```

### 3. Weryfikacja emaili (opcjonalnie)

Możesz włączyć weryfikację emaili w [src/lib/auth.ts](src/lib/auth.ts):

```typescript
emailAndPassword: {
  enabled: true,
  requireEmailVerification: true, // Zmień na true
  sendVerificationEmail: async ({ user, url }) => {
    // Wyślij email przez Resend, SendGrid, etc.
  },
},
```

## 🔧 Rozszerzanie

### Dodanie OAuth (Google, GitHub, etc.)

```bash
bun add @better-auth/oauth
```

W [src/lib/auth.ts](src/lib/auth.ts):

```typescript
import { google, github } from '@better-auth/oauth';

export const auth = betterAuth({
  // ... existing config
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### Dodanie dodatkowych pól do użytkownika

1. Edytuj `prisma/schema.prisma`:
```prisma
model User {
  // ... existing fields
  dateOfBirth   DateTime?
  preferredLanguage String? @default("pl")
}
```

2. Uruchom migrację:
```bash
bunx prisma migrate dev --name add_user_fields
```

3. Zaktualizuj Better-auth config w [src/lib/auth.ts](src/lib/auth.ts):
```typescript
user: {
  additionalFields: {
    // ... existing fields
    dateOfBirth: {
      type: 'date',
      required: false,
    },
    preferredLanguage: {
      type: 'string',
      required: false,
    },
  },
},
```

## 📚 Dokumentacja zewnętrzna

- [Better-auth Docs](https://www.better-auth.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)

## ✅ Checklist implementacji

- [x] Zainstalowano Prisma + Better-auth
- [x] Skonfigurowano bazę PostgreSQL (Neon)
- [x] Utworzono schemat bazy danych
- [x] Zaimplementowano rejestrację użytkowników
- [x] Zaimplementowano logowanie
- [x] Utworzono strony konta użytkownika
- [x] Dodano integrację z WooCommerce (zamówienia po emailu)
- [x] Dodano pre-fill formularza checkout
- [x] Dodano edycję profilu
- [x] Dodano nawigację login/logout w header
- [x] Przetestowano pełny flow

## 🎉 Gotowe!

Twój sklep ma teraz pełny system użytkowników z integracją WooCommerce! 🚀

**Główne funkcje:**
- ✅ Rejestracja i logowanie
- ✅ Profil użytkownika z adresem
- ✅ Historia zamówień z WooCommerce
- ✅ Automatyczne wypełnianie checkout
- ✅ Bezpieczne zarządzanie sesjami
- ✅ Edycja danych osobowych

Użytkownicy mogą teraz:
1. Utworzyć konto
2. Zalogować się
3. Zobaczyć swoje zamówienia
4. Edytować profil
5. Szybciej realizować zakupy (pre-fill checkout)
