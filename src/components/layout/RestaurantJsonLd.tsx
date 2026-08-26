import { siteContent } from "@/app/data/site-content";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function buildOpeningHoursSpecification() {
  const { closedWeekdays, openingHours } = siteContent.hours;
  const openDays = dayNames.filter((_, index) => !closedWeekdays.includes(index));
  const mainHours = openingHours.find((item) => item.hours !== "Cerrado");

  if (!mainHours || openDays.length === 0) {
    return [];
  }

  const [opens, closes] = mainHours.hours.split("-").map((value) => value.trim());

  return [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: openDays,
      opens,
      closes,
    },
  ];
}

export function RestaurantJsonLd() {
  const { identity, reviews } = siteContent;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: identity.name,
    "@id": siteUrl,
    url: siteUrl,
    image: `${siteUrl}${siteContent.seo.ogImage}`,
    telephone: identity.phone.e164,
    email: identity.email,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: identity.address.street,
      addressLocality: "Madrid",
      postalCode: identity.address.postalCode,
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: identity.geo.latitude,
      longitude: identity.geo.longitude,
    },
    openingHoursSpecification: buildOpeningHoursSpecification(),
    servesCuisine: "Spanish",
    review: reviews.items.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
