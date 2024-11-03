<!-- 1. Introduction
   Overview: Brief summary of the project’s purpose, technology stack, and primary goals.
   Features: Highlight the key capabilities:
   Minimal JSX Implementation
   Built-in Router and State Management
   Component Library (with an outline for future expansion)
   Persistent State Sync Across Tabs, etc. -->

2. Getting Started
Installation: Guide on setting up Vite and running the development server.
Project Structure: Outline the folder and file organization, especially for components, state management, routing, and other core files.
<!-- 3. Routing
   Router Overview: Describe the router’s client-side nature, type-safe route compilation, and custom event-based handling.
   Type-Safe Routes: Detail how routes are defined and compiled at server start.
   Caching and Preloading: Explain data caching within the router, TTL configuration, and preloading capabilities.
   Navigation and URL Params: Show examples of how to navigate, handle URL parameters, and manage query parameters. -->
3. State Management
   Overview: Describe the different storage types (in-memory, local, session, IndexedDB).
   Setting Up State: Step-by-step on creating and subscribing to state instances.
   Persistent Storage & Syncing: Explain how persistent state syncs across tabs and how this impacts app behavior.
   TTL and Cache Management: Describe TTL configuration for cached data and automatic expiration.
4. Component Library
   Library Overview: Document the components currently available and their intended use cases.
   Creating Components: Instructions for building reusable components in the system.
   Component API and Styles: Describe component props, styles, and accessibility considerations.
5. Testing
   Testing Setup: Quick guide on setting up Vitest for this project.
   Writing Tests: Best practices for writing tests for components, routing, and state management.
   Running Tests: How to run, debug, and interpret tests within Vitest.
6. Examples and Use Cases
   Example Applications: Showcase a few practical examples, like a to-do list or a simple CRUD interface.
   Advanced Patterns: Show more complex interactions, such as using IndexedDB for offline data storage or state syncing across tabs.
7. FAQ
   Common Issues: List any common setup or usage issues, with solutions.
   Troubleshooting: Tips for debugging specific features (e.g., caching, routing, or state sync issues).
