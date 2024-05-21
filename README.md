# api_restful_libreria

## Descripción

Este proyecto constituye el backend de una aplicación destinada a la gestión de información de libros para la librería Apilados. Está desarrollado con Node.js, MongoDB, y Express.js, utilizando Mongoose para la conexión con la base de datos y Validator para la validación de datos.

## Características

- **Conexión con MongoDB:** Utiliza `mongoose` para conectar Node.js con la base de datos MongoDB.
- **Servidor HTTP:** Construido con `express.js`.
- **Modelos, Controladores y Rutas:** Estructurado según las mejores prácticas de la industria.
- **Métodos de Administración:** Incluye métodos para agregar, modificar, eliminar, listar y búsqueda personalizada.
- **Validación de Datos:** Implementa middleware de validación utilizando `validator`.
- **Configuración de CORS:** Permite peticiones desde el frontend.

## Estructura del Proyecto

```plaintext
/backend
├── controllers
│   └── LibroController.js
├── models
│   └── Schema.js
├── routes
│   └── Routes.js
├── config
│   └── Multer.js
|── uploads
|   
└── index.js
```

## Instrucciones de Instalación

1. Clona el repositorio.
2. Navega a la carpeta `backend`.
3. Instala las dependencias: `npm install`.
4. Configura las variables de entorno para la conexión a MongoDB.
5. Inicia el servidor: `npm start`.

## API Endpoints

### Libro

- **Agregar Libro**
  - **URL:** `/libreria/libro`
  - **Método:** POST
  - **Descripción:** Agrega un nuevo libro a la base de datos.
  - **Body:** `{ ISBN, nombreLibro, autor, editorial, portada, paginas }`

- **Modificar Libro**
  - **URL:** `/libreria/libro/:id`
  - **Método:** PUT
  - **Descripción:** Modifica un libro existente en la base de datos.
  - **Body:** `{ ISBN, nombreLibro, autor, editorial, portada, paginas }`

- **Eliminar Libro**
  - **URL:** `/libreria/libro/:id`
  - **Método:** DELETE
  - **Descripción:** Elimina un libro de la base de datos.

- **Listar Todos los Libros**
  - **URL:** `/libreria/libros`
  - **Método:** GET
  - **Descripción:** Lista todos los libros en la base de datos.

- **Buscar Libros**
  - **URL:** `/libreria/libros/search`
  - **Método:** GET
  - **Descripción:** Busca libros por nombre, autor o editorial.

- **Busqueda Personalizada**
  - **URL:** `/libreria/libros/search/:filter`
  - **Método:** GET
  - **Descripción:** Busca libros por nombre, autor o editorial.

- **Subir Imagen**
  - **URL:** `/libreria/imagen/upload/:id`
  - **Método:** POST
  - **Descripción:** Sube imagen de portada a la base de datos.

- **Leer Imagen**
  - **URL:** `/libreria/imagen/:portada`
  - **Método:** GET
  - **Descripción:** Lee imagen de portada desde la base de datos.

## Capturas de Pantalla

La carpeta `screenshots` en la raíz del proyecto contiene imágenes del testeo de la API en Postman y pantallazos de MongoDB.

## Autor

Jose Contreras Stoltze
