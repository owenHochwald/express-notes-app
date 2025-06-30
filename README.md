# Graphium: MERN Notes App with Graph Visualization

Graphium is a fullstack notes application built with the MERN stack. It supports note creation, editing, deletion, and visualizes connections between notes as a graph. The project demonstrates a modern approach to building scalable, interactive web applications with a focus on API design, rate limiting, and graph-based UI.

After finishing a DSA course, I wanted to apply some graph theory in a real project. I built this app quickly to experiment with graph layouts and interactive visualization. I also set up different development and production environments, making sure the app runs smoothly in both. I plan to keep working on this project and add more features over time.

## Techniques Used
API Rate Limiting: Uses Upstash Ratelimit to control request frequency, protecting backend resources.
Graph Visualization: Implements graph layouts with dagre and renders interactive node graphs using React Flow.
Dynamic Routing: Employs React Router for client-side navigation and parameterized routes.
Optimistic UI Updates: Updates UI state immediately after actions like deletion, before waiting for server confirmation.
Custom Theming: Uses Tailwind CSS and daisyUI for flexible, themeable UI components.
TypeScript Strictness: Enforces strict type checking and linting for maintainable, error-resistant code.
Environment-based API URLs: Dynamically sets API base URLs using Vite’s environment variables.
See axios.ts for implementation.

## Notable Libraries and Technologies
- React for UI
- TypeScript for type safety
- Vite for fast frontend builds
- React Flow for graph rendering
- dagre for automatic graph layout
- daisyUI for Tailwind CSS component themes
- Upstash Ratelimit for serverless rate limiting
- Mongoose for MongoDB ODM
- Lucide Icons for SVG iconography
- React Hot Toast for notifications


## Interesting Directories:

- backend/src/controllers: Express route handlers for notes and graph endpoints.
- backend/src/middleware: Custom middleware, including rate limiting.
- backend/src/models: Mongoose schemas for MongoDB.
- frontend/src/components: React UI components, including graph nodes and navigation.
- frontend/src/lib: Utility modules for API, graph layout, and formatting.
- frontend/src/pages: Page-level React components for routing.