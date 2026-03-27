# Proyecto Base: Pruebas End to End con Playwright

Playwright es un framework moderno y fácil de usar para realizar pruebas E2E. Ofrece una interfaz intuitiva y herramientas integradas para depuración. Es ideal para pruebas en aplicaciones web modernas.

Este repositorio cuenta con la configuración base de Playwright para la automatización de pruebas E2E.

## Requisitos Básicos

- Node.js (versión 22 o superior). Recomendamos utilizar la versión `lts/jod`.
- npm para la gestión de dependencias.

## Instalación

Desde la **raíz del repositorio**:

```bash
npm run playwright:install
npm run playwright:prepare
```

O bien, desde el directorio del módulo:

```bash
npm install
npm run prepare
```

## Ejecución de Pruebas

Desde la **raíz del repositorio**:

- Para ejecutar las pruebas en modo headless:

  ```bash
  npm run playwright:test
  ```

- Para ejecutar las pruebas con interfaz gráfica:

  ```bash
  npm run playwright:ui
  ```

O bien, desde el directorio del módulo:

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
- **Base URL**: La URL base configurada es `https://angular-6-registration-login-example.stackblitz.io`. Actualiza este valor en `playwright.config.js` para apuntar a tu entorno.
- **Reintentos**: En entornos CI, las pruebas fallidas se reintentan automáticamente hasta 2 veces.
- **Reportes**: Se genera un reporte en formato HTML tras la ejecución de las pruebas.
- **Navegadores soportados**: Actualmente, el proyecto está configurado para ejecutarse en Chromium con el perfil de "Desktop Chrome".
- **Formato de módulos**: El proyecto utiliza ES Modules (`"type": "module"`) ya que `playwright.config.js` emplea la sintaxis `export default`.

Si necesitas modificar la configuración, puedes editar el archivo `playwright.config.js` según tus necesidades. Por ejemplo, puedes agregar más navegadores o cambiar la URL base.
