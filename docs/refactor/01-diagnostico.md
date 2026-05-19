# Diagnóstico de mezcla de responsabilidades

## 1. Lógica de datos

- `self.total_barajitas`: define el tamaño total del álbum.
- `self.coleccion`: almacena el estado actual de la colección como un diccionario `{numero: cantidad}`.
- `registrar_barajitas()`: agrega nuevas barajitas, valida el rango y actualiza el diccionario.
- `obtener_estadisticas()`: calcula progreso, faltantes y repetidas a partir de los datos de `self.coleccion`.
- `listar_repetidas()`: selecciona los números con más de una copia.

## 2. Interfaz / DOM mezclado con la lógica

- En el fragmento actual no hay código HTML/DOM porque es un módulo de consola, pero sí hay una mezcla de:
  - `print(...)` dentro de `registrar_barajitas()` para notificar errores.
  - `print(...)` en la zona de prueba para mostrar estadísticas.

Esto es una mezcla de:
- lógica de negocio (validar números y registrar la colección),
- salida/ presentación (mostrar mensajes al usuario en consola).

## 3. Datos mezclados con lógica

- El diccionario `self.coleccion` combina dos conceptos:
  - presencia o ausencia del cromo
  - número de copias repetidas

Esto no es necesariamente malo, pero hay que tener claro que:
- `len(self.coleccion)` cuenta cromos distintos pegados, no el total de copias físicas.
- `repetidas` se calcula como `cantidad - 1`, lo que mezcla el estado de colección con el conteo de sobrantes.

## 4. Puntos clave a separar

- Separar la validación y el registro de datos de cualquier impresión en pantalla.
- Mantener la clase como un modelo de datos puros y mover la presentación a otra capa.
- Si se trabaja con una interfaz gráfica o web, los `print()` deberían reemplazarse por mensajes de la vista.

## 5. Recomendación breve

- La clase debe ser solo lógica del álbum y datos.
- La interacción con el usuario (mensajes, consola, DOM) debe vivir fuera de la clase.
- En un refactor futuro, extraer los `print()` y la zona de prueba a un módulo de presentación o script independiente.
