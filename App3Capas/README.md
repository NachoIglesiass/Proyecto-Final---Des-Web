## Aplicación 3 Capas

Esta aplicación está organizada bajo una arquitectura desacoplada en 3 capas para mejorar escalabilidad y mantenibilidad.

### Desarrollo paso a paso:

- Definición de modelos `Lista`, `Tarea`, `Comentario` y `Etiqueta` en la capa de datos (modelo).
- Creación de serializers con Django REST Framework para cada modelo.
- Implementación de vistas basadas en viewsets para la API REST, con permisos para usuarios autenticados.
- Configuración de rutas con routers para exponer la API.
- Inclusión de autenticación por token para gestionar usuarios y sesiones.
- Desarrollo de un frontend en Next.js que consume la API de manera completa.
- Consumo y gestión de datos (listas, tareas, comentarios, etiquetas) a través del frontend.
- Implementación progresiva del diseño con Tailwind siguiendo un patrón coherente y estético.
- Refactorización y mejora continua del frontend basándose en un diseño inicial proporcionado.
- Manejo de estados y eventos en la interfaz para crear, editar, eliminar y mostrar recursos.

## Cómo ejecutar el proyecto

### Requisitos previos

- Python 3.x
- Node.js y npm (para el frontend Next.js)
- Base de datos (SQLite por defecto, o configurada)

### Ejecutar la aplicación 3 capas

1. Clonar el repositorio
   git clone https://github.com/NachoIglesiass/Proyecto-Final---Des-Web.git
   cd Proyecto-Final---Des-Web/App\ 3\ Capas

2. Crear y activar un entorno virtual para el backend
En Windows:
   - python -m venv .venv
   - .venv\Scripts\activate

En Linux o Mac:
   - python3 -m venv .venv
   - source .venv/bin/activate

3. Instalar las dependencias de Python:
   - pip install -r requirements.txt

4. Ejecutar migraciones y levantar el servidor Django REST Framework
   - python manage.py migrate
   - python manage.py runserver

   -El backend quedará corriendo por defecto en http://127.0.0.1:8000

5. Abrir otra terminal y posicionarse en la carpeta del frontend 
   - cd frontend

6. Instalar dependencias del frontend:
   - npm install

7. Ejecutar el frontend:
   - npm run dev

El frontend quedará disponible en http://localhost:3000 
