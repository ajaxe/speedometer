# AGENTS.md

## 1. Project Mission
**Speedometer** is a lightweight, responsive client-side web application designed to track and display real-time movement velocity using browser DOM APIs. It provides real-time speed monitoring in multiple units while keeping the device screen active during navigation.

## 2. Tech Stack & Core Dependencies
- **Primary Languages:** **TypeScript** (`^4.9.5`), **JavaScript** (ES6+), **HTML5**, **SCSS**
- **Frontend Framework:** **Vue 3** (`^3.5.42`) (Composition API with `<script setup>`)
- **UI & Component Library:** **Quasar Framework v2** (`^2.32.3`) with **Vite** bundler (`@quasar/app-vite` `^3.8.4`)
- **State Management:** **Pinia** (`^2.3.1`)
- **Routing:** **Vue Router v4** (`^4.6.4`) with hash mode (`#`)
- **HTTP & Browser APIs:** **Axios** (`^1.20.0`), **Geolocation API** (`navigator.geolocation`), **Screen Wake Lock API** (`navigator.wakeLock`)
- **Code Quality & Formatting:** **ESLint** (`^8.57.1`), **Prettier** (`^2.8.8`)
- **Infrastructure & Deployment:** **Terraform** (`>=0.13`) deploying built static SPA assets (`dist/spa`) to **AWS S3** (`hashicorp/aws` provider `4.10.0`)

## 3. Architecture & Design Patterns
- **Client-Side SPA Architecture:** The application runs entirely within the browser without a backend app server, using native HTML5 Web APIs to gather sensor data.
- **Service Layer Abstraction:** Browser API integrations (Geolocation and Screen Wake Lock) are decoupled into dedicated service modules in `src/services/` that interface with the central state store.
- **Centralized Reactive State (Pinia Store):** State management (`src/stores/speed-store.ts`) acts as the single source of truth for current speed, unit preferences (`m-per-sec`, `km-per-hr`, `miles-per-hr`), UI refresh tickers, screen wake lock status, and error states.
- **Reactive UI & Dynamic Formatting:** Computed properties and getters calculate real-time unit conversions (`m/s`, `km/h`, `mph`) and dynamic visual alert indicators (green, orange, red display colors based on speed thresholds).
- **Declarative Infrastructure as Code:** Infrastructure defined in Terraform (`infrastructure/terraform/components/speedometer/prod/`) provisions S3 static website hosting and S3 state backend.

## 4. Directory Mental Model
```
speedometer/
├── src/
│   ├── boot/               # App initialization plugins (axios setup)
│   ├── components/         # Reusable Vue components
│   │   ├── ErrorMessageDisplay.vue # Renders geolocation error states
│   │   ├── NotEnabledDisplay.vue   # Displayed when Geolocation API is unavailable
│   │   ├── ScreenWake.vue          # Control button for Screen Wake Lock API
│   │   ├── SpeedDisplay.vue        # Primary numerical speed display component
│   │   ├── TickerDisplay.vue       # Refresh ticker visualization indicator
│   │   ├── UnitSelector.vue        # Toggle buttons for speed units
│   │   └── models.ts               # Component model definitions & SpeedUnit enum
│   ├── css/                # SCSS stylesheets and Quasar style variables
│   ├── layouts/            # Page layouts (MainLayout.vue with dark mode enabled)
│   ├── pages/              # View pages (IndexPage.vue main dashboard, ErrorNotFound.vue)
│   ├── router/             # Vue Router route configuration
│   ├── services/           # Non-UI browser API abstractions
│   │   ├── screen-wake.ts  # Screen Wake Lock API lifecycle and event listeners
│   │   └── speed-sensor.ts # Geolocation API watcher and throttled rate-limiter
│   ├── stores/             # Pinia state management stores
│   │   └── speed-store.ts  # Speedometer state, getters, unit conversions, actions
│   └── App.vue             # Root application component
├── infrastructure/         # Deployment infrastructure configurations
│   └── terraform/          # Terraform configurations for AWS S3 deployment
├── public/                 # Static public assets (favicons, icons)
├── quasar.config.js        # Quasar CLI & Vite build configuration
└── package.json            # Project dependencies and operational scripts
```

