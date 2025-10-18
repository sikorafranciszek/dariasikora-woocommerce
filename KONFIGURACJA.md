# Instrukcja konfiguracji sklepu WooCommerce + Next.js

## Krok 1: Przygotowanie WordPress i WooCommerce

### 1.1 Instalacja WordPress
1. Zainstaluj WordPress na swoim serwerze/hostingu
2. Zaloguj się do panelu administracyjnego WordPress

### 1.2 Instalacja WooCommerce
1. Przejdź do **Wtyczki → Dodaj nową**
2. Wyszukaj "WooCommerce"
3. Kliknij **Zainstaluj** i następnie **Aktywuj**
4. Przejdź przez kreator konfiguracji WooCommerce

### 1.3 Generowanie kluczy API WooCommerce
1. W panelu WordPress przejdź do **WooCommerce → Ustawienia**
2. Kliknij zakładkę **Zaawansowane**
3. Kliknij **REST API**
4. Kliknij przycisk **Dodaj klucz**
5. Wypełnij formularz:
   - **Opis:** "Next.js Headless Store"
   - **Użytkownik:** Wybierz administratora
   - **Uprawnienia:** Odczyt/Zapis
6. Kliknij **Generuj klucz API**
7. **WAŻNE:** Skopiuj i zapisz bezpiecznie:
   - Consumer Key (zaczyna się od `ck_`)
   - Consumer Secret (zaczyna się od `cs_`)

### 1.4 Włączenie CORS (jeśli potrzebne)

Jeśli WordPress i Next.js są na różnych domenach, dodaj do pliku `wp-config.php`:

```php
// Dodaj przed linią: /* That's all, stop editing! Happy publishing. */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

Lub zainstaluj wtyczkę "WP REST API CORS".

## Krok 2: Konfiguracja Next.js

### 2.1 Konfiguracja zmiennych środowiskowych

1. Skopiuj plik `.env.example` do `.env.local`:
```bash
cp .env.example .env.local
```

2. Edytuj `.env.local` i wpisz swoje dane:

```env
# Adres Twojego WordPressa (BEZ końcowego slasha)
NEXT_PUBLIC_WOOCOMMERCE_URL=https://twoj-sklep.pl

# Klucze API z kroku 1.3
WOOCOMMERCE_CONSUMER_KEY=ck_twoj_consumer_key_tutaj
WOOCOMMERCE_CONSUMER_SECRET=cs_twoj_consumer_secret_tutaj

# Adres Twojej aplikacji Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Mój Sklep
```

### 2.2 Instalacja zależności

```bash
bun install
```

### 2.3 Uruchomienie serwera deweloperskiego

```bash
bun dev
```

Otwórz [http://localhost:3000](http://localhost:3000)

## Krok 3: Dodawanie produktów w WooCommerce

### 3.1 Dodawanie pierwszego produktu

1. W panelu WordPress przejdź do **Produkty → Dodaj nowy**
2. Wypełnij formularz:
   - **Nazwa produktu:** np. "Testowy produkt"
   - **Opis:** Pełny opis produktu
   - **Krótki opis:** Krótki opis wyświetlany na liście
   - **Cena regularna:** np. 99.99
   - **Cena promocyjna:** (opcjonalnie)
   - **SKU:** Unikalny kod produktu
   - **Stan magazynowy:** W magazynie
3. Dodaj zdjęcia produktu:
   - **Obraz wyróżniający:** Główne zdjęcie
   - **Galeria produktu:** Dodatkowe zdjęcia
4. Wybierz kategorię
5. Kliknij **Opublikuj**

### 3.2 Tworzenie produktu zmiennego (z wariantami)

1. Utwórz nowy produkt
2. W polu **Dane produktu** wybierz **Produkt zmienny**
3. Przejdź do zakładki **Atrybuty**
4. Dodaj atrybut (np. "Rozmiar"):
   - Zaznacz: **Widoczny na stronie produktu**
   - Zaznacz: **Używany dla wariantów**
5. Dodaj wartości (np. "S|M|L|XL")
6. Kliknij **Zapisz atrybuty**
7. Przejdź do zakładki **Warianty**
8. Wybierz **Utwórz warianty ze wszystkich atrybutów**
9. Dla każdego wariantu ustaw:
   - Cenę
   - SKU
   - Stan magazynowy
10. Kliknij **Opublikuj**

### 3.3 Tworzenie kategorii

1. Przejdź do **Produkty → Kategorie**
2. Dodaj nową kategorię:
   - **Nazwa**
   - **Slug** (przyjazny URL)
   - **Opis**
   - **Obraz** (opcjonalnie)
3. Kliknij **Dodaj nową kategorię**

## Krok 4: Testowanie sklepu

### 4.1 Sprawdzanie połączenia z API

Otwórz konsolę przeglądarki (F12) i sprawdź czy nie ma błędów związanych z API.

### 4.2 Testowanie funkcjonalności

1. **Strona główna:**
   - Czy wyświetlają się wyróżnione produkty?
   - Czy wyświetlają się kategorie?

2. **Lista produktów:**
   - Przejdź do `/products`
   - Czy produkty się wyświetlają?
   - Czy wyszukiwarka działa?

3. **Strona produktu:**
   - Kliknij w produkt
   - Czy galeria zdjęć działa?
   - Czy można dodać do koszyka?

4. **Koszyk:**
   - Dodaj produkty do koszyka
   - Czy można zmieniać ilość?
   - Czy cena się aktualizuje?

5. **Checkout:**
   - Przejdź do procesu płatności
   - Wypełnij formularz
   - Złóż testowe zamówienie

6. **Panel WordPress:**
   - Sprawdź czy zamówienie pojawiło się w **WooCommerce → Zamówienia**

## Krok 5: Konfiguracja dodatkowa

### 5.1 Ustawienia WooCommerce

1. **WooCommerce → Ustawienia → Ogólne:**
   - Ustaw walutę (PLN)
   - Ustaw lokalizację

2. **WooCommerce → Ustawienia → Produkty:**
   - Skonfiguruj jednostki miar
   - Ustaw wymiary

3. **WooCommerce → Ustawienia → Wysyłka:**
   - Dodaj strefy wysyłki
   - Skonfiguruj metody dostawy
   - Ustaw koszty

4. **WooCommerce → Ustawienia → Płatności:**
   - Aktywuj metody płatności
   - Skonfiguruj bramy płatności (Stripe, PayPal, etc.)

### 5.2 Permalinki

1. Przejdź do **Ustawienia → Permalinki**
2. Wybierz **Nazwa wpisu**
3. Kliknij **Zapisz zmiany**

### 5.3 Optymalizacja obrazów

Zainstaluj wtyczkę do optymalizacji obrazów:
- **Smush** lub
- **ShortPixel** lub
- **Imagify**

## Krok 6: Deployment produkcyjny

### 6.1 Deployment na Vercel

1. Push projektu do GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/twoje-repo.git
git push -u origin main
```

