
# Proyecto Sena

¡Bienvenido al Proyecto Sena! Este es un sistema ERP basado en la web, diseñado para optimizar la gestión de la producción y el control de inventarios. Actualmente, el proyecto está enfocado en el módulo de producción y se encuentra en una versión preliminar (MVP). Incluye gestión de usuarios, roles, inventarios y seguimiento de producción.

## Tecnologías Utilizadas

- **Next.js**: Un framework de React para renderizado del lado del servidor y generación de sitios web estáticos.
- **NextAuth.js**: Autenticación para aplicaciones Next.js.
- **Tailwind CSS**: Un framework CSS de utilidades primero para desarrollo rápido de interfaces.
- **NextUI**: Una biblioteca de componentes UI para construir aplicaciones web modernas.
- **TanStack Query**: Herramienta potente de obtención de datos y gestión de estado para React.
- **Bun**: Un entorno de ejecución JavaScript todo en uno y rápido.

## Comenzando

Para ejecutar este proyecto, necesitas tener Bun instalado. Sigue los pasos a continuación para comenzar:

### Prerrequisitos

- **Node.js**: Asegúrate de tener Node.js instalado.
- **Bun**: Para instalar Bun en tu sistema, sigue las instrucciones a continuación según tu sistema operativo:

#### Instalando Bun en Linux/macOS:

```sh
curl -fsSL https://bun.sh/install | bash
```

#### Instalando Bun en Windows:

Para Windows, puedes instalar Bun a través de WSL (Subsistema de Windows para Linux) o usar el paquete `.zip`. Visita la [página oficial de instalación de Bun](https://bun.sh/docs/install) para obtener instrucciones detalladas.

### Instalación

1. **Clona el repositorio**:
   ```sh
   git clone https://github.com/yourusername/sena_project.git
   cd sena_project
   ```

2. **Instala las dependencias**:
   ```sh
   bun install
   ```

3. **Configura las variables de entorno**:
   Copia el archivo `.env.example` a `.env` y configura las variables necesarias:
   ```sh
   cp .env.example .env
   ```

4. **Ejecuta el Proyecto**:
   Para iniciar el servidor de desarrollo, ejecuta:
   ```sh
   bun dev
   ```

   Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en acción.

## Estructura del Proyecto

- **/actions**: Lógica de interacción con la API (obtención y modificación de datos).
- **/app**: Contiene todas las rutas de las páginas de Next.js.
- **/components**: Componentes reutilizables de la interfaz de usuario.
- **/hooks**: Hooks personalizados de React utilizados en todo el proyecto.
- **/interfaces**: Interfaces de TypeScript para la tipificación de los modelos de datos.
- **/lib**: Funciones de ayuda e integraciones con terceros.
- **/prisma**: Configuración del ORM Prisma y el esquema de la base de datos.
- **/public**: Activos estáticos como imágenes y fuentes.
- **/utils**: Funciones utilitarias para el manejo de transformaciones de datos, formato, etc.
- **/validations**: Funciones y esquemas utilizados para la validación de datos y formularios.

## Autenticación

Este proyecto utiliza **NextAuth.js** para la autenticación. La configuración se encuentra en `/pages/api/auth/[...nextauth].js`. Asegúrate de que las variables de entorno relacionadas con la autenticación (como `NEXTAUTH_URL`, `SECRET`, etc.) estén configuradas correctamente.

## Estilos

Usamos **Tailwind CSS** para el diseño de la aplicación. Los estilos globales están definidos en el archivo `global.css`, ubicado en la carpeta `/app`. Puedes personalizar tu diseño modificando o agregando nuevas clases de Tailwind CSS.

Para más información, consulta la [documentación de Tailwind CSS](https://tailwindcss.com/docs).

## Componentes UI

Se utiliza **NextUI** como biblioteca de componentes UI. Consulta la [documentación de NextUI](https://nextui.org/docs) para obtener más detalles sobre personalización y uso.

## Obtención de Datos

Utilizamos **TanStack Query** para manejar toda la lógica de obtención de datos y sincronización. Las funciones de interacción con la API están ubicadas en la carpeta `/actions`, donde cada función maneja llamadas a la API específicas y administra sus respectivos estados.

Para un uso más avanzado, visita la [documentación de TanStack Query](https://tanstack.com/query/latest).

## Licencia

Este proyecto es propiedad privada del **Centro de Automatización Industrial SENNOVA - Regional Caldas** en Colombia y no está abierto a contribuciones externas. Está destinado únicamente para uso privado en entornos autorizados.
