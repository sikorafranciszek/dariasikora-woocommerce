import { NextRequest, NextResponse } from "next/server";
import { createSearchParamsCache, parseAsString, parseAsInteger } from 'nuqs/server';

const BASELINKER_API_URL = "https://api.baselinker.com/connector.php";
const BASELINKER_API_TOKEN = process.env.BASELINKER_API_TOKEN;

const searchParamsCache = createSearchParamsCache({
  method: parseAsString.withDefault("getInventories"),
  inventory_id: parseAsString,
  date_from: parseAsInteger,
  status_id: parseAsInteger,
});

/**
 * BaseLinker API Connector
 *
 * Obsługiwane metody:
 * - GET /api/baselinker?method=getInventories - Lista magazynów
 * - GET /api/baselinker?method=getInventoryProducts&inventory_id=XXX - Produkty z magazynu
 * - GET /api/baselinker?method=getOrders - Lista zamówień
 *
 * Dokumentacja: https://api.baselinker.com/
 */
export async function GET(request: NextRequest) {
  if (!BASELINKER_API_TOKEN) {
    return NextResponse.json(
      { error: "BASELINKER_API_TOKEN nie jest ustawiony w zmiennych środowiskowych" },
      { status: 500 }
    );
  }

  const { method, inventory_id, date_from, status_id } = searchParamsCache.parse(
    Object.fromEntries(request.nextUrl.searchParams.entries())
  );

  try {
    // Przygotuj parametry w zależności od metody
    let parameters: any = {};

    switch (method) {
      case "getInventoryProducts":
        if (!inventory_id) {
          return NextResponse.json(
            { error: "Parametr inventory_id jest wymagany dla metody getInventoryProducts" },
            { status: 400 }
          );
        }
        parameters = {
          inventory_id: inventory_id,
        };
        break;

      case "getOrders":
        // Parametry opcjonalne dla getOrders
        if (date_from) parameters.date_from = date_from;
        if (status_id) parameters.status_id = status_id;
        break;

      case "getInventories":
        // Brak dodatkowych parametrów
        break;

      default:
        return NextResponse.json(
          { error: `Nieobsługiwana metoda: ${method}` },
          { status: 400 }
        );
    }

    // Wywołaj BaseLinker API
    const response = await fetch(BASELINKER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: BASELINKER_API_TOKEN,
        method: method,
        parameters: JSON.stringify(parameters),
      }).toString(),
    });

    if (!response.ok) {
      console.error("BaseLinker API error:", response.statusText);
      return NextResponse.json(
        { error: "Błąd w komunikacji z BaseLinkerem" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Sprawdź czy są błędy w odpowiedzi
    if (data.status === "ERROR") {
      console.error("BaseLinker error:", data);
      return NextResponse.json(
        {
          error: data.error_message || "Błąd BaseLinker",
          error_code: data.error_code,
        },
        { status: 400 }
      );
    }

    console.log(`[BaseLinker] ${method} success:`, Object.keys(data));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling BaseLinker API:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas komunikacji z BaseLinker" },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint - do tworzenia/aktualizacji danych w BaseLinker
 */
export async function POST(request: NextRequest) {
  if (!BASELINKER_API_TOKEN) {
    return NextResponse.json(
      { error: "BASELINKER_API_TOKEN nie jest ustawiony" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { method, parameters } = body;

    if (!method) {
      return NextResponse.json(
        { error: "Parametr 'method' jest wymagany" },
        { status: 400 }
      );
    }

    // Wywołaj BaseLinker API
    const response = await fetch(BASELINKER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        token: BASELINKER_API_TOKEN,
        method: method,
        parameters: JSON.stringify(parameters || {}),
      }).toString(),
    });

    if (!response.ok) {
      console.error("BaseLinker API error:", response.statusText);
      return NextResponse.json(
        { error: "Błąd w komunikacji z BaseLinkerem" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Sprawdź czy są błędy w odpowiedzi
    if (data.status === "ERROR") {
      console.error("BaseLinker error:", data);
      return NextResponse.json(
        {
          error: data.error_message || "Błąd BaseLinker",
          error_code: data.error_code,
        },
        { status: 400 }
      );
    }

    console.log(`[BaseLinker POST] ${method} success`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling BaseLinker API:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas komunikacji z BaseLinker" },
      { status: 500 }
    );
  }
}
