# Skill: Three.js Master Orchestration
# Path: .agent/skills/threejs/SKILLS.md

## 1. Descripción
Expertise integral en Three.js para la creación de experiencias 3D inmersivas de alto rendimiento. Cubre desde la configuración base de la escena hasta sombreadores (shaders) personalizados, optimización de renderizado y sistemas de interacción avanzada.

## 2. Capacidades y Responsabilidades

### A. Core Fundamentals
* **Scene Graph Management**: Estructuración eficiente de escenas, cámaras y renderizadores WebGL.
* **Geometry & Materials**: Manipulación de buffers y materiales avanzados (Standard/Physical).
* **Lighting & Shadows**: Optimización de luces dinámicas y mapas de sombras.

### B. Advanced Animation
* **RequestAnimationFrame Loop**: Gestión de deltas de tiempo para animaciones fluidas.
* **Keyframe Tracks**: Uso de `AnimationMixer` para modelos complejos.
* **GSAP Integration**: Sincronización de objetos 3D con timelines externos.

### C. Interaction & Raycasting
* **Raycaster Implementation**: Detección precisa de clics y eventos de mouse.
* **Input Mapping**: Manejo de coordenadas normalizadas (NDC) para interactividad.

### D. Custom Shaders (GLSL)
* **Vertex Shaders**: Manipulación de vértices para deformaciones.
* **Fragment Shaders**: Efectos visuales y post-procesamiento.
* **Uniforms**: Paso de datos CPU a GPU en tiempo real.

## 3. Protocolo de Implementación

1. **Scene Initialization**: Limpieza obligatoria mediante `dispose()` para prevenir memory leaks.
2. **Performance Optimization**: Uso de Instanced Rendering y Baking de sombras.
3. **Responsive 3D**: Actualización de aspect ratio y renderer en el evento `resize`.

## 4. Ejemplos de Referencia

### A. Configuración de Escena Base (Boilerplate)
```javascript
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({ color: 0x00ff00 }));
scene.add(cube);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  renderer.render(scene, camera);
}
animate();
```

### B. Raycasting para Interacción
```javascript
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    intersects[0].object.material.color.set(0xff0000);
  }
});
```

### C. Shader de Deformación Simple (Vertex Shader)
```glsl
varying vec2 vUv;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 newPosition = position;
  newPosition.z += sin(position.x * 5.0 + uTime) * 0.2;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
```

## 5. Auditoría de Calidad
- **Draw Calls**: Minimizar llamadas mediante `renderer.info.render.calls`.
- **Asset Management**: Carga asíncrona mediante `LoadingManager`.
- **Z-fighting**: Ajuste de planos `near` y `far` para evitar parpadeos visuales en profundidad.