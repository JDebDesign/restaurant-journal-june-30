# Restaurant Journal

A personal journal for tracking restaurants you've visited — log where you ate, what you ordered, how it rated, and photos from the meal, then browse and search past entries.

## What it does

- **Log entries** for each restaurant visit: name, location, cuisine, date visited, star rating, notes, tags, and the dishes you tried
- **Attach photos** to an entry via a photo picker
- **Mark favorites** so standout restaurants are easy to find again
- **Search and filter** entries by name, tag, cuisine, or rating
- **Authentication** so entries are private to the signed-in user

## Tech stack

- **[React 19](https://react.dev/)** with **[React Router](https://reactrouter.com/)** for the UI and client-side routing
- **[Vite](https://vitejs.dev/)** as the build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** (v4, via `@tailwindcss/postcss`) for styling
- **[Supabase](https://supabase.com/)** (`@supabase/supabase-js`) for the backend — Postgres database and authentication
- **[Oxlint](https://oxc.rs/)** for linting

## Project structure

- `src/pages/` — top-level routed pages (journal list, entry detail, entry form, login)
- `src/components/` — reusable UI pieces (entry cards, star rating, tag input, photo picker, search/filter bar)
- `src/context/` — React context providers for auth and journal state
- `src/hooks/` — custom hooks (`useAuth`, `useJournal`, `useEntry`)
- `src/data/journalService.js` — Supabase queries for reading/writing journal entries
- `src/lib/supabaseClient.js` — Supabase client setup

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file with your Supabase project credentials:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run Oxlint
