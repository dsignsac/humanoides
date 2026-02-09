# Responsive Design Skill

## Metadata
- **Name**: responsive-design
- **Description**: Master modern responsive design techniques to create interfaces that adapt seamlessly across all screen sizes and device contexts.
- **Category**: Frontend Design
- **Author**: wshobson/agents

## When to Use This Skill
- Implementing mobile-first responsive layouts.
- Using container queries for component-based responsiveness.
- Creating fluid typography and spacing scales.
- Building complex layouts with CSS Grid and Flexbox.
- Designing breakpoint strategies for design systems.
- Implementing responsive images and media.
- Creating adaptive navigation patterns.
- Building responsive tables and data displays.

## Core Capabilities

### 1. Container Queries
Component-level responsiveness independent of viewport.
- **Units**: `cqi` (inline), `cqw` (width), `cqh` (height).
- **Style Queries**: Conditional styling based on container properties.
- **Fallback Strategy**: Ensuring browser support through progressive enhancement.

### 2. Fluid Typography & Spacing
- **CSS `clamp()`**: Creating fluid scaling without multiple media queries.
- **Viewport Units**: Utilizing `vw`, `vh`, and the newer `dvh` (dynamic viewport height).
- **Type Scales**: Defining min/max bounds for consistent hierarchy.
- **Spacing Systems**: Fluid spacing using mathematical functions.

### 3. Layout Patterns
- **CSS Grid**: Mastering 2D layouts and alignment.
- **Flexbox**: Efficient 1D distribution and wrapping.
- **Intrinsic Layouts**: Sizing based on content rather than fixed containers.
- **Subgrid**: Inheriting and aligning to parent grid structures.

### 4. Breakpoint Strategy
- **Mobile-first**: Building up from the smallest screen.
- **Content-based**: Setting breakpoints where the design "breaks", not just for devices.
- **Design Tokens**: Integrating responsive logic into the core system tokens.
- **Feature Queries**: Using `@supports` to target browser capabilities.

## Implementation Patterns

### Pattern 1: Fluid Typography with clamp()
```css
:root {
  /* clamp(min, preferred, max) */
  --step-0: clamp(1rem, 0.92rem + 0.39vw, 1.25rem);
  --step-1: clamp(1.25rem, 1.08rem + 0.83vw, 1.78rem);
  --step-2: clamp(1.56rem, 1.26rem + 1.51vw, 2.53rem);
}
Pattern 2: Container Query Component
CSS
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-content {
  display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
  }
}
Pattern 3: CSS Grid Responsive Layout
CSS
.responsive-grid {
  display: grid;
  /* Auto-fit columns with a minimum of 250px */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-fluid);
}
Pattern 4: Responsive Images with Art Direction
HTML
<picture>
  <source media="(min-width: 1024px)" srcset="/hero-wide.webp" type="image/webp" />
  <source media="(min-width: 768px)" srcset="/hero-medium.webp" type="image/webp" />
  <img src="/hero-mobile.webp" alt="Hero Description" loading="lazy" />
</picture>

## Best Practices
- **Prioritize Intrinsic Sizing**: Use `min-content`, `max-content`, and `fit-content` before hardcoding widths.
- **Avoid Fixed Dimensions**: Use `max-width` instead of `width` and `min-height` instead of `height`.
- **Test with Real Data**: Responsive tables often break with long strings; test overflow strategies early.
- **Accessibility**: Ensure tap targets are at least 44x44px on mobile and font sizes never drop below readable levels.

## Resources
- **CSS Container Queries Guide**
- **Utopia Fluid Type Calculator**
- **Every Layout (Heydon Pickering & Andy Bell)**
- **Responsive Images Guide (MDN)**
- **CSS Grid Garden & Flexbox Froggy**