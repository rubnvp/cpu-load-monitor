# CPU Load Monitor
Welcome to the CPU Load Monitor project! This project is a simple web application that monitors the CPU load of a server. This application is built with:
- [Vue 3](https://vuejs.org/) with [Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/) and [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vitejs.dev/) for the build and development tool.
- [Chart.js](https://vue-chartjs.org/) for the data visualization.
- [Vitest](https://vitest.dev/) for unit testing.
- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting and formatting.

## Project Setup
Make sure you have a stable node version (currently 22.5)
```sh
npm install
```

## Development

### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [Prettier](https://prettier.io/)

```sh
npm run format
```

## Production

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Serve the Production Build

```sh
npm run serve
```