# Integracja Stripe - Instrukcja (Opcja 1: Direct Stripe Checkout)

## ✅ Co zostało zaimplementowane

Sklep obsługuje płatności Stripe przez **bezpośrednią integrację z Stripe Checkout Session API**. Użytkownicy są przekierowywani do **checkout.stripe.com** (nie do WordPress), a zamówienia WooCommerce są tworzone automatycznie przez webhook po potwierdzeniu płatności.

## 🎯 Architektura rozwiązania

```
┌─────────────────────────────────┐
│ Frontend (Next.js)              │
│ - Formularz checkout            │
│ - Wybór metody płatności        │
│ - Walidacja danych              │
└─────────────────────────────────┘
           │
           │ createStripeCheckoutSession() Server Action
           ▼
┌─────────────────────────────────┐
│ Next.js Server                  │
│ - Server Action                 │
│ - Stripe SDK                    │
│ - Tworzy Checkout Session       │
└─────────────────────────────────┘
           │
           │ Redirect do checkout.stripe.com
           ▼
┌─────────────────────────────────┐
│ Stripe Checkout                 │
│ - checkout.stripe.com           │
│ - Formularz płatności           │
│ - PCI compliance                │
│ - Karta/BLIK/Przelewy24         │
└─────────────────────────────────┘
           │
           │ Po płatności
           ▼
┌─────────────────────────────────┐
│ Stripe Webhook                  │
│ - /api/webhooks/stripe          │
│ - Weryfikacja podpisu           │
│ - Tworzenie zamówienia WC       │
└─────────────────────────────────┘
           │
           │ Redirect użytkownika
           ▼
┌─────────────────────────────────┐
│ Success Page (Next.js)          │
│ - /checkout/success             │
│ - Weryfikacja sesji             │
│ - Potwierdzenie płatności       │
└─────────────────────────────────┘
```

## 🔧 Konfiguracja

### 1. Zmienne środowiskowe

Uzupełnij w `.env.local`:

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# WooCommerce API (nadal potrzebne do tworzenia zamówień)
WOOCOMMERCE_CONSUMER_KEY=ck_xxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxx
NEXT_PUBLIC_WOOCOMMERCE_URL=https://twoja-domena.pl

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Twój Sklep
```

### 2. Jak zdobyć klucze Stripe

1. Zaloguj się do [Stripe Dashboard](https://dashboard.stripe.com/)
2. Przejdź do **Developers → API keys**
3. W sekcji **Standard keys** znajdziesz:
   - **Publishable key** (zaczyna się od `pk_test_`)
   - **Secret key** (zaczyna się od `sk_test_` - kliknij "Reveal")

### 3. Konfiguracja Stripe Webhook

**WAŻNE:** Webhook jest kluczowy - bez niego zamówienia WooCommerce nie będą tworzone!

#### Opcja A: Lokalne testowanie (Stripe CLI)

1. Zainstaluj Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Zaloguj się do Stripe:
```bash
stripe login
```

3. Przekieruj webhooks do lokalnego serwera:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

4. Skopiuj **webhook signing secret** (zaczyna się od `whsec_`) i dodaj do `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

#### Opcja B: Produkcja (Stripe Dashboard)

1. Przejdź do **Developers → Webhooks** w Stripe Dashboard
2. Kliknij **Add endpoint**
3. Endpoint URL: `https://twoja-domena.pl/api/webhooks/stripe`
4. Wybierz wydarzenia:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
5. Kliknij **Add endpoint**
6. Skopiuj **Signing secret** i dodaj do zmiennych środowiskowych produkcyjnych

## 🎨 Kluczowe pliki

### 1. [src/lib/stripe.ts](src/lib/stripe.ts)
Inicjalizacja klienta Stripe (server-side only):
```typescript
'use server';

import Stripe from 'stripe';

export function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
    typescript: true,
  });
}
```

### 2. [src/app/checkout/stripe-actions.ts](src/app/checkout/stripe-actions.ts)
Server Actions dla Stripe:
- `createStripeCheckoutSession()` - Tworzy sesję płatności
- `verifyStripeSession()` - Weryfikuje status płatności

### 3. [src/components/checkout/checkout-form-client.tsx](src/components/checkout/checkout-form-client.tsx)
Formularz checkout - obsługuje wybór Stripe i przekierowanie do checkout.stripe.com

### 4. [src/app/api/webhooks/stripe/route.ts](src/app/api/webhooks/stripe/route.ts)
Endpoint webhook - tworzy zamówienie WooCommerce po potwierdzeniu płatności

### 5. [src/app/checkout/success/page.tsx](src/app/checkout/success/page.tsx)
Strona sukcesu - weryfikuje sesję i wyświetla potwierdzenie

## 🧪 Testowanie płatności

### Testowe karty kredytowe Stripe:

**Sukces:**
- Numer: `4242 4242 4242 4242`
- Data: Dowolna przyszła (np. `12/34`)
- CVC: Dowolne 3 cyfry (np. `123`)
- ZIP: Dowolny (np. `12345`)

**Odmowa płatności:**
- Numer: `4000 0000 0000 0002`

