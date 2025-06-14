## Aplicación Monolítica

Esta aplicación está desarrollada usando Django con todas las funcionalidades integradas en un solo proyecto.

### Desarrollo paso a paso

- Inicialización del proyecto Django y configuración base en `settings.py`.
- Creación de la app `tasks` para la gestión principal de tareas.
- Definición del modelo `Tarea` con campos básicos: título, descripción y estado de completado.
- Creación de vistas y templates para listar tareas.
- Implementación del detalle de tarea con su template asociado.
- Añadido de formularios para crear nuevas tareas.
- Habilitación para editar tareas existentes.
- Funcionalidad para eliminar tareas con confirmación.
- Creación de la app `listas` y modelo `Lista` para agrupar tareas.
- Relación entre `Tarea` y `Lista` mediante ForeignKey.
- Vista para listar tareas filtradas por lista.
- Mostrar el nombre de la lista en la vista de detalle de tarea.
- Creación de la app `comments` y modelo `Comentario` relacionado con `Tarea`.
- Implementación de formulario para agregar comentarios a las tareas.
- Mostrar los comentarios en la vista detalle de tarea.
- Funcionalidades para editar y eliminar comentarios.
- Protección de rutas con `login_required` para controlar acceso.
- Aplicación de diseño con Tailwind CSS en vistas de tareas y comentarios.
- Corrección de errores menores y ajustes en enlaces de los templates.



## Cómo ejecutar el proyecto

### Requisitos previos
- Python 3.x

### Ejecutar la aplicación monolítica

1. Clonar el repositorio
   git clone https://github.com/NachoIglesiass/Proyecto-Final---Des-Web.git
   cd Proyecto-Final---Des-Web/App\ Monolitico

2. Crear y activar un entorno virtual para el backend
En Windows:
   python -m venv .venv
   .venv\Scripts\activate

En Linux o Mac:
   python3 -m venv .venv
   source .venv/bin/activate
   
3. Instalar dependencias con `pip install -r requirements.txt`

4. Ejecutar migraciones con `python manage.py migrate`

6. Ejecutar el servidor con `python manage.py runserver`

7. Acceder a `http://localhost:8000`