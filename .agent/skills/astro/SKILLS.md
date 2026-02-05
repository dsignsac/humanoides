# Skill: Astro Framework Mastery
# Path: .agent/skills/astro/SKILLS.md

## 1. Descripción
Dominio de Astro para la creación de sitios web de alto rendimiento orientados al contenido con carga de JavaScript nula por defecto. Especialización en la arquitectura de "Islas" (Islands Architecture) para la hidratación selectiva y el aprovechamiento del renderizado estático y dinámico (SSR).

## 2. Capacidades y Responsabilidades
* **Island Architecture**: Implementación experta de directivas de hidratación (`client:load`, `client:visible`, `client:only`) para minimizar el impacto en el hilo principal.
* **Content Collections**: Gestión de contenido basado en archivos (Markdown/MDX) con validación estricta de esquemas mediante Zod para garantizar la integridad de los datos.
* **View Transitions**: Implementación de transiciones de página fluidas y persistentes para emular la experiencia de una SPA sin sacrificar el SEO.
* **Multi-Framework Integration**: Orquestación de componentes de diversos ecosistemas (React, Svelte, Vue) dentro de un mismo layout de Astro.

## 3. Protocolo de Implementación
1. **Static-First**: Priorizar componentes `.astro` para el renderizado en servidor. Solo usar componentes de framework (React/Vue) para interactividad compleja.
2. **Efficient Hydration**: Utilizar `client:visible` para componentes debajo del primer pantallazo (below the fold) para mejorar el LCP.
3. **Optimized Assets**: Uso obligatorio del componente nativo `<Image />` para la generación de formatos WebP/AVIF y evitar el Cumulative Layout Shift (CLS).
4. **Middleware & SSR**: Configurar el adaptador (Vercel/Node) para manejar sesiones y autenticación en el Edge cuando sea necesario.

## 4. Ejemplos de Referencia

### A. Definición de Colección de Contenido (Strict Type)
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    author: z.string().default('Vanguard Architect'),
    image: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };

### B. Hidratación Selectiva (Islas de React en Astro)
---
import Header from '../components/Header.astro'; // 0 JS
import InteractiveSlider from '../components/Slider.tsx'; // React Component
import Footer from '../components/Footer.astro'; // 0 JS
---

<Layout title="Home">
  <Header />
  
  <main>
    {/* La isla solo se carga y ejecuta cuando entra en el viewport */}
    <InteractiveSlider client:visible />
  </main>

  <Footer />
</Layout>

### C. Uso de View Transitions
---
import { ViewTransitions } from 'astro:transitions';
---
<head>
  <title>Vanguard Experience</title>
  <ViewTransitions />
</head>
<body class="bg-black text-white">
  <nav>
    <a href="/" transition:animate="fade">Inicio</a>
    <a href="/proyectos" transition:animate="slide">Proyectos</a>
  </nav>
</body>

## 5. Auditoría de Performance
- Asegurar que el Lighthouse score en Performance sea > 98.
- Validar que no se esté enviando JavaScript innecesario al cliente (inspeccionar `__astro_island`).
- Confirmar que los esquemas de Zod en Content Collections coincidan con los metadatos de los archivos `.md` o `.mdx`.