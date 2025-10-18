# WooCommerce Next.js Store

Profesjonalny sklep internetowy zbudowany w oparciu o **Next.js 15**, **headless WooCommerce** i **shadcn/ui**.

## Funkcje

- ✅ Pełna integracja z WooCommerce REST API
- ✅ **🔒 Bezpieczna architektura - klucze API tylko po stronie serwera**
- ✅ **💳 Integracja płatności Stripe** (WooCommerce Stripe Gateway)
- ✅ Dynamiczne pobieranie metod płatności z WooCommerce
- ✅ Server Components i Server Actions (Next.js 15)
- ✅ Responsywny design z Tailwind CSS
- ✅ Komponenty UI z shadcn/ui
- ✅ Zarządzanie stanem z Zustand (koszyk)
- ✅ Walidacja formularzy z React Hook Form + Zod
- ✅ Obsługa produktów zmiennych (wariantów)
- ✅ Koszyk z persystencją w localStorage
- ✅ Proces checkout z walidacją
- ✅ Strona potwierdzenia zamówienia
- ✅ System kategorii produktów
- ✅ Wyszukiwarka produktów
- ✅ SEO-friendly
- ✅ TypeScript
- ✅ Optymalizacja obrazów z Next.js Image
- ✅ Brak wycieku kluczy API do przeglądarki

## Stack technologiczny

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **State Management:** Zustand
- **Forms:** React Hook Form
- **Validation:** Zod
- **API Client:** @woocommerce/woocommerce-rest-api
- **Icons:** Lucide React
- **Package Manager:** Bun

## Wymagania

- Node.js 18+
- Bun (lub npm/yarn)
- WordPress z zainstalowanym WooCommerce
- Klucze API WooCommerce (Consumer Key i Consumer Secret)

## Instalacja

1. **Sklonuj repozytorium:**

```bash
git clone <repository-url>
cd woocommerce-nextjs
```

2. **Zainstaluj zależności:**

```bash
bun install
```

3. **Skonfiguruj zmienne środowiskowe:**

Skopiuj plik `.env.example` do `.env.local`:

```bash
cp .env.example .env.local
```

Następnie edytuj `.env.local` i uzupełnij dane:

```env
# WooCommerce API Configuration
NEXT_PUBLIC_WOOCOMMERCE_URL=https://your-wordpress-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=WooCommerce Store
```

4. **Uruchom serwer deweloperski:**

