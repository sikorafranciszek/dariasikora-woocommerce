# Google Analytics 4 Integration

Aplikacja została zintegrowana z Google Analytics 4 (GA4) z pełną obsługą GDPR i cookie consent.

## Konfiguracja

### 1. Uzyskaj Google Analytics ID

1. Przejdź do [Google Analytics](https://analytics.google.com/)
2. Utwórz nowe konto i właściwość
3. Skopiuj Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Skonfiguruj zmienne środowiskowe

Dodaj do pliku `.env.local`:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Funkcje śledzenia

Aplikacja zawiera gotowe funkcje do śledzenia e-commerce:

```typescript
import {
  trackProductView,
  trackAddToCart,
  trackPurchase
} from '@/lib/analytics';

// Śledzenie wyświetlenia produktu
trackProductView({
  item_id: 'product-123',
  item_name: 'Primitive Doll',
  category: 'Dolls',
  price: 99.99,
  quantity: 1
});

// Śledzenie dodania do koszyka
trackAddToCart({
  item_id: 'product-123',
  item_name: 'Primitive Doll',
  category: 'Dolls',
  price: 99.99,
  quantity: 1
});

// Śledzenie zakupu
trackPurchase('order-456', {
  currency: 'USD',
  value: 99.99,
  items: [...]
});
```

## GDPR Compliance

### Cookie Consent Integration

Google Analytics jest automatycznie integrowany z systemem cookie consent:

- **Domyślnie wyłączony** - GA4 nie ładuje się bez zgody
- **Consent Mode** - Używa Google Consent Mode v2
- **Automatyczna aktualizacja** - Zgoda jest aktualizowana dynamicznie

### Dostępne kategorie cookies:

- `essential` - Zawsze aktywne (wymagane)
- `analytics` - Google Analytics (opcjonalne)
- `functional` - Funkcjonalne cookies (opcjonalne)
- `payment` - Cookies płatności (opcjonalne)

## Komponenty

### GoogleTagManager

Główny komponent ładujący GA4:

- Integracja z cookie consent
- Consent Mode v2
- Anonimizacja IP (GDPR)

### useGoogleAnalytics Hook

Hook sprawdzający stan zgody na analytics:

```typescript
const analyticsEnabled = useGoogleAnalytics();
```

## E-commerce Events

Aplikacja automatycznie śledzi następujące zdarzenia:

| Event              | Opis                  | Kiedy wywoływane         |
| ------------------ | --------------------- | ------------------------ |
| `view_item`        | Wyświetlenie produktu | Na stronie produktu      |
| `add_to_cart`      | Dodanie do koszyka    | Kliknięcie "Add to cart" |
| `remove_from_cart` | Usunięcie z koszyka   | Usunięcie produktu       |
| `view_cart`        | Wyświetlenie koszyka  | Przejście do koszyka     |
| `begin_checkout`   | Rozpoczęcie checkout  | Przejście do checkout    |
| `purchase`         | Zakup                 | Ukończenie płatności     |

## Bezpieczeństwo

- ✅ **GDPR Compliant** - Pełna obsługa zgody na cookies
- ✅ **Consent Mode v2** - Najnowszy standard Google
- ✅ **IP Anonymization** - Anonimizacja adresów IP
- ✅ **Secure Cookies** - SameSite=Lax;Secure
- ✅ **No data collection** bez zgody

## Testowanie

Aby przetestować integrację:

1. Otwórz DevTools → Network
2. Zaakceptuj cookies analityczne
3. Sprawdź czy ładuje się `gtag/js?id=G-XXXXXXXXXX`
4. W konsoli sprawdź `window.gtag` i `window.dataLayer`

## Troubleshooting

**GA4 nie ładuje się:**

1. Sprawdź `NEXT_PUBLIC_GA_ID` w zmiennych środowiskowych
2. Sprawdź czy użytkownik zaakceptował cookies analityczne
3. Sprawdź konsolę przeglądarki pod kątem błędów

**Wydarzenia nie są śledzone:**

1. Sprawdź czy `analyticsEnabled` zwraca `true`
2. Sprawdź czy `window.gtag` jest dostępny
3. Użyj GA4 DebugView do sprawdzenia eventów w czasie rzeczywistym
