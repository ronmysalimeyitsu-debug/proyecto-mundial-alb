# Informe de mejoras y priorización

## 1. Clasificación de problemas por severidad

### Alta
- Mezcla de responsabilidades: la lógica de colección y la presentación están acopladas en un mismo flujo.
- Uso de `print()` dentro de métodos de modelo, lo que impide reutilizar la clase en otras interfaces.
- Falta de separación entre datos, lógica y salida de usuario.

### Media
- El módulo no contiene estructuras claras para pruebas o reutilización.
- El cálculo de estadísticas depende de `len(self.coleccion)` y no es evidente si cuenta cromos distintos o copias.
- No existe una capa dedicada para validación de entrada y comunicación de errores.

### Baja
- User experience limitada: no hay diseño responsivo, no hay alertas visuales y no hay filtros interactivos.
- No hay persistencia ni manejo de estado más allá de la ejecución actual.

## 2. Quick wins (victorias rápidas y fáciles de arreglar)
- Extraer los `print()` fuera de `registrar_barajitas()` y dejar la clase libre de presentación.
- Mantener el bloque `if __name__ == "__main__"` solo como script de prueba o consola.
- Añadir documentación breve al repo para explicar el modelo de datos y los pasos de refactor.
- Crear un informe de diagnóstico y una hoja de ruta para no mezclar refactor y nuevas features.

## 3. Mejoras de producto deseables

### Must (Debe estar)
- Filtros claros por rareza y por estados (`solo faltantes`).
- Diseño móvil responsivo para que la app sea usable en pantallas pequeñas.
- Alertas de estado/error: mensajes visibles cuando un cromo no es válido o cuando se abre un pack.
- Indicador de progreso con porcentaje claro.

### Should (Debería estar)
- Contadores de sobrantes (`tengo X`) con botones `+` y `-` como elemento visual de la colección.
- Simulación de sobre/pack que entregue cromos aleatorios y los marque como conseguidos.
- Estructura modular que separe datos, lógica y vista para facilitar mantenimiento.

### Could (Podría estar)
- Guardar estado en localStorage o en un archivo para persistir la colección.
- Modo oscuro y animaciones suaves al abrir un pack.
- Búsqueda por nombre o por número de cromo.

## 4. Observaciones clave
- El mayor riesgo actual es el acoplamiento entre negocio y presentación.
- Las funcionalidades de filtro y progreso son básicas y deben ser parte del MVP.
- Las mejoras de diseño móvil y alertas pueden entregarse tras estabilizar la arquitectura.
