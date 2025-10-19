export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://dariasikora.pl/#localbusiness",
    "name": "My Primitive Dolls",
    "alternateName": "Daria Sikora Primitive Dolls",
    "description": "Unique handmade primitive dolls crafted with passion and traditional techniques by Polish artist Daria Sikora",
    "url": "https://dariasikora.pl",
    "telephone": "+48501083574",
    "email": "dariasikora@yahoo.pl",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stefana Starzyńskiego 2/83",
      "addressLocality": "Rzeszów",
      "addressRegion": "Podkarpackie",
      "postalCode": "35-508",
      "addressCountry": "PL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "50.0413",
      "longitude": "22.0046"
    },
    "image": "https://dariasikora.pl/og-image.jpg",
    "priceRange": "$$",
    "currenciesAccepted": "USD, EUR, PLN",
    "paymentAccepted": "Credit Card, Stripe",
    "founder": {
      "@type": "Person",
      "name": "Daria Sikora",
      "jobTitle": "Artist & Dollmaker",
      "email": "dariasikora@yahoo.pl"
    },
    "sameAs": [
      "https://www.facebook.com/MyPrimitiveDolls/",
      "https://www.instagram.com/myprimitivedolls/"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "European Union"
      },
      {
        "@type": "Country",
        "name": "United States"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      },
      {
        "@type": "Country",
        "name": "Canada"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
