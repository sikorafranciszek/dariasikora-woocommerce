export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dariasikora.pl/#website",
    "url": "https://dariasikora.pl",
    "name": "My Primitive Dolls",
    "description": "Unique handmade primitive dolls crafted with passion and traditional techniques",
    "publisher": {
      "@type": "Organization",
      "name": "My Primitive Dolls",
      "@id": "https://dariasikora.pl/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dariasikora.pl/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-US"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
