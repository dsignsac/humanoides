# Skill: GSAP crollTrigger
# Path: .agent/skills/gsap/scrolltrigger.md

## Descripción
Creación de experiencias interactivas basadas en el scroll del usuario. Permite vincular timelines al progreso del scroll o disparar eventos en puntos específicos.

## Capacidades
- Animaciones "Scrub" (vinculadas directamente a la barra de scroll).
- Fijación de elementos (Pinning).
- Marcadores de depuración y triggers personalizados.

## Protocolo de Optimización
- **Batching**: Usar `ScrollTrigger.batch()` para listas largas.
- **Proxy**: Configurar scroll proxies si se usa Smooth Scrolling externo.
- **Refresh**: Ejecutar `ScrollTrigger.refresh()` tras cambios en el DOM.

## Ejemplo de Código
```javascript
gsap.to(".section", {
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
    end: "bottom center",
    scrub: true,
    pin: true
  },
  backgroundColor: "#000"
});