2. Przejdź do [vercel.com](https://vercel.com)
3. Kliknij **Import Project**
4. Wybierz swoje repozytorium
5. W zakładce **Environment Variables** dodaj:
   - `NEXT_PUBLIC_WOOCOMMERCE_URL`
   - `WOOCOMMERCE_CONSUMER_KEY`
   - `WOOCOMMERCE_CONSUMER_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (adres produkcyjny)
   - `NEXT_PUBLIC_SITE_NAME`
6. Kliknij **Deploy**

### 6.2 Konfiguracja domeny

1. W Vercel przejdź do **Settings → Domains**
2. Dodaj swoją domenę
3. Skonfiguruj DNS zgodnie z instrukcjami Vercel

### 6.3 Aktualizacja WordPress

1. Zaktualizuj CORS w WordPress o produkcyjny adres
2. Wygeneruj nowe klucze API dla produkcji (opcjonalnie)

## Troubleshooting

### Problem: "Error fetching products"

**Rozwiązanie:**
1. Sprawdź czy klucze API są poprawne
2. Sprawdź czy WooCommerce REST API jest włączone
3. Sprawdź logi w konsoli przeglądarki
4. Sprawdź czy WordPress jest dostępny publicznie

### Problem: CORS errors

**Rozwiązanie:**
1. Dodaj nagłówki CORS do WordPress (patrz krok 1.4)
2. Lub zainstaluj wtyczkę CORS
3. Sprawdź czy `NEXT_PUBLIC_WOOCOMMERCE_URL` nie ma końcowego slasha

### Problem: Produkty się nie wyświetlają

**Rozwiązanie:**
1. Sprawdź czy produkty są opublikowane w WordPress
2. Sprawdź czy produkty mają status "publish"
3. Sprawdź logi w terminalu Next.js

### Problem: Zamówienia nie przechodzą

**Rozwiązanie:**
1. Sprawdź czy klucz API ma uprawnienia "Odczyt/Zapis"
2. Sprawdź logi w WordPress (WooCommerce → Status → Logi)
3. Sprawdź czy formularz checkout jest poprawnie wypełniony

## Wsparcie

Jeśli masz problemy:
1. Sprawdź dokumentację WooCommerce: https://woocommerce.com/documentation/
2. Sprawdź dokumentację Next.js: https://nextjs.org/docs
3. Sprawdź logi w konsoli przeglądarki (F12)
4. Sprawdź logi w terminalu Next.js
5. Sprawdź logi w WordPress

## Przydatne linki

- [WooCommerce REST API Documentation](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Hook Form Documentation](https://react-hook-form.com/)