**Wymaga 3D Secure:**
- Numer: `4000 0025 0000 3155`

[Więcej testowych kart](https://stripe.com/docs/testing#cards)

### Przepływ testowy:

1. Dodaj produkty do koszyka
2. Przejdź do checkout (`/checkout`)
3. Wypełnij formularz danych (imię, nazwisko, email, adres)
4. Wybierz **Stripe** jako metodę płatności
5. Kliknij **Przejdź do płatności**
6. ✅ Zostaniesz przekierowany do **checkout.stripe.com** (nie WordPress!)
7. Użyj testowej karty `4242 4242 4242 4242`
8. Po udanej płatności wrócisz do `/checkout/success`
9. Sprawdź:
   - Console Next.js - powinien być log z webhook
   - WooCommerce → Zamówienia - powinno być nowe zamówienie
   - Stripe Dashboard → Payments - powinna być płatność

## 🔒 Bezpieczeństwo

### Dlaczego to jest bezpieczne:

✅ **Brak danych kart na Twoim serwerze**
- Formularz płatności hostowany przez Stripe (checkout.stripe.com)
- Dane karty nigdy nie przechodzą przez Twój serwer
- Stripe Checkout Session tworzona server-side

✅ **PCI Compliance**
- Stripe jest certyfikowany PCI DSS Level 1
- Nie musisz spełniać wymagań PCI
- Stripe obsługuje wszystkie aspekty bezpieczeństwa płatności

✅ **Bezpieczne klucze**
- Secret Key tylko na serwerze Next.js (nigdy w przeglądarce)
- Publishable Key może być publiczny (to jest OK)
- Webhook Secret weryfikuje autentyczność webhooków

✅ **Weryfikacja webhook**
- Każdy webhook jest weryfikowany podpisem Stripe
- Niemożliwe jest sfałszowanie webhook

✅ **Server Actions**
- Wszystkie operacje przez Server Actions
- Brak możliwości manipulacji z poziomu klienta

## 📋 Przepływ danych

### 1. Użytkownik wypełnia formularz checkout
- Client Component: `checkout-form-client.tsx`
- Walidacja: React Hook Form + Zod
- Dane: imię, nazwisko, email, adres, telefon

### 2. Kliknięcie "Przejdź do płatności" (Stripe)
- Server Action: `createStripeCheckoutSession()`
- Tworzy Stripe Checkout Session
- Zapisuje dane w `session.metadata`
- Zwraca URL do checkout.stripe.com

### 3. Przekierowanie do Stripe
- `window.location.href = session.url`
- Użytkownik widzi checkout.stripe.com
- Wybiera metodę płatności (Karta/BLIK/P24)

### 4. Płatność na Stripe
- Stripe przetwarza płatność
- Jeśli sukces → wysyła webhook `checkout.session.completed`
- Jeśli async payment → wysyła `checkout.session.async_payment_succeeded`

### 5. Webhook tworzy zamówienie WooCommerce
- POST `/api/webhooks/stripe`
- Weryfikacja podpisu webhook
- Parsowanie `session.metadata`
- Wywołanie `createOrder()` (WooCommerce API)
- Zamówienie tworzone z `set_paid: true`

### 6. Przekierowanie do success page
- `/checkout/success?session_id=xxx`
- Weryfikacja sesji przez `verifyStripeSession()`
- Wyświetlenie potwierdzenia płatności

## 🆚 Porównanie z poprzednim rozwiązaniem (WooCommerce Stripe Gateway)

| Aspekt | WooCommerce Gateway | Direct Stripe (Aktualne) |
|--------|---------------------|--------------------------|
| Redirect URL | WordPress domain | checkout.stripe.com |
| Headless UX | ❌ Łamie headless | ✅ Prawdziwy headless |
| Kontrola | Plugin WooCommerce | Pełna kontrola |
| Customizacja | Ograniczona | Pełna |
| Testowanie | Trudne | Łatwe (Stripe CLI) |
| Webhook | Auto przez plugin | Ręczna konfiguracja |
| Metody płatności | Tylko karty | Karty/BLIK/P24/inne |

## 🌐 Przejście na Produkcję

### 1. Stripe Production Keys

1. W [Stripe Dashboard](https://dashboard.stripe.com/) przełącz na **Live mode** (toggle w prawym górnym rogu)
2. Przejdź do **Developers → API keys**
3. Skopiuj **Production keys:**
   - Publishable key (`pk_live_xxx`)
   - Secret key (`sk_live_xxx`)

### 2. Produkcyjne zmienne środowiskowe

```env
# Production Stripe Keys
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx  # Z produkcyjnego endpointu webhook

# Production WooCommerce
WOOCOMMERCE_CONSUMER_KEY=ck_xxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxx
NEXT_PUBLIC_WOOCOMMERCE_URL=https://twoja-domena.pl

# Production Site
NEXT_PUBLIC_SITE_URL=https://twoja-domena.pl
```

### 3. Konfiguracja produkcyjnego webhook

1. **Stripe Dashboard → Developers → Webhooks**
2. **Add endpoint:** `https://twoja-domena.pl/api/webhooks/stripe`
3. Wybierz wydarzenia:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
4. Skopiuj **Signing secret** do `STRIPE_WEBHOOK_SECRET`

### 4. Weryfikacja konta Stripe

⚠️ **WAŻNE przed produkcją:**
1. Zweryfikuj konto Stripe (dane firmy/osobowe)
2. Ustaw bank account dla wypłat
3. Skonfiguruj ustawienia biznesowe
4. Przeczytaj i zaakceptuj regulamin

## 🐛 Troubleshooting

### Problem: Stripe nie pojawia się w checkout

**Rozwiązanie:**
1. Sprawdź czy WooCommerce zwraca Stripe w `getPaymentGateways()`
2. Otwórz `/checkout` i sprawdź console przeglądarki
3. Sprawdź `src/app/checkout/page.tsx` - czy pobiera gateways

### Problem: "STRIPE_SECRET_KEY is not defined"

**Rozwiązanie:**
1. Sprawdź czy `.env.local` zawiera `STRIPE_SECRET_KEY`
2. Zrestartuj dev server: `bun dev`
3. Upewnij się że klucz zaczyna się od `sk_test_` (test) lub `sk_live_` (prod)

### Problem: Przekierowanie do Stripe nie działa

**Rozwiązanie:**
1. Sprawdź console przeglądarki - szukaj błędów
2. Sprawdź terminal Next.js - błędy server action
3. Zweryfikuj że wszystkie zmienne środowiskowe są ustawione
4. Sprawdź czy `createStripeCheckoutSession()` zwraca URL

### Problem: Webhook nie tworzy zamówień

**Rozwiązanie:**
1. Sprawdź czy webhook jest skonfigurowany (Stripe CLI lub Dashboard)
2. Sprawdź terminal Next.js - powinny być logi z webhook
3. Zweryfikuj `STRIPE_WEBHOOK_SECRET` w `.env.local`
4. Testuj lokalnie:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
5. Sprawdź logi Stripe Dashboard → Developers → Events

### Problem: "Webhook signature verification failed"

**Rozwiązanie:**
1. Upewnij się że `STRIPE_WEBHOOK_SECRET` jest poprawny
2. Jeśli testujesz lokalnie, użyj Stripe CLI i skopiuj signing secret z output
3. Jeśli produkcja, sprawdź czy secret w `.env` pasuje do tego z Dashboard

### Problem: Zamówienie tworzy się ale nie jest opłacone

**Rozwiązanie:**
1. Sprawdź czy webhook otrzymał event `checkout.session.completed`
2. Zweryfikuj że `session.payment_status === 'paid'`
3. Sprawdź logi w `src/app/api/webhooks/stripe/route.ts`
4. Upewnij się że `set_paid: true` w `createOrder()`

## 📊 Monitoring

### Stripe Dashboard:
1. **Payments** - Wszystkie płatności
2. **Customers** - Lista klientów
3. **Events & logs** - Wszystkie wydarzenia
4. **Webhooks** - Status webhook, logi, retry

### WooCommerce:
1. **Zamówienia** - Sprawdź czy są tworzone
2. **Meta data zamówienia** - `_stripe_session_id`, `_stripe_payment_intent`
3. Filtry: status płatności, data

### Next.js Logs:
```bash
bun dev
```
Szukaj:
- `Stripe Checkout Session created: cs_xxx`
- `Webhook received: checkout.session.completed`
- `WooCommerce order created: 123`

## ✅ Checklist przed uruchomieniem

- [ ] Zainstalowano Stripe SDK (`bun add stripe`)
- [ ] Ustawiono wszystkie zmienne środowiskowe
- [ ] Skonfigurowano webhook (Stripe CLI lub Dashboard)
- [ ] Przetestowano płatność testową kartą
- [ ] Zweryfikowano tworzenie zamówień w WooCommerce
- [ ] Sprawdzono płatności w Stripe Dashboard
- [ ] Sprawdzono logi webhook w terminalu
- [ ] Sprawdzono success page (`/checkout/success`)
- [ ] (Produkcja) Przełączono na live mode
- [ ] (Produkcja) Skonfigurowano produkcyjny webhook
- [ ] (Produkcja) Zweryfikowano konto Stripe

## 🎉 Gotowe!

Twój sklep teraz używa **prawdziwego headless Stripe Checkout**! 🚀

**Korzyści:**
- ✅ Redirect do checkout.stripe.com (nie WordPress)
- ✅ Prawdziwy headless - użytkownik pozostaje w ekosystemie Next.js
- ✅ Pełna kontrola nad przepływem płatności
- ✅ Wsparcie dla BLIK, Przelewy24, Apple Pay, Google Pay
- ✅ Łatwe testowanie z Stripe CLI
- ✅ Bezpieczne - PCI compliant out-of-the-box
- ✅ Automatyczne tworzenie zamówień przez webhook

## 🔗 Przydatne linki

- [Stripe Checkout Docs](https://stripe.com/docs/payments/checkout)
- [Stripe Testing Cards](https://stripe.com/docs/testing#cards)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
