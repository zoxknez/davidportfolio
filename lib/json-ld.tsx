import { SITE, CONTACT, SOCIAL_LINKS } from "@/lib/constants";

// Types for JSON-LD schemas
interface Person {
  "@type": "Person";
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  sameAs?: string[];
}

interface Organization {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": "ContactPoint";
    email: string;
    contactType: string;
  };
}

interface WebSite {
  "@type": "WebSite";
  name: string;
  url: string;
  description?: string;
  publisher?: Organization | Person;
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

interface WebPage {
  "@type": "WebPage";
  name: string;
  description?: string;
  url: string;
  isPartOf?: {
    "@type": "WebSite";
    "@id": string;
  };
}

interface BlogPosting {
  "@type": "BlogPosting";
  headline: string;
  description?: string;
  image?: string;
  author?: Person;
  datePublished?: string;
  dateModified?: string;
  publisher?: Organization;
  mainEntityOfPage?: string;
}

interface Product {
  "@type": "Product";
  name: string;
  description?: string;
  image?: string;
  brand?: Organization;
  offers?: {
    "@type": "Offer";
    price: number;
    priceCurrency: string;
    availability: string;
    url?: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
}

interface Service {
  "@type": "Service";
  name: string;
  description?: string;
  provider?: Organization | Person;
  areaServed?: string;
  serviceType?: string;
}

interface FAQPage {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

// Base organization data
const organizationData: Organization = {
  "@type": "Organization",
  name: SITE.shortName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  sameAs: [
    SOCIAL_LINKS.instagram.url,
    SOCIAL_LINKS.threads.url,
    SOCIAL_LINKS.facebook.url,
    SOCIAL_LINKS.youtube.url,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT.email,
    contactType: "customer service",
  },
};

// Base person (trainer) data
const trainerData: Person = {
  "@type": "Person",
  name: "David Knežević",
  url: SITE.url,
  image: `${SITE.url}/images/david.jpg`,
  jobTitle: "Elite Fitness Coach",
  sameAs: [
    SOCIAL_LINKS.instagram.url,
    SOCIAL_LINKS.threads.url,
    SOCIAL_LINKS.facebook.url,
  ],
};

// JSON-LD Generator Functions
export function generateWebsiteSchema(): string {
  const schema: WebSite = {
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: organizationData,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    ...schema,
  });
}

export function generateOrganizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...organizationData,
  });
}

export function generatePersonSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    ...trainerData,
  });
}

export function generateWebPageSchema(
  name: string,
  description: string,
  url: string
): string {
  const schema: WebPage = {
    "@type": "WebPage",
    name,
    description,
    url: `${SITE.url}${url}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": SITE.url,
    },
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    ...schema,
  });
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt: Date;
  modifiedAt?: Date;
}): string {
  const schema: BlogPosting = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image || `${SITE.url}/images/blog-default.jpg`,
    author: trainerData,
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.modifiedAt?.toISOString() || post.publishedAt.toISOString(),
    publisher: organizationData,
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    ...schema,
  });
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  slug: string;
  price: number;
  currency?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
}): string {
  const schema: Product = {
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image || `${SITE.url}/images/program-default.jpg`,
    brand: organizationData,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/programs/${product.slug}`,
    },
  };

  if (product.rating && product.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    ...schema,
  });
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
}): string {
  const schema: Service = {
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: trainerData,
    areaServed: "Worldwide",
    serviceType: service.serviceType,
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    ...schema,
  });
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): string {
  const schema: FAQPage = {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return JSON.stringify({
    "@context": "https://schema.org",
    ...schema,
  });
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  });
}

// React Component for JSON-LD
interface JsonLdProps {
  schema: string;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  );
}

// Multiple schemas component
export function MultipleJsonLd({ schemas }: { schemas: string[] }) {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
    </>
  );
}

// Default schemas for the homepage
export function HomePageSchemas() {
  return (
    <MultipleJsonLd
      schemas={[
        generateWebsiteSchema(),
        generateOrganizationSchema(),
        generatePersonSchema(),
        generateServiceSchema({
          name: "Personal Training",
          description:
            "Transform your body and mind with personalized fitness coaching and structured training programs.",
          serviceType: "Personal Training",
        }),
      ]}
    />
  );
}
