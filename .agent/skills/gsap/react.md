# Skill: GSAP React Integration
# Path: .agent/skills/gsap/react.md

## Descripción
Integración de alto rendimiento entre GSAP y React 18/19. Enfocado en la gestión de referencias y la limpieza automática de memoria.

## Capacidades
- Uso de `useGSAP()` hook para scoping automático.
- Gestión de `useRef` para selección segura de elementos.
- Limpieza de tweens para evitar memory leaks en SPA.

## Reglas de Oro
- **useGSAP**: Reemplaza a `useEffect` para todas las lógicas de animación.
- **Context**: Siempre envolver las animaciones para permitir la limpieza mediante `ctx.revert()`.

## Ejemplo de Código
```javascript
import { useGSAP } from "@gsap/react";

const MyComponent = () => {
  const container = useRef();

  useGSAP(() => {
    gsap.to(".ball", { x: 200 });
  }, { scope: container }); // Scoping automático

  return <div ref={container}><div className="ball" /></div>;
};