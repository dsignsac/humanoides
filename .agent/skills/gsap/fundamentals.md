# Skill: GSAP Fundamentals
# Path: .agent/skills/gsap/fundamentals.md

## Descripción
Domina los conceptos básicos de GreenSock Animation Platform (GSAP), incluyendo tweens simples, propiedades de animación y control de estados iniciales/finales.

## Capacidades
- Implementación de `gsap.to()`, `gsap.from()` y `gsap.fromTo()`.
- Control de propiedades CSS (transform, opacity, colors).
- Manejo de callbacks (onComplete, onUpdate, onStart).

## Protocolo de Implementación
1. **Target Selection**: Usar selectores de clase o `useRef` en React.
2. **Properties**: Definir valores de destino claros.
3. **Easing**: Utilizar curvas de aceleración estándar de GSAP (ej. `power2.inOut`).

## Ejemplo de Código
```javascript
// Tween básico
gsap.to(".box", {
  x: 100,
  duration: 1,
  ease: "power2.out",
  opacity: 1
});