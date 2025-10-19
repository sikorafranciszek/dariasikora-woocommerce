# Cloudflare Turnstile Integration

Aplikacja używa Cloudflare Turnstile do ochrony formularzy logowania i rejestracji przed botami.

## Konfiguracja

### 1. Uzyskaj klucze Turnstile

1. Przejdź do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Wybierz "Turnstile" z menu bocznego
3. Kliknij "Add site" i skonfiguruj domenę
4. Skopiuj "Site Key" i "Secret Key"

### 2. Skonfiguruj zmienne środowiskowe

Dodaj następujące zmienne do pliku `.env.local`:

```bash
# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
TURNSTILE_SECRET_KEY=your_secret_key_here
```

### 3. Klucze testowe (tylko do developmentu)

Dla środowiska testowego możesz użyć kluczy testowych Cloudflare:

```bash
# Testowe klucze (zawsze przechodzą weryfikację)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

## Jak to działa

1. **Formularz logowania/rejestracji**: Użytkownik musi najpierw przejść weryfikację Turnstile
2. **Walidacja po stronie klienta**: Przycisk submit jest zablokowany dopóki Turnstile nie zostanie zweryfikowany
3. **Walidacja po stronie serwera**: Token jest weryfikowany przez Cloudflare API (w przyszłości)

## Komponenty

- `TurnstileComponent`: Komponent React opakowujący Cloudflare Turnstile
- `verifyTurnstileToken`: Funkcja pomocnicza do weryfikacji tokenów po stronie serwera

## Bezpieczeństwo

- Site Key jest publiczny i może być widoczny w kodzie klienta
- Secret Key musi pozostać prywatny i być używany tylko po stronie serwera
- Tokeny są jednorazowe i wygasają po określonym czasie

## Troubleshooting

Jeśli Turnstile nie ładuje się:

1. Sprawdź czy `NEXT_PUBLIC_TURNSTILE_SITE_KEY` jest poprawnie ustawiony
2. Sprawdź konsolę przeglądarki pod kątem błędów
3. Upewnij się, że domena jest poprawnie skonfigurowana w Cloudflare Dashboard
