# Actividad 1.1: Mapa conceptual

Sitio web estático e interactivo para la actividad **"Una visión sinóptica de la pedagogía"**, del curso **TENDENCIAS Y CORRIENTES EMERGENTES**.

El proyecto presenta un mapa conceptual navegable sobre el capítulo 1, **"La pedagogía: tradición y vigencia"**, con tres ramas principales: desarrollo histórico, principios y métodos, y formación pedagógica del docente hoy. Incluye explicaciones ampliadas por nodo, relaciones transversales, preguntas reflexivas, transparencia sobre uso de IA, modo captura y exportación a PNG.

## Abrir localmente

No requiere backend ni compilación. Puede abrirse con un servidor estático simple:

```bash
python3 -m http.server 8080
```

Luego abrir `http://localhost:8080`.

## Publicar en GitHub Pages

1. Usar un repositorio publico.
2. Publicar la rama `main`.
3. Configurar GitHub Pages desde la raiz `/`.
4. No usar rutas absolutas ni variables de entorno.

## Fuente academica

Bautista Roa, Milton Adolfo. (2025). *Tendencias y corrientes pedagógicas emergentes*. Ediciones USTA Tunja. Capítulo 1, "La pedagogía: tradición y vigencia", pp. 11-30.

Los ejemplos contextualizados corresponden a aplicaciones del autor del mapa a su propia práctica docente y no son citas textuales del libro.

## Editar textos del mapa

Los conceptos, conectores, preguntas y respuestas se editan en `data.js`. La estructura visual está en `styles.css` y la lógica de interacción en `app.js`.
