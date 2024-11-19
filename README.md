# TSFW (Another TypeScript Framework)

```bash
npx @cotter45/tsfw@latest
```

“A minimalist TypeScript framework for those tired of the constantly shifting JS/TS ecosystem.”

TSFW is a personal experiment turned lightweight, flexible framework that lets you leverage JSX without React, handle routing and state management with ease, and build rich, single-page applications – minus the complexity and bulk of traditional frameworks.

This framework is designed for developers who love TypeScript, are frustrated by the frequent churn in popular libraries, and want a simple setup to get back to the basics while keeping the conveniences of modern tooling.

There are no dependencies out of the box, and the framework is designed to be efficient, containing only what you need to get your app up and running. It includes a custom JSX implementation, type-safe routing, built-in state management, a lightweight component library, and more. All of these files are in the src folder, so you can easily modify them to suit your needs.

## Why TSFW?

In an environment where every framework introduces new abstractions and footguns, TSFW aims to simplify. Here's what led to its creation:

- JavaScript Overhead: Many frameworks come with layers of dependencies that complicate maintenance and increase the chance of breakage.

- JSX without React: Ever wanted to work in JSX without the baggage of React? With TSFW, you can use JSX directly in JavaScript/TypeScript.

- Seamless Component Handling: TSFW is compatible with a broad range of pure JavaScript libraries, unshackling you from ecosystem restrictions.

- Persistent State Management Across Tabs: The built-in state management syncs across tabs with local storage, session storage, indexeddb, or in-memory storage.

- Minimalist Yet Functional: It covers the essential features needed for a robust app: routing, state management, component library, and more, all at a fraction of the size of conventional frameworks.

- Type-Safe Routing: Routes are type-safe and compiled on server start, with support for data preloading, caching, and custom TTL.

- Zero Dependencies: TSFW is designed to be lightweight and efficient, with no dependencies out of the box and the intention to keep it that way.

## Features

- Custom JSX Implementation: Enjoy the power of JSX and functional component composition without React.

- Router with Type-Safe Routes: Type-safe routes are compiled on server start with support for data preloading, caching, and custom TTL.

- Built-In State Management: Choose between in-memory, local or session storage, and indexeddb. Local storage, session storage, and indexeddb support syncing state across tabs.

- Lightweight Component Library: Essential components styled with simplicity and accessibility in mind.

- Caching & TTL: Routes can be preloaded and cached with a specified TTL for responsive, offline-ready applications.

- Small Footprint: This framework is designed to be efficient, containing only what you need to get your app up and running.

## Getting Started

Follow these steps to set up and run your TSFW project.

### Installation

1. First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Cotter45/TSFW.git
cd TSFW
```

2. Install dependencies:

```bash
npm install
```

You can also utilize the npm package to create a new project:

```bash
npx @cotter45/tsfw@latest
```

This will prompt you for a directory name, and if you'd like to install the dependencies. Once the installation is complete, you can navigate to the project directory and run the development server with `npm run dev`.

## Development Server

Run the development server with:

```bash
npm run dev
```

This starts the Vite development server, providing fast, hot-reloading thanks to Vite.

## Building for Production

To build your application for production, use:

```bash
npm run build
```

This outputs the optimized and minified files to the dist directory. There are zero dependencies out of the gate, so just copy your dist folder to your server and you're good to go!

## Core Concepts and Usage

1. Custom JSX
   With TSFW, you can write JSX without React or other dependencies. This allows for a more flexible and scalable setup.

- Example:

```typescript
import { Text } from "@components/ui/Text";

export function WelcomeMessage() {
  return <Text>Welcome to TSFW!</Text>;
}
```

2. Type-Safe Routing

   - Define your routes in the index file, and let TSFW handle the routing. Routes support data preloading and caching.

```typescript
// src/routes.ts
import { registerRoutes } from "@core/router";

registerRoutes({
  path: "/", // Route path
  component: App, // Component to render
  children: [], // Child routes (ie App could be layout with children routes)
  loader: async () => {
    return { data: "Hello, World!" };
  }, // Data preloading from server or wherever
  fallback: <Loading />, // Fallback component to display while loading
  cacheLoader: "local", // Cache the loader response in local storage
  cacheKey: "home", // Cache key
  ttl: 1000, // Time to live in milliseconds
});
```

3. State Management with Persistence

- TSFW’s state management includes options for memory, local storage and session storage. Persistant states sync across any open tabs.

```typescript
import { createState } from "@core/state";

// Create a new state instance
const counterState = createState("counter", { count: 0 });

// Access or update the state
counterState.subscribe((state) => console.log(state.count));
counterState.setState({ count: counterState.getState().count + 1 });
```

4. Component Library

- The framework includes a few UI components such as Buttons, Links, Dialog, and more, all styled with accessibility and usability in mind. I'll be adding more components in the future so this paragraph is likely out of date.

- Example using the Accordion component:

```typescript
import { Accordion } from "@components/ui/Accordion";

export function InfoAccordion() {
  return (
    <Accordion
      panels={[
        { id: "1", title: "Introduction", content: "Welcome to TSFW!" },
        {
          id: "2",
          title: "Features",
          content: "JSX, Routing, State Mgmt, etc.",
        },
      ]}
    />
  );
}
```

5. Example Project Structure

- A typical TSFW project structure:

```bash
src/
├── components/
│ └── ui/ # Reusable JSX components
| └── web-components/ # Web components ( i like to wrap them with JSX components )
├── pages/ # Page components used in routing
└── core/ # Core utilities like state management, router, etc.
└── public/ # Favicon, manifest, etc.
└── types/ # Because TypeScript
└── index.css # Global styles
└── index.html # Main HTML file
└── index.ts # Entry point
```

## Contributing

Interested in contributing? Pull requests are welcome, and we’d love to see where this project can go! Before contributing, please check out our guidelines in the CONTRIBUTING.md.

## License

This project is licensed under the MIT License.

## Feedback

If you’re frustrated with modern frameworks and want a simple, accessible, and feature-rich alternative, give TSFW a spin, add to the repo, burn the repo and the computer it was made on... Whatever!! Then let me know what you think. Cheers.
