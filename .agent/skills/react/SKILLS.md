# Skill: Vercel & React Best Practices
# Path: .agent/skills/react/SKILLS.md

## 1. Descripción
Guía de estándares de ingeniería para el desarrollo de aplicaciones React de alto rendimiento optimizadas para la infraestructura de Vercel. Se enfoca en maximizar Core Web Vitals mediante el uso de patrones modernos de Next.js, renderizado híbrido y validación estricta.

## 2. Capacidades y Responsabilidades
* **Optimización de Renderizado**: Implementación de React Server Components (RSC) para minimizar el bundle de JavaScript.
* **Estrategias de Fetching**: Uso de `Suspense` y `Streaming` para optimizar el Time to First Byte (TTFB).
* **Edge Caching**: Configuración de ISR (Incremental Static Regeneration) y gestión de `revalidate` en el Edge Network.
* **Type Safety**: Validación de datos externos mediante Zod para garantizar la integridad del sistema.

## 3. Protocolo de Implementación
1. **Server-First Architecture**: Evaluar siempre si un componente puede ser Server Component antes de usar `'use client'`.
2. **Image Optimization**: Uso mandatorio de `next/image` con prioridades y dimensiones correctas para evitar Cumulative Layout Shift (CLS).
3. **Layout Patterns**: Implementar `layout.tsx` para persistir estados de UI y reducir re-renders innecesarios.
4. **Data Integrity**: Validar cada entrada de API con esquemas de Zod antes de su renderizado o procesamiento.

## 4. Ejemplos de Referencia

### A. Server Component con Streaming
import { Suspense } from 'react';
import { ProductList } from './components/ProductList';
import { ProductSkeleton } from './components/ProductSkeleton';

export default async function Page() {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Catálogo Vanguard</h1>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList />
      </Suspense>
    </section>
  );
}

### B. Optimización de Caching y Tipado
interface GlobalData {
  id: string;
  title: string;
  status: 'active' | 'inactive';
}

async function getGlobalData(): Promise<GlobalData[]> {
  const res = await fetch('https://api.example.com/data', {
    next: { 
      revalidate: 3600, // Revalidación horaria en el Edge
      tags: ['global-data'] 
    }
  });

  if (!res.ok) throw new Error('Error en la red');
  return res.json();
}

### C. Validación con Zod (Strict Mode)
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['admin', 'user']),
});

export type User = z.infer<typeof UserSchema>;

export async function validateUser(data: unknown): Promise<User> {
  // Garantiza que el código solo procese datos válidos
  return UserSchema.parse(data);
}

## 5. Auditoría de Performance
- Verificar que el `LCP` sea inferior a 2.5s.
- Asegurar que no existan fugas de memoria por listeners no removidos.
- Validar que los componentes cliente tengan el tamaño de bundle mínimo posible.