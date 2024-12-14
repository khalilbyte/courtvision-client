# CourtVision
The NBA regular season is spans across 7 months and over 1200 games. For NBA Fantasy team owners, this means staying on top of your game day-in and day-out. CourtVision gives you an all-in-one place to keep up-to-date with players on your teams. 

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)

## Features 
- See all players available in NBA Fantasy
- Search for specific players
- Add players to your watchlist
- Create and manage custom fantasy teams

## Installation
To setup the client, we need to create a new Vite project (ensure you have Node.js installed):
```
# npm 7+, extra double-dash is needed:
$ npm create vite@latest client -- --template react
$ npm install
$ npm run dev
```

Head to the `vite.config.js` file and manually set port to 3000:
```
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
```

## Dependencies 
This project relies on several key packages:

### Core Dependencies
- **React (v18.3.1)**: Frontend UI library for building user interfaces
- **React DOM (v18.3.1)**: React's DOM rendering capabilities
- **React Router (v7.0.1)**: Handles navigation and routing in the application
- **Axios (v1.7.8)**: HTTP client for making API requests

### Development Dependencies
- **Vite (v5.4.10)**: Build tool and development server
- **TailwindCSS (v3.4.15)**: Utility-first CSS framework for styling
- **ESLint (v9.13.0)**: Code linting and style enforcement

To install all dependencies, simply run:
```
$ npm install
```
