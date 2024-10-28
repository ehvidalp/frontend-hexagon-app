# Hexagon Frontend

Frontend layout of the Hexagon application.

## Tech Stack

- Vite

- Vue 3

- TypeScript

- Tailwind CSS

- Pinia

- Axios

## Build and Run with Docker

1. Build the Docker Image
   ```sh
   docker build -t frontend-hexagon-app .
   ```
2. Run the Docker Container
   ```sh
   docker run -it -p 8080:80 frontend-hexagon-app
   ```

## Project Setup Local

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Project Structure

```sh
├── public/                 # Static assets
├── src/                    # Source files
│   ├── assets/             # Assets like images, styles, etc.
│   ├── components/         # Vue components
│   ├── layouts/            # Vue layouts
│   ├── mocks/              # Mock data for testing
│   ├── plugins/            # Vue plugins
│   ├── router/             # Vue Router setup
│   ├── schemas/            # Validation schemas
│   ├── services/           # Services for API calls, etc.
│   ├── store/              # Vuex store setup
│   ├── types/              # TypeScript types
│   ├── utils/              # Utility functions
│   ├── views/              # Vue views
│   ├── App.vue             # Main App component
│   ├── main.ts             # Entry point for the application
├── tests/                  # Unit tests
├── .dockerignore           # Docker ignore file
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore file
├── Dockerfile              # Docker configuration
├── index.html              # Main HTML file
├── nginx.conf              # Nginx configuration
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript configuration for the app
├── tsconfig.json           # TypeScript base configuration
├── tsconfig.node.json      # TypeScript configuration for Node.js
├── tsconfig.vitest.json    # TypeScript configuration for Vitest
├── vite.config.ts          # Vite configuration
```
