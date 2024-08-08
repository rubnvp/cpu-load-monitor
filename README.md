# CPU Load Monitor
Welcome to the CPU Load Monitor project! 🤗. This project is a simple web application that monitors the CPU load of a server (or your own laptop). This application is built with:
- [Vue 3](https://vuejs.org/) with [Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/) and [TypeScript](https://www.typescriptlang.org/).
- [Vite](https://vitejs.dev/) for the build and development tool.
- [Chart.js](https://vue-chartjs.org/) for the data visualization.
- [Anime.js](https://animejs.com/) for the current CPU change animation.
- [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) natively supported for a simple dark/light mode.
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

### Increase your CPU load with [Stress](https://github.com/resurrecting-open-source-projects/stress)
```sh
brew install stress
stress --cpu 16
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

## Development Considerations
I chose Vue 3 with the official development setup (Router, Pinia, Vite...) because is the stack that currently I am most comfortable with but it could have be done in React with an additional learning time 🤓.

If it's your first time with Vue an easy way to understand what is going on is going through 👇:
- 🏗️ [main.ts](./src/main.ts) here you can check the initial setup of the Vue app including the [CPU collector](./src/boot/cpuCollector.ts) that runs independently from the Vue app saving the data in a [store](./src/stores/cpuLoadsStore.ts).
- 🛤️ [router](./src/router/index.ts) here you can check the routes of the app. It currently have only one page but it's ready to add more pages and load them dynamically, the views are loaded inside the layout of [App.vue](./src/App.vue).
- 📚 [views](./src/views/) the Vue components here are responsible to collect and distribute the data between resusable components located in [components](./src/components/) that are intended to be more dumb and rely on more general props.