```bash
bun dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Konfiguracja WooCommerce

### Generowanie kluczy API:

1. Zaloguj się do panelu WordPress
2. Przejdź do **WooCommerce → Ustawienia → Zaawansowane → REST API**
3. Kliknij **Dodaj klucz**
4. Wypełnij formularz:
   - **Opis:** Next.js Store
   - **Użytkownik:** Wybierz użytkownika z uprawnieniami administratora
   - **Uprawnienia:** Odczyt/Zapis
5. Skopiuj **Consumer Key** i **Consumer Secret** do pliku `.env.local`

### Włączenie CORS (opcjonalnie):

Jeśli Twój WordPress i Next.js działają na różnych domenach, dodaj do `wp-config.php`:

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

## Struktura projektu

```
woocommerce-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Strona główna
│   │   ├── products/          # Strony produktów
│   │   ├── cart/              # Koszyk
│   │   ├── checkout/          # Proces płatności
│   │   ├── account/           # Konto użytkownika
│   │   └── order-confirmation/ # Potwierdzenie zamówienia
│   ├── components/            # Komponenty React
│   │   ├── ui/               # Komponenty shadcn/ui
│   │   ├── layout/           # Header, Footer
│   │   └── products/         # Komponenty produktów
│   ├── lib/                   # Biblioteki i utilities
│   │   ├── woocommerce.ts    # Klient WooCommerce API
│   │   └── utils.ts          # Funkcje pomocnicze
│   ├── store/                 # Zustand stores
│   │   └── cart-store.ts     # Store koszyka
│   └── types/                 # Typy TypeScript
│       └── woocommerce.ts    # Typy WooCommerce
├── public/                    # Pliki statyczne
└── .env.local                # Zmienne środowiskowe
```

## Główne funkcjonalności

### Strona główna
- Hero section z CTA
- Wyróżnione produkty
- Kategorie produktów
- Newsletter
- Sekcja z informacjami (dostawa, płatności, wsparcie)

### Produkty
- Lista wszystkich produktów
- Filtrowanie po kategoriach
- Wyszukiwanie
- Sortowanie
- Paginacja
- Produkty wyróżnione i promocyjne

### Strona produktu
- Galeria zdjęć
- Szczegóły produktu
- Obsługa wariantów
- Dodawanie do koszyka
- Zarządzanie ilością
- Informacje o dostępności
- Powiązane produkty (TODO)

### Koszyk
- Lista produktów w koszyku
- Zmiana ilości
- Usuwanie produktów
- Podgląd ceny
- Informacja o darmowej dostawie
- Persystencja w localStorage

### Checkout
- Formularz z walidacją
- Dane do faktury
- Adres dostawy
- Wybór metody płatności
- Podsumowanie zamówienia
- Integracja z WooCommerce API

### Konto użytkownika
- Przegląd konta
- Historia zamówień
- Ulubione produkty (TODO)
- Zarządzanie danymi osobowymi (TODO)

## Skrypty

```bash
# Uruchom serwer deweloperski
bun dev

# Zbuduj aplikację produkcyjną
bun run build

# Uruchom aplikację produkcyjną
bun start

# Sprawdź kod (Biome)
bun run lint

# Formatuj kod
bun run format
```

## Customizacja

### Kolory i style

Edytuj plik `src/app/globals.css` aby zmienić motywy kolorystyczne:

```css
@layer base {
  :root {
    --primary: /* twój kolor */;
    --secondary: /* twój kolor */;
    /* ... */
  }
}
```

### Logo i nazwa

1. Zmień `NEXT_PUBLIC_SITE_NAME` w `.env.local`
2. Edytuj komponent Header w `src/components/layout/header.tsx`
3. Dodaj logo do folderu `public/`

## Deployment

### Vercel (Zalecane)

1. Push kod do GitHub
2. Importuj projekt w Vercel
3. Dodaj zmienne środowiskowe
4. Deploy!

### Inne platformy

```bash
# Zbuduj aplikację
bun run build

# Uruchom w trybie produkcyjnym
bun start
```

## Roadmap

- [ ] System logowania/rejestracji
- [x] ~~Integracja z bramkami płatności~~ **Stripe - DONE!** ✅
- [ ] Integracja z PayPal
- [ ] Powiązane produkty
- [ ] Recenzje produktów
- [ ] System ulubionych
- [ ] Porównywarka produktów
- [ ] Multi-język (i18n)
- [ ] PWA
- [ ] Testy jednostkowe i E2E

## 📚 Dodatkowa dokumentacja

- **[STRIPE.md](STRIPE.md)** - Szczegółowa instrukcja konfiguracji płatności Stripe
- **[SECURITY.md](SECURITY.md)** - Dokumentacja bezpieczeństwa i architektura
- **[KONFIGURACJA.md](KONFIGURACJA.md)** - Krok po kroku konfiguracja projektu
- **[FUNKCJE.md](FUNKCJE.md)** - Lista wszystkich funkcji i roadmap

## Wsparcie

W razie problemów:
1. Sprawdź czy wszystkie zmienne środowiskowe są poprawnie skonfigurowane
2. Upewnij się, że WooCommerce REST API jest włączone
3. Sprawdź logi w konsoli przeglądarki i terminalu

## Licencja

MIT

## Autor

Zbudowane z ❤️ używając Next.js 15 i WooCommerce
