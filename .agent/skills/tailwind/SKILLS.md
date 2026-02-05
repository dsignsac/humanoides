# Skill: Tailwind Design System & Mobile First
# Path: .agent/skills/tailwind/SKILLS.md

## 1. Descripción
Expertise en la creación de sistemas de diseño escalables y responsivos utilizando Tailwind CSS 4.0+. Prioriza la arquitectura "Mobile First" y el uso de Design Tokens mediante la configuración del tema para garantizar consistencia visual y un rendimiento óptimo en la renderización del CSS.

## 2. Capacidades y Responsabilidades
* **Responsive Architecture**: Aplicación rigurosa de clases base para móviles, escalando hacia `md:`, `lg:` y `xl:` mediante breakpoints ascendentes.
* **Design Tokens**: Centralización de la identidad de marca (colores, tipografía, espaciado) en el archivo de configuración o variables CSS.
* **Component Abstraction**: Uso de patrones de composición y `class-variance-authority` (CVA) para variantes de UI.
* **Optimización de Performance**: Eliminación de estilos no utilizados y minimización del tiempo de ejecución mediante JIT (Just-In-Time).

## 3. Protocolo de Implementación
1. **Mobile First**: Escribir siempre la lógica visual para pantallas de 320px-375px y usar modificadores para pantallas grandes.
2. **Atomic Consistency**: Evitar valores arbitrarios (ej. `top-[13px]`); utilizar la escala estándar de Tailwind o extender el tema.
3. **Accessibility (A11y)**: Garantizar contrastes WCAG AA y tamaños de "Touch Targets" mínimos de 44px en dispositivos móviles.
4. **No-Purge Safety**: Asegurar que las clases generadas dinámicamente estén presentes de forma literal en el código para evitar que el compilador las elimine.

## 4. Ejemplos de Referencia

### A. Touch Targets & Responsive Grid
// Botón optimizado para pulgar en móvil y cursor en desktop
<button class="flex items-center justify-center min-h-[48px] min-w-[48px] px-6 py-3 
               bg-primary-600 text-white font-medium rounded-full
               md:min-h-[40px] md:text-sm hover:scale-[1.02] active:scale-95 
               transition-all duration-200">
  Explorar Proyecto
</button>

// Grid auto-ajustable con Mobile-First
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
  <article class="group p-6 border border-white/10 rounded-2xl bg-neutral-900">
    <h3 class="group-hover:text-primary-400 transition-colors">Vanguard Card</h3>
  </article>
</div>

### B. Configuración de Design Tokens (Tailwind Config)
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        vanguard: {
          900: '#0a0a0a',
          DEFAULT: '#6366f1',
          light: '#818cf8'
        }
      },
      spacing: {
        'touch': '48px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)'
      }
    }
  }
}

### C. Layout Responsivo con Grid Avanzado
// Layout que previene el CLS (Cumulative Layout Shift)
<div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-6">
  {items.map(item => (
    <div key={item.id} className="aspect-video relative overflow-hidden rounded-xl">
      <img src={item.src} alt={item.alt} className="object-cover w-full h-full" />
    </div>
  ))}
</div>

## 5. Auditoría de Diseño
- Validar que no se utilicen `@apply` de forma innecesaria (mantener Utility-First).
- Comprobar que los estados `hover:` solo se activen en dispositivos con puntero (`@media (hover: hover)`).
- Asegurar que la jerarquía tipográfica sea fluida mediante el uso de `clamp()`.