# Monorepo de Proyecto para aplicación web para gestionar tareas (to-do list)

Este repositorio contiene un monorepo que incluye un backend en NestJS y un frontend en Next.js. A continuación se presentan las instrucciones para ejecutar y contribuir al proyecto.

## Estructura del Proyecto

```
my-monorepo/
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
│   ├── frontend/
│   │   ├── src/
│   │   ├── package.json
│   │   └── ...
├── lerna.json
├── package.json
└── README.md
```

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu máquina:

- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (v6 o superior)
- [Lerna](https://lerna.js.org/) (instalado globalmente)

Se puede instalar Lerna globalmente ejecutando:

```npm install -g lerna```

## Instalación
Clonar el repositorio:

```
git clone https://github.com/alejogranada/monorepo_ttt
cd my-monorepo
```

Instalar las dependencias:

```npm install```

Ejecución

Ejecutar el Backend

Navegar a la carpeta del backend:

```cd packages/backend```

Iniciar el servidor:

```npm run start```

El backend estará disponible en http://localhost:3000.

Ejecutar el Frontend

Abrir otra terminal y navega a la carpeta del frontend:

```cd packages/frontend```

Iniciar el servidor:

```npm run start```

El frontend estará disponible en http://localhost:3001.

Scripts Adicionales
Se puede usar Lerna para ejecutar scripts en paralelo para ambos paquetes:

```npm run start:all```

Esto ejecutará los comandos start de ambos, el backend y el frontend, al mismo tiempo.
