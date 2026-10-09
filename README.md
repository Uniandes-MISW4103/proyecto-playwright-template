# Proyecto Base: Pruebas End to End con Playwright

[Playwright](https://playwright.dev) es un framework de pruebas E2E que automatiza Chromium,
Firefox y WebKit con una sola API. Incluye espera automática de elementos, aserciones que se
reintentan, un modo UI interactivo y un visor de trazas para depurar fallos.

Este módulo contiene la configuración base de Playwright Test y un ejemplo que pueden usar como
punto de partida para las pruebas E2E del proyecto.

## Requisitos

- Node.js 24 (`lts/krypton`). El módulo incluye un `.nvmrc`, por lo que pueden usar `nvm use`.
- npm (incluido con Node.js).
- Navegador: `prepare` descarga Chromium para Playwright. En Linux (por ejemplo, en un servidor de
  CI) también se necesitan librerías del sistema: `npx playwright install --with-deps chromium`.

## Instalación

Desde la **raíz del repositorio** del proyecto:

```bash
npm run playwright:install
npm run playwright:prepare
```

> [!IMPORTANT]
> Instalen siempre desde la raíz. `playwright:install` deja las dependencias del módulo en su propia
> carpeta `node_modules`, aisladas de los demás módulos. Un `npm install` dentro de la carpeta del
> módulo instala en la raíz del repositorio y modifica el `package-lock.json` raíz sin ese aislamiento.

## Ejecución

| Acción | Desde la raíz | Desde `e2e/misw-4103-playwright` |
|---|---|---|
| Ejecutar las pruebas (headless) | `npm run playwright:test` | `npm test` |
| Abrir el modo UI | `npm run playwright:ui` | `npm run test:ui` |
| Ver el último reporte HTML | — | `npx playwright show-report` |

Para pasar opciones a Playwright ejecuten desde la carpeta del módulo, por ejemplo
`npx playwright test --headed` o `npx playwright test tests/tutorial.spec.js`.

## Estructura

```plaintext
misw-4103-playwright/
├── .nvmrc
├── package.json
├── abp.cjs                # lee la configuración de la aplicación bajo pruebas (.env)
├── playwright.config.js   # configuración de Playwright Test
└── tests/
    └── tutorial.spec.js   # ejemplo incluido
```

Al ejecutar se generan `test-results/` (capturas, trazas) y `playwright-report/` (reporte HTML);
ambas carpetas están en el `.gitignore`.

## Configuración

La URL y el administrador de la aplicación bajo pruebas (ABP) están en el archivo `.env` de la raíz
del repositorio, el mismo que usa `npm run abp:up` para desplegar Ghost. No los copien en el módulo:
`abp.cjs` lee ese archivo. `use.baseURL` es `ABP_URL`, y las pruebas importan las demás variables:

```javascript
import abp from "../abp.cjs";

await page.goto("/ghost/");
await page.locator("#identification").fill(abp.ABP_ADMIN_EMAIL);
await page.locator("#password").fill(abp.ABP_ADMIN_PASSWORD);
```

Las variables disponibles son `ABP_URL`, `ABP_RC_URL` (la versión de Ghost para regresión visual),
`ABP_ADMIN_NAME`, `ABP_ADMIN_EMAIL` y `ABP_ADMIN_PASSWORD`. Una variable de entorno con el mismo
nombre tiene prioridad sobre el `.env`. Fuera de un repositorio del proyecto (sin `.env`) se usan los
valores por defecto de `abp.cjs`.

`playwright.config.js` define además:

- **`testDir`**: las pruebas están en `./tests`.
- **`projects`**: solo Chromium (perfil "Desktop Chrome"). Si agregan Firefox o WebKit, instalen
  también esos navegadores: `npx playwright install firefox webkit`.
- **Paralelismo y CI**: las pruebas corren en paralelo. Si la variable `CI` está definida, se
  reintentan hasta 2 veces, se usa un solo _worker_ y `test.only` hace fallar la ejecución.
- **Reporte y trazas**: reporte HTML en `playwright-report/`; traza en el primer reintento.

El módulo usa ES Modules (`"type": "module"`), por eso la configuración y las pruebas usan
`import`/`export`.

## Ejemplo incluido

`tests/tutorial.spec.js` prueba el demo
[angular-6-registration-login-example](https://angular-6-registration-login-example.stackblitz.io)
alojado en StackBlitz, no la ABP: muestra cómo usar las credenciales del `.env` sin resolver las
pruebas del proyecto. Antes de cada prueba abre la página de registro del demo (con su URL completa)
y hace clic en el botón con el que StackBlitz inicia el proyecto. Las pruebas verifican:

1. La navegación entre registro e inicio de sesión (`/login` ↔ `/register`).
2. Que enviar el formulario vacío muestra los 4 mensajes de validación.
3. El registro de un usuario con el nombre, el correo (como usuario) y la contraseña de
   `ABP_ADMIN_*`, y el inicio de sesión con él ("Hi Monitor!").

Las capturas quedan en `test-results/screenshots/` (Playwright limpia `test-results/` al inicio de
cada ejecución).

## Solución de problemas

- **`Executable doesn't exist at …`**: falta el navegador; ejecuten `npm run playwright:prepare`.
- **En Linux faltan librerías del sistema**: `npx playwright install --with-deps chromium`.
- **Al fallar una prueba la terminal se queda esperando**: Playwright abrió el reporte HTML; usen
  `Ctrl+C`. Para evitarlo, definan `PW_TEST_HTML_REPORT_OPEN=never`.
- **Falla el `beforeEach`**: el demo es un sitio externo; verifiquen que carga en el navegador.
- **Advertencia `EBADENGINE`**: están usando una versión de Node.js anterior a la 24.

## Referencias

- [Documentación de Playwright](https://playwright.dev/docs/intro)
- [Localizadores](https://playwright.dev/docs/locators) y
  [aserciones](https://playwright.dev/docs/test-assertions)
- [Configuración](https://playwright.dev/docs/test-configuration)
