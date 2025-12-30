# Boilerplate Express React Router

This project is a full-stack boilerplate using Express.js for the backend and React (with React Router) for the frontend. It is designed to help you quickly start building scalable web applications with modern tooling.

## Features

- **Express.js** backend with TypeScript
- **React** frontend with TypeScript
- **React Router** for client-side routing
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Plop.js** for code generation
- **Vite** for fast frontend development
- **PNPM** for package management
- **Shared types and constants** between client and server

## Folder Structure

```
boilerplate-express-react-router/
├── client/         # React frontend
├── server/         # Express backend
├── shared/         # Shared code (types, constants)
├── plop/           # Plop generators and templates
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PNPM (recommended)

### Install Dependencies

```sh
pnpm install
```

### Environment Variables
- Copy `template.env` to `.env` in both `client/` and `server/` folders and fill in the required values.

### Start Development Servers

#### Client (React)
```sh
cd client
pnpm dev
```

#### Server (Express)
```sh
cd server
pnpm dev
```

### Code Generation
Use Plop to generate components, pages, contexts, etc.
```sh
pnpm plop
```

## Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run linter
- `pnpm test` - Run tests

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Author
[Julien Sebag](https://julien-sebag.com)