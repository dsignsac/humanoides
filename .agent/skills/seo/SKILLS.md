# Skill: SEO & Programmatic SEO (Expert)
# Path: .agent/skills/seo/SKILLS.md

## 1. Descripción
Estrategias avanzadas para el posicionamiento orgánico en motores de búsqueda (SEO), con especial énfasis en SEO Programático (PSEO) para la generación masiva de páginas de alta calidad basadas en datos. Se enfoca en la relevancia semántica, la velocidad de indexación y la arquitectura de datos para dominar keywords de larga cola (long-tail).

## 2. Capacidades y Responsabilidades
* **Auditoría Técnica Estricta**: Optimización de Core Web Vitals (LCP, FID, CLS) y jerarquía semántica impecable.
* **PSEO (Programmatic SEO)**: Creación de sistemas que generan miles de páginas únicas basadas en datasets dinámicos y plantillas escalables.
* **Structured Data**: Implementación masiva de JSON-LD (Schema.org) para obtener fragmentos enriquecidos (rich snippets) en las SERPs.
* **Indexation Strategy**: Control total sobre `sitemap.xml`, `robots.txt` y meta-etiquetas de canonización para evitar contenido duplicado.

## 3. Protocolo de Implementación
1. **Dynamic Templating**: Diseñar plantillas donde el 30-40% del contenido sea variable para asegurar la originalidad ante Google.
2. **Metadata Orchestration**: Generación dinámica de `title` y `description` basada en variables de búsqueda real.
3. **Semantic HTML5**: Uso mandatorio de etiquetas `main`, `section`, `article` y `aside` para facilitar el crawling.
4. **Internal Link Graph**: Implementar hubs de contenido que distribuyan el "Link Juice" de manera equitativa entre las páginas programáticas.

## 4. Ejemplos de Referencia

### A. Implementación de JSON-LD en Next.js (App Router)
import { Product } from '@/types';

export default function SchemaScript({ product }: { product: Product }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

### B. Estructura de Rutas PSEO Escalables
// Estructura de URLs recomendada para evitar canibalización:
// 1. Comparativas: /compare/[product-a]-vs-[product-b]
// 2. Local SEO: /best-[service]-in-[city]
// 3. Herramientas: /[tool]-for-[niche]

// Ejemplo de generación de Metadatos Dinámicos:
export async function generateMetadata({ params }: { params: { city: string } }) {
  return {
    title: `Los mejores Arquitectos de Software en ${params.city} | Vanguard Architect`,
    description: `Expertos en React, GSAP y Vercel disponibles en ${params.city}. Optimización nivel Awwwards.`,
    alternates: {
      canonical: `https://vanguard.sh/experts/${params.city}`,
    }
  };
}

### C. Configuración de Robots e Indexación
// app/robots.ts
import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://vanguard.sh/sitemap.xml',
  };
}

## 5. Auditoría de Calidad SEO
- Validar que no existan errores de redirección (301/302) innecesarios.
- Comprobar que todas las imágenes tengan el atributo `alt` descriptivo.
- Asegurar que el tiempo de respuesta del servidor (TTFB) sea inferior a 200ms para facilitar el rastreo.