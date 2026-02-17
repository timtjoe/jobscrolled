![JobScrolled Header](./public/social_proof.png)

### About JobScrolled
Finding remote work can be a nightmare for developers outside of Europe or North America. **JobScrolled** is a "worldwide-first" platform built to bridge this gap, prioritizing high-quality, global remote frontend roles. It aggregates data into a high-performance, visually polished interface designed for the modern digital nomad.

---

### Design Patterns & Architectural Decisions

To ensure the app is scalable, maintainable, and performant, I implemented several industry-standard design patterns:

#### 1. Adapter Pattern (Data Transformation)
* **The Problem:** Job data arrives from multiple APIs with inconsistent naming conventions (e.g., `job_title` vs `name`).
* **The Solution:** I implemented an **Adapter layer** that maps various external API responses into a unified `JobContract` interface. This ensures the UI components never have to worry about where the data came from—they only consume a predictable, type-safe object.

#### 2. Repository Pattern (Data Abstraction)
* **The Logic:** Instead of components calling APIs directly, they interact with a **Repository**. This layer abstracts the data source, allowing me to switch between local JSON, mock data, or live APIs without changing a single line of UI code. It serves as the "Single Source of Truth."

#### 3. Observer Pattern (Reactive State via Jotai & TanStack)
* **The Logic:** Using a **Publisher/Subscriber (Pub/Sub)** model, the app maintains a reactive state. When a user changes a filter (Publisher), multiple parts of the app (Subscribers)—like the job list and the Redirector—automatically sync and update without manual re-renders.

#### 4. Master-Detail Pattern (UX Flow)
* **The Logic:** To optimize the browsing experience on desktop, I used a split-pane view. Users can scroll through a list (Master) while viewing full descriptions (Detail) simultaneously. This eliminates "pogo-sticking" (navigating back and forth between pages) and keeps the user in a continuous discovery flow.

#### 5. Skeleton Screen Pattern (Perceived Performance)
* **The Logic:** Instead of showing generic spinners, I implemented **Skeleton States** that mimic the layout of the job content. This improves perceived performance by showing users the structure of the page while data is being fetched.

#### 6. Compound Component Pattern
* **The Logic:** By breaking down complex UI into specialized sub-components (e.g., `MetaRow`, `PerksRow`, `LogoSection`), I created a highly reusable codebase. Each piece handles one specific concern, making the components easier to test and style.

#### 7. Error Boundary Pattern (Resilience)
* **The Logic:** Critical UI segments are wrapped in **React Error Boundaries**. If a specific job description or suggestion fails to render, the entire app remains stable while providing a graceful fallback UI for the affected section.

---

### Tech Stack
* **TypeScript:** Strict type-safety for a self-documenting and robust codebase.
* **React:** Utilizing hooks and functional components for a declarative, modern UI.
* **TanStack Query:** Advanced server-state management with built-in caching and background refetching.
* **Styled Components:** CSS-in-JS for scoped, dynamic styling and clean component hierarchies.
* **Jotai:** Atomic state management for lightweight and secure global app settings.
* **Knip:** Employed as a "code health" tool to identify and prune unused modules, keeping the bundle lean.

---

### Performance & Code Health
* **Tree Shaking:** Optimized build process to ship zero unused code.
* **Sanitization:** Integrated **DOMPurify** to safely render third-party HTML descriptions, mitigating XSS risks.
* **Adaptive Layouts:** Custom CSS Grid logic that transforms from a dual-pane desktop view to a mobile-first sticky header experience.

---

### About the Developer
I am a **Full-Stack Developer** with **5+ years of experience** obsessed with the intersection of high-fidelity UI and system-level efficiency. While I spend my days orchestrating UI trees and fluid animations, I have a deep-seated love for **low-level programming**. 

I built this platform as a showcase for high-fidelity frontend engineering. I am currently **open to offers** for Remote-first or Relocation-friendly roles where UI excellence and technical curiosity are prioritized.

### Let's Connect
* **Email:** [timtjoe@gmail.com](mailto:timtjoe@gmail.com)
* **WhatsApp:** [+231 770 934 646](https://wa.me/231770934646)
* **GitHub:** [github.com/timtjoe](https://github.com/timtjoe)

---
*© 2026 Tim T. Joe*