import { Suspense } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { verifyStripeSession } from "@/app/checkout/stripe-actions";
import { createSearchParamsCache, parseAsString } from "nuqs/server";

const searchParamsCache = createSearchParamsCache({
  session_id: parseAsString,
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function SuccessContent({
  sessionId,
}: {
  sessionId: string | undefined;
}) {
  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <XCircle className="h-12 w-12 text-red-500" />
              <CardTitle className="text-2xl">Błąd płatności</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Nie znaleziono sesji płatności. Link może być nieprawidłowy lub
              wygasł.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/cart">Powrót do koszyka</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Strona główna</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const result = await verifyStripeSession(sessionId);

  if (!result.success || !result.session) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <XCircle className="h-12 w-12 text-red-500" />
              <CardTitle className="text-2xl">
                Błąd weryfikacji płatności
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              {result.error ||
                "Nie udało się zweryfikować płatności. Skontaktuj się z obsługą klienta."}
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/cart">Powrót do koszyka</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Strona główna</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { session } = result;
  const isPaid = session.payment_status === "paid";

  if (!isPaid) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
              <CardTitle className="text-2xl">
                Oczekiwanie na płatność
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Twoja płatność jest w trakcie przetwarzania. Zamówienie zostanie
              utworzone po potwierdzeniu płatności.
            </p>
            <p className="text-sm text-gray-500">
              Otrzymasz wiadomość email z potwierdzeniem zamówienia na adres:{" "}
              <strong>{session.customer_email}</strong>
            </p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/">Strona główna</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (
    amountInCents: number | null,
    currency: string | null
  ) => {
    if (amountInCents === null) return "N/A";
    const amount = amountInCents / 100;
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: currency?.toUpperCase() || "PLN",
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <CardTitle className="text-2xl">
              Płatność zakończona pomyślnie!
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">Dziękujemy za zakupy!</p>
            <p className="text-green-700 text-sm mt-1">
              Twoje zamówienie zostało przyjęte i jest w trakcie realizacji.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Szczegóły płatności</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">Opłacone</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kwota:</span>
                <span className="font-semibold">
                  {formatPrice(session.amount_total, session.currency)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{session.customer_email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ID sesji:</span>
                <span className="text-gray-500 font-mono text-xs">
                  {session.id}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-4">
              Potwierdzenie zamówienia zostało wysłane na adres email:{" "}
              <strong>{session.customer_email}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Zamówienie zostanie utworzone w naszym systemie w ciągu kilku
              minut. Możesz sprawdzić jego status w panelu klienta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/">Kontynuuj zakupy</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/account">Moje zamówienia</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id } = searchParamsCache.parse(await searchParams);

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 max-w-2xl">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
              <span className="ml-3 text-gray-600">
                Weryfikacja płatności...
              </span>
            </CardContent>
          </Card>
        </div>
      }
    >
      <SuccessContent sessionId={session_id || undefined} />
    </Suspense>
  );
}
