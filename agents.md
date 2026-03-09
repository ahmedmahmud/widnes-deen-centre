# Widnes Deen Centre CMS

## Purpose
Build a single-page landing site for the local mosque with an authenticated `/admin` route for editing content. The CMS supports versioned page content, media management, and dynamic Maghrib time derived from sunset.

## Tech Stack
- TanStack Start (React, SSR): https://tanstack.com/start
- TanStack Router: https://tanstack.com/router
- Drizzle ORM (Postgres): https://orm.drizzle.team
- Better Auth (email/password): https://better-auth.com
- Tailwind CSS v4: https://tailwindcss.com
- PostgreSQL: https://www.postgresql.org/docs/

## How This Project Works
- `src/routes/index.tsx` renders the landing page with SSR data fetching.
- `src/routes/admin.tsx` is a protected CMS route (requires auth).
- `src/routes/login.tsx` provides email/password login for admins.
- Content is versioned in `page_versions` with published version tracking on `pages`.
- Media is stored via a storage adapter interface; local filesystem is the current implementation.
- Maghrib time is computed from a cached sunset API response + offset minutes.

## CMS Spec
### Editable Content
- Hero: background image, headline lines, subtitle, eyebrow label.
- Jamaat Times: fixed times for all prayers except Maghrib.
- Maghrib: uses sunset time + offset minutes (e.g. +5).
- About: story title, mission copy, image.
- Location: address block, map link, carousel images + captions.
- Donate: donation messaging + bank details.
- Footer: title, contact info, menu links, socials.

### Media Manager
- Upload and list images.
- Update image metadata (caption/alt).
- Deletion is blocked when a media item is used in any page version.
- Media can be selected via a modal picker when editing content.

### Versions
- Each save creates a new `page_versions` row.
- The `pages.publishedVersionId` points to the current live version.

## Key Paths
- `src/lib/cms/` content types, default content, sunset logic, media helpers.
- `src/lib/media-storage.ts` adapter interface.
- `src/lib/media-storage-local.ts` local filesystem adapter.
- `src/db/schema.ts` Drizzle schema for CMS + media + sunset cache.

## Critical Architecture Rules

### Server/Client Boundary (TanStack Start)
This project uses TanStack Start with SSR. The bundler creates separate client and server bundles. Breaking the server/client boundary crashes hydration silently (React never mounts on the client, no errors in browser console).

**Rules:**
1. **Route files (`src/routes/*.tsx`) must NEVER import server-only modules at the top level.** Any module that transitively imports `db` (from `@/db/index`), `pg`, Node built-ins (`node:fs`, `node:stream`, `node:crypto`), or `@tanstack/react-start/server` will crash the client bundle. Route files are bundled for BOTH client and server.
2. **All server-only logic must be wrapped in `createServerFn`.** The TanStack Start compiler replaces `.handler()` bodies with RPC stubs on the client. Put server-only imports as dynamic `await import(...)` INSIDE the handler body, not at the top of the file.
3. **Files with `.server.ts` suffix are fully excluded from the client bundle.** Never export `createServerFn` from a `.server.ts` file — the client needs the RPC stub, but the `.server.ts` suffix strips everything. Plain helper functions (called inside other server fn handlers) belong in `.server.ts`. Server functions callable from routes/client go in `server-fns.ts`.
4. **`src/lib/server-fns.ts`** is the single file that exports all `createServerFn` wrappers. Its only top-level imports are `createServerFn` from `@tanstack/react-start` and pure types. All server-only imports (`db`, `content`, `admin-auth.server`, `media`, `logger`) are dynamic imports inside handler bodies.
5. **`src/lib/admin-auth.server.ts`** contains plain server-side helpers only (`resolveAdminSession`, `ensureAdmin`). These are called from inside other server fn handlers. They are NOT `createServerFn` — those wrappers live in `server-fns.ts`.

### Loader Pattern
- Route loaders call a `createServerFn` from `server-fns.ts` (e.g., `getLandingContentFn`, `getAdminData`).
- Never define a plain async function in a route file that imports server modules — even if it's only called from the loader, the top-level import still leaks into the client.

## Notes
- Replace local media adapter with S3 by implementing `MediaStorageAdapter`.
- Replace static lat/long/timezone in `src/lib/server-fns.ts` (LATITUDE/LONGITUDE/LOCAL_TIMEZONE constants in `getLandingContentFn`) when needed.
