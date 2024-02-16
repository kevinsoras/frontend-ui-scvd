# Sistema de Carga y Validación de Datos (SCVD)

Este proyecto presenta una interfaz de usuario para interactuar con la API RESTful del SCVD, permitiendo a los usuarios con el rol de admin iniciar sesión y subir archivos CSV para importar masivamente usuarios.


## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Paginas](#paginas)
5. [Ejemplos de Uso](#ejemplos-de-uso)
6. [Contribuciones](#contribuciones)
7. [Licencia](#licencia)
7. [Demo](#demo)
## Requisitos

Asegúrate de tener Node.js y npm instalados en tu entorno de desarrollo.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/kevinsoras/frontend-ui-scvd
cd frontend-ui-scvd
```

2. Instala las dependencias:

```bash
npm install
```
## Uso

Una vez que hayas instalado las dependencias, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo.
Lo abrirá en un puerto libre ,verifica tu consola para saber en que puerto se expuso.

## Paginas

La aplicación frontend contiene estas rutas de paginas:

### `/Login`: 
Pagina para iniciar sesión.
### `/`:
Pagina para subir archivos CSV y gestionar la importación masiva de usuarios.

## Ejemplos de Uso

### Login

El componente Login permite a los usuarios iniciar sesión en la aplicación. Los usuarios deben proporcionar su correo electrónico y contraseña.

### UploadArchive
El componente UploadArchive permite a los usuarios con rol de admin subir archivos CSV para importar masivamente usuarios en el sistema.
En la base del proyecto encontraras un ejemplo de .csv llamado `Sistema de Carga y Validación de Datos` usalo como guia para importar los datos de los usuarios.

## Contribuciones

Si deseas contribuir al desarrollo de esta API, simplemente realiza un Pull Request con tus cambios y para que sean revisados.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.

## Demo

Esta es una pagina de demo : https://frontendscvd-static.onrender.com.