## 5. Development Standards

### Naming Conventions
- **Vue Components:** Use **PascalCase** for all component filenames (e.g., `SpeedDisplay.vue`, `ScreenWake.vue`).
- **TypeScript & Service Files:** Use **kebab-case** for service and utility filenames (e.g., `speed-sensor.ts`, `screen-wake.ts`, `speed-store.ts`).
- **Variables & Functions:** Use **camelCase** for JS/TS identifiers (`currentSpeed`, `setScreenWake`, `convertSpeed`).
- **Enums & Constants:** Use **PascalCase** for enum definitions (`SpeedUnit`) and **camelCase** / **PascalCase** for property values.

### Error Handling & Logging
- **Browser API Guarding:** Always verify API availability on the `navigator` object (e.g., `'wakeLock' in navigator`, `navigator.geolocation`) before invoking methods.
- **Graceful Error Serialization:** Catch errors from DOM promises/callbacks and store serialized messages (`JSON.stringify(err)`) in the Pinia store (`store.error`) for UI rendering via `ErrorMessageDisplay.vue`.
- **Console Debug Logging:** Service modules log key lifecycle events (e.g., `acquired screen lock`, `invoking visibilitychange`) to `console.log` for debugging.

### Implementation Patterns
- **Vue 3 Composition API:** Use `<script setup lang="ts">` for all new components.
- **Unit Conversions:** All speed data is stored natively in **meters per second** (`m/s`) within the Pinia store. Unit conversions to `km/h` (`input * 3600 / 1000`) and `mph` (`input * 2.23693629`) must occur in store getters/helpers, not raw UI components.
- **Screen Wake Visibility Lifecycle:** Page visibility changes (`document.visibilitychange`) re-trigger screen wake lock re-acquisition automatically when returning to the tab.

## 6. Hard Constraints & Anti-Patterns
- **DO NOT assume backend services exist:** This project is a static frontend SPA. Do not attempt to add server-side API endpoints, database connections, or node backend runtime dependencies.
- **DO NOT bypass feature detection:** Never invoke `navigator.geolocation.watchPosition` or `navigator.wakeLock.request` without checking feature support first.
- **DO NOT mutate speed store state directly in UI components:** Mutate state through Pinia actions (`store.setScreenWake()`, `store.setCurrentSpeed()`) or explicit store mutations.
- **DO NOT hardcode speed unit strings:** Always import and use the `SpeedUnit` constant object from `src/components/models.ts`.
- **DO NOT disable Quasar Dark Mode:** Dark theme is explicitly enabled globally in `MainLayout.vue` (`$q.dark.set(true)`). Keep night-drive friendly dark styling intact.

## 7. Operational Commands

### Development & Local Execution
- **Install Dependencies:**
  ```bash
  pnpm install
  # or npm install / yarn
  ```
- **Run Local Dev Server (with hot reloading):**
  ```bash
  npx quasar dev
  # or pnpm quasar dev
  ```

### Code Quality & Linting
- **Lint Codebase (ESLint):**
  ```bash
  npm run lint
  ```
- **Format Files (Prettier):**
  ```bash
  npm run format
  ```
- **Run Tests:**
  ```bash
  npm test
  ```

### Production Build & Infrastructure
- **Build Static Production Assets:**
  ```bash
  npx quasar build
  ```
  *(Outputs static build artifacts to `dist/spa` directory)*
- **Terraform Infrastructure Deployment (Prod):**
  ```bash
  cd infrastructure/terraform/components/speedometer/prod
  terraform init -backend-config=backend.tfvars
  terraform apply -var-file=terraform.tfvars
  ```
