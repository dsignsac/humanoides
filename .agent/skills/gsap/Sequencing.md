# Skill: GSAP Sequencing
# Path: .agent/skills/gsap/sequencing.md

## Descripción
Gestión de secuencias complejas mediante `gsap.timeline()`. Permite encadenar animaciones con un control preciso del tiempo y el orden de ejecución.

## Capacidades
- Creación de líneas de tiempo modulares.
- Uso del Position Parameter para solapamiento de animaciones.
- Control maestro (play, pause, reverse, seek).

## Estándares de Uso
- **Modularidad**: Dividir timelines largos en funciones que retornen timelines más pequeños.
- **Position Parameter**: Evitar el uso excesivo de `delay` en favor de etiquetas o offsets (`"-=0.5"`, `"<"`).

## Ejemplo de Código
```javascript
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".header", { y: 0, opacity: 1 })
  .to(".content", { x: 0, opacity: 1 }, "-=0.2") // Solapamiento
  .from(".footer", { scale: 0 }, "<"); // Inicia al mismo tiempo que el anterior