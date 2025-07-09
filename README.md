# Reto **Rest Countries**  
Integración Next.js + REST Countries API

## Índice
1. [Descripción general](#descripción-general)  
2. [Stack y dependencias](#stack-y-dependencias)  
3. [Estructura de carpetas](#estructura-de-carpetas)  
4. [Puesta en marcha](#puesta-en-marcha)  
5. [Scripts npm](#scripts-npm)  
6. [Variables de entorno](#variables-de-entorno)  
7. [Convenciones de código](#convenciones-de-código)  
8. [Pruebas unitarias](#pruebas-unitarias)  
9. [Pendientes / mejoras futuras](#pendientes--mejoras-futuras)

---

## Descripción general
Este proyecto resuelve el desafío de integración con la **REST Countries API** (`https://restcountries.com/`) para mostrar información de todos los países siguiendo los diseños suministrados.

### Funcionalidades clave
| Requisito | Implementación |
|-----------|----------------|
| **Next.js** como framework base | App Router (`app/`) y TypeScript |
| **Consumo HTTP** | Axios (puede sustituirse fácilmente) |
| **Buscador** | Filtro en tiempo real por nombre |
| **Filtro por región** | Desplegable con todas las regiones únicas |
| **Vista detalle** | Ruta dinámica `/country/[slug]` con datos ampliados |
| **Responsive design** | Tailwind CSS + Mobile-First |
| **Dark Mode** | Conmutador _light / dark_ persistente (`localStorage`) |
| **Pruebas unitarias** | Jest + ts-jest (lógica de API, filtros y paginación) |

---

## Stack y dependencias
| Categoría | Paquete | Uso |
|-----------|---------|-----|
| **Framework** | `next` ^14 | SSR/SSG & Router |
| **Lenguaje** | `typescript` ^5 | Tipado estricto |
| **Estilos** | `tailwindcss` ^3 | Utilidades + theming |
| **HTTP** | `axios` ^1 | Peticiones a REST Countries |
| **Iconos** | `react-icons` ^5 (io5) | UI consistente |
| **Tests** | `jest`, `ts-jest`, `@types/jest` | Unit tests |


---

## Estructura de carpetas
```
├─ .next/                         # directorio generado por Next (build)
├─ app/
│  ├─ (pages)/
│  │  ├─ (home)/
│  │  │  └─ page.tsx             # página principal con listado de países
│  │  ├─ api/
│  │  │  └─ country/
│  │  │     └─ route.ts          # handler (GET) que proxea la API REST Countries
│  │  └─ country/
│  │     └─ [slug]/
│  │        └─ page.tsx          # vista detalle por país
│  ├─ components/
│  │  ├─ CountriesList.tsx       # grid + búsqueda + filtros
│  │  └─ Header.tsx              # header con toggle dark / light
│  ├─ test/
│  │  └─ countries.test.ts       # pruebas unitarias de route.ts
│  └─ layout.tsx                 # layout raíz (incluye dark-mode toggle)
├─ types/
│  └─ country.ts                 # tipado de Country (API v3)

├─ node_modules/
├─ package.json
├─ tsconfig.json
└─ README.md


---

## Puesta en marcha
yarn install        # o npm install
```

### Desarrollo
```bash
yarn dev            # levanta http://localhost:3000
```

### Build producción
```bash
yarn build
yarn start          # serve en modo producción
```

---

## Scripts npm
| Script | Acción |
|--------|--------|
| `dev` | Inicia servidor Next.js en modo desarrollo |
| `build` | Compila para producción |
| `start` | Sirve la carpeta `.next/` generada |
| `lint` | Ejecuta ESLint + Prettier |
| `test` | Ejecuta Jest con cobertura |

---

## Variables de entorno
Crear `.env.local`:

```env
RESTCOUNTRIES_BASE_URL=https://restcountries.com/v3.1
```

---



## Pruebas unitarias
```bash
yarn test         

```


---

### Autor
**Carlos Guerra** – *Fullstack Developer*  
📧 <guerracarlosandres11@gmail.com> • 🔗 Despligue https://prueba-tecnica-bia.vercel.app/

