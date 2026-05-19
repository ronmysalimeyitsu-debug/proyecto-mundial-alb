# Plan de Acción para refactorización

Este plan está diseñado en tres pasos para evitar intentar arreglar todo a la vez, aplicando los principios de Responsabilidad Única e Inversión de Dependencias.

| Prioridad | Tipo | Tarea | Alcance | Invariantes | Cómo probar manualmente |
|---|---|---|---|---|---|
| P0 | Refactor | Separar lógica de presentación | Extraer la lógica del álbum a un módulo independiente y mantener la interfaz de usuario en otro archivo o script | El cálculo de estadísticas y el registro de cromos no deben cambiar. La salida debe seguir mostrando el mismo resultado. | Ejecutar el script o la app y verificar que la colección se registra igual y que no se pierden datos. |
| P1 | Refactor | Aislar reglas puras | Crear funciones o clases puras para los cálculos de `pegadas`, `faltantes`, `repetidas` y `progreso` | Los resultados devueltos por estadísticas deben ser consistentes con la versión anterior. No se debe alterar la interfaz. | Comparar el output con el comportamiento anterior en los mismos escenarios de prueba. |
| P2 | Feature | Añadir diseño responsivo y filtros | Implementar soporte básico de móvil y activar filtros de rareza / solo faltantes en la UI | La app debe seguir funcionando en escritorio y la lógica de filtro no debe romper los cálculos del progreso. | Abrir en móvil o en vista responsive, probar filtros y verificar que el contador y el estado de los cromos siguen coherentes. |

## Descripción de cada paso

### P0 — Separar lógica de presentación
- Objetivo: que el modelo de álbum no dependa de ningún método de salida.
- Resultado esperado: la clase de datos solo registra cromos y calcula estadísticas.
- Riesgo mínimo: la interfaz debe ser la misma tras el cambio.

### P1 — Aislar reglas puras
- Objetivo: extraer funciones puras para cálculos matemáticos y de estado.
- Resultado esperado: código más fácil de testear y comprender.
- Invariante: los valores de `pegadas`, `faltantes`, `repetidas` y `progreso` no deben variar.

### P2 — Diseño responsivo y filtros
- Objetivo: mejorar la usabilidad en dispositivos móviles y agregar filtros necesarios.
- Resultado esperado: la experiencia en móviles debe ser clara, con controles de rareza y faltantes.
- Invariante: los botones y el progreso deben continuar funcionando igual que antes.
