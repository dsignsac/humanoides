# Skill: TypeScript Advanced Types
# Path: .agent/skills/typescript/SKILLS.md

## 1. Descripción
Dominio de tipos avanzados y lógica de tipos compleja en TypeScript para garantizar la seguridad de tipos (Type Safety) en arquitecturas de gran escala. Se enfoca en la creación de sistemas de tipos resilientes que minimicen errores en tiempo de ejecución mediante el uso de genéricos, tipos condicionales y manipulación de tipos en tiempo de compilación.

## 2. Capacidades y Responsabilidades
* **Tipado Condicional**: Creación de tipos dinámicos mediante la palabra clave `extends` e `infer`.
* **Utility Types Personalizados**: Implementación de utilidades avanzadas como `DeepPartial`, `OmitByValue` o `PickByType`.
* **Type Guards & Assertions**: Desarrollo de funciones de predicado (`isType`) para asegurar la integridad de datos en runtime.
* **Mapeo de Tipos**: Transformación de interfaces existentes usando Mapped Types y Template Literal Types para automatización de APIs.

## 3. Protocolo de Implementación
1. **No-Any Policy**: Prohibición estricta del uso de `any`; priorizar `unknown` y estrechamiento de tipos (type narrowing).
2. **Generics naming**: Utilizar nombres descriptivos para genéricos (ej: `TData`, `TResponse`) para mejorar la legibilidad del código arquitectónico.
3. **Discriminated Unions**: Implementar siempre un patrón de "tag" o "kind" para manejar estados complejos y asegurar la exhaustividad en el control de flujo.

## 4. Ejemplos de Referencia

### A. Inferencia de Tipos Condicionales
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extracción de tipos de parámetros (Pattern Matching con infer)
type ExtractParams<T> = T extends { params: infer P } ? P : never;

### B. Mapped Types & Template Literals (Getters Automáticos)
interface User {
  name: string;
  age: number;
}

// Transforma una interfaz en un objeto de Getters tipado
type Getter<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

// Resultado: { getName: () => string; getAge: () => number; }
type UserGetters = Getter<User>;

### C. Discriminated Unions & Exhaustiveness Checking
interface SuccessState {
  status: 'success';
  data: string[];
}

interface ErrorState {
  status: 'error';
  message: string;
}

type APIState = SuccessState | ErrorState;

function handleState(state: APIState) {
  switch (state.status) {
    case 'success':
      console.log(state.data);
      break;
    case 'error':
      console.error(state.message);
      break;
    default:
      // Garantía de compilación: si falta un caso, TS lanzará un error
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
}

## 5. Auditoría de Escalabilidad
- Evitar el uso de `type` para objetos que requieran extensibilidad (preferir `interface`).
- Asegurar que los tipos complejos no degraden el tiempo de respuesta del servidor de lenguaje (TS Server).
- Validar que las definiciones de tipos coincidan con las respuestas reales de las Edge Functions en Vercel.