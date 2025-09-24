# Copilot Instructions for StimGames

## Project Overview
- **StimGames** is a web application built with vanilla JavaScript using custom elements (Web Components) and Shadow DOM for encapsulation.
- The app is structured around a root component (`AppRoot.js`) that composes header, browse, and footer components.
- Game data is fetched from an external API and managed by a singleton service (`services/GameService.js`).

## Key Architectural Patterns
- **Component System:**
  - All UI elements extend `BaseComponent` (see `components/BaseComponent.js`), which provides CSS attachment and Shadow DOM setup.
  - Components are registered with `static define(tag)` and used as custom HTML tags (e.g., `<browse-page>`, `<carousel-body>`).
  - CSS is loaded dynamically per component using the `_attachCSS` method.
- **Data Flow:**
  - `GameService` fetches and stores all game data, exposes methods for filtering, trending, and random selection.
  - Components listen for the `change` event on `gameService` to update their state when data changes.
  - No global state management library is used; communication is via events and direct service calls.

## Developer Workflows
- **No build step**: The project runs directly in the browser; ensure all imports use relative paths and file extensions.
- **Testing**: No automated test framework is present; manual testing is done via the browser.
- **Debugging**: Use browser dev tools. Shadow DOM may require enabling "Show user agent shadow DOM" for inspection.

## Project-Specific Conventions
- **File Structure:**
  - Components are grouped by feature in `components/`, with further subfolders for logical grouping (e.g., `Browse/CarouselBody/`).
  - Each component has a `.js` and (optionally) a `.css` file with the same name.
- **Assets:**
  - SVG icons and images are in `assets/` and referenced with absolute paths from the public root.
- **API Integration:**
  - All game data is fetched from `https://vj.interfaces.jima.com.ar/api` at startup.
  - Ratings are scaled on fetch (see `GameService.js`).

## Examples
- To add a new carousel type, extend the `_types` object in `CarouselBody.js` and provide a data method in `GameService.js` if needed.
- To create a new component, extend `BaseComponent`, define the tag, and place files in the appropriate subfolder.

## Key Files
- `AppRoot.js` — Application entry point and main layout
- `components/BaseComponent.js` — Custom element base class
- `services/GameService.js` — Game data service and event source
- `components/Browse/CarouselBody/CarouselBody.js` — Example of data-driven UI component

---

For questions about project structure or patterns, review the above files for reference implementations.
