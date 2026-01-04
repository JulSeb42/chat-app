# Chat App

A full-stack real-time chat application with user authentication, encrypted messages, and modern UI.

## Features

- Real-time messaging with [Socket.io](https://socket.io/)
- Encrypted messages stored in MongoDB
- User authentication (signup, login, JWT)
- User avatars and profile management
- Chat creation (1:1 and group)
- Responsive, modern UI (React + Tailwind CSS)
- RESTful API (Express.js)
- File/image uploads (Cloudinary)
- Error handling and notifications

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, TanStack Router, Axios, Socket.io-client
- **Backend:** Express.js, TypeScript, Mongoose, MongoDB, Socket.io, JWT, Cloudinary
- **Dev Tools:** pnpm, Plop, ESLint, Prettier, concurrently

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:
	```sh
	git clone https://github.com/JulSeb42/chat-app.git
	cd chat-app
	```
2. Install dependencies for both client and server:
	```sh
	pnpm install
	```
3. Set up environment variables:
	- Copy `client/template.env` to `client/.env` and fill in values.
	- Copy `server/template.env` to `server/.env` and fill in values.
4. (Optional) Seed the database with test users:
	```sh
	pnpm seed-users
	```

### Running the App

To start both the client and server in development mode:

```sh
pnpm dev
```

- Client: http://localhost:3000
- Server: http://localhost:5000 (default)

## Project Structure

- `client/` – React frontend
- `server/` – Express backend
- `plop/` – Code generators

## Scripts

- `pnpm dev` – Start client and server concurrently
- `pnpm client` – Start client only
- `pnpm serve` – Start server only
- `pnpm seed-users` – Seed database with test users

## License

MIT