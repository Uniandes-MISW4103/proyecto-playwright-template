# Proyecto Base: Pruebas End to End con Playwright

Playwright es un framework moderno y fácil de usar para realizar pruebas E2E. Ofrece una interfaz intuitiva y herramientas integradas para depuración. Es ideal para pruebas en aplicaciones web modernas.

Este repositorio cuenta con la configuración base de Playwright para la automatización de pruebas E2E.

## Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- npm o yarn para la gestión de dependencias.

## Instalación

Instala las dependencias necesarias utilizando npm:

```bash
npm install
npm run prepare # Instala las demás dependencias de Playwright automáticamente.
```

## Ejecución de Pruebas

Puedes ejecutar las pruebas en modo headless o con interfaz gráfica del navegador:

- Para ejecutar las pruebas en modo headless:

    ```bash
    npm test
    ```

- Para ejecutar las pruebas con interfaz gráfica:

    ```bash
    npm run test:ui
    ```

## Configuración

El archivo de configuración principal de Playwright se encuentra en `playwright.config.js`. Este archivo define las opciones globales para las pruebas, como el directorio de pruebas, los navegadores soportados y las configuraciones específicas para cada proyecto.

Algunos puntos clave de la configuración:

- **Directorio de pruebas**: Las pruebas se encuentran en el directorio `./tests`.
- **Ejecución en paralelo**: Las pruebas se ejecutan en paralelo para optimizar el tiempo de ejecución.
- **Base URL**: La URL base configurada es `https://angular-6-registration-login-example.stackblitz.io`. Esto permite usar rutas relativas en las pruebas.
- **Reintentos**: En entornos CI, las pruebas fallidas se reintentan automáticamente hasta 2 veces.
- **Reportes**: Se genera un reporte en formato HTML tras la ejecución de las pruebas.
- **Navegadores soportados**: Actualmente, el proyecto está configurado para ejecutarse en Chromium con el perfil de "Desktop Chrome".

Si necesitas modificar la configuración, puedes editar el archivo `playwright.config.js` según tus necesidades. Por ejemplo, puedes agregar más navegadores o cambiar la URL base.
