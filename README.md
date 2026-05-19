# Álbum de figuritas del Mundial

Esta es una aplicación mock de un álbum de figuritas del Mundial con una colección de cromos editables en JavaScript.

## Funcionalidades implementadas

- Grid de cromos con al menos 12 ítems.
- Cada cromo muestra: nombre mock, rareza, estado de colección y placeholder.
- Botón `Tengo` / `Me falta` que alterna el estado y actualiza el estilo.
- Contador de `X de Y coleccionados`.
- Filtro por rareza y opción `Solo faltantes`.
- Barra de progreso global con porcentaje.
- Modo sobrantes visual: cada cromo tiene un contador `Tengo X` con botones `+` y `-`.
- Pack simulado: `Abrir pack` abre 3 ítems aleatorios y los marca como conseguidos.
- Reiniciar colección para volver a comenzar.

## Estructura de archivos

- `index.html` - interfaz principal.
- `styles.css` - estilos de la aplicación.
- `app.js` - lógica del álbum, filtros y pack simulado.

## Cómo añadir más cromos

Abre el archivo `app.js` y edita el arreglo `data` al inicio del archivo. Cada cromo debe tener esta estructura:

```js
{ id: 17, name: 'Nuevo Cromito', rarity: 'comun', collected: false, count: 0 }
```

- `id`: número único para el cromo.
- `name`: nombre del jugador, escudo o personaje inventado.
- `rarity`: `comun`, `rara` o `epica`.
- `collected`: booleano para indicar si ya lo tienes.
- `count`: número de sobrantes visuales.

Guarda el archivo y vuelve a cargar `index.html` en el navegador.

## Uso

1. Abre `index.html` en el navegador.
2. Usa el filtro por rareza para ver cromos específicos.
3. Marca cromos como `Tengo` o `Me falta`.
4. Usa `Abrir pack` para conseguir 3 cromos nuevos.
5. Consulta el progreso y los contadores visuales.
