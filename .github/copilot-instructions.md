# AI Copilot Instructions for GoLite Mobile Codebase

## Project Overview
GoLite Mobile is a Next.js 16 + React 19 mobile service provider website showcasing telecom plans and services. It's a **marketing/informational frontend** (not an API or backend service) built with:
- **Framework**: Next.js 16 with App Router (Server Components by default)
- **Styling**: Tailwind CSS v4
- **UI Components**: Lucide React icons, Headless UI, React Slick carousels
- **Deployment Target**: Vercel (NextAuth-compatible setup)

## Critical Architecture Patterns

### App Router Structure
- **Root Layout** (`app/layout.tsx`): Defines HTML metadata, fonts (Geist), and global styles
- **Page Routes**: 
  - `app/page.tsx` = Homepage (main landing page)
  - `app/all-plans/page.tsx`, `app/prepaid/page.tsx`, `app/postpaid/page.tsx` = Plan category pages
- **Components**: Located in `app/components/` - shared React components used across pages

### Component Design
All components are **React Functional Components** using modern patterns:
- **Client Components**: Mark with `"use client"` directive (e.g., `Header.tsx`, `PlanSlider.tsx`, interactive components)
- **Server Components**: Default behavior (e.g., Footer.tsx, static content)
- **Styling**: Tailwind CSS classes directly in JSX; no CSS modules or styled-components
- **Responsive Design**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`) and viewport-width units (`vw`)
- **Carousel Implementation**: Use `react-slick` library (see `PlanSlider.tsx` for pattern)

### Data Flow & Plan Management
**Plans Array Pattern** (from `PlanSlider.tsx`):
```typescript
const plans = [
  { 
    category: "prepaid",      // or "postpaid", "travel"
    simType: "eSim",         // or "pSim"
    title: "Go-Lite prepaid",
    price: "$18.00/mo",
    tag: "Most Popular",     // optional
    features: [...],
    href: "#"                // optional
  },
  // More plans...
];
```
- Filter logic: Show plans based on `activeCategory` and `activeSimType` state
- This array-based approach keeps plan data in component state (no database/API calls currently)

## Developer Workflows

### Development & Testing
```bash
npm run dev          # Start dev server on http://localhost:3000 (hot reload enabled)
npm run build        # Production build (checks TypeScript errors)
npm run lint         # Run ESLint (Config: eslint.config.mjs)
npm start            # Start production server (requires npm run build first)
```

### Common Tasks
- **Adding a page**: Create `.tsx` file in `app/` directory (auto-routed)
- **Adding a component**: Create in `app/components/`, import with relative path
- **Styling**: Use Tailwind classes directly; no build step needed
- **Linting**: ESLint uses Next.js core rules + TypeScript support (configured in `eslint.config.mjs`)

## Code Conventions & Patterns

### TypeScript Configuration
- **Strict Mode**: Enabled (`"strict": true`)
- **Path Aliases**: `@/*` maps to root (configured in `tsconfig.json`); currently not widely used
- **JSX**: React 19 JSX transform (no `import React` needed)

### Naming & File Organization
- **Components**: PascalCase (e.g., `PlanSlider.tsx`, `Header.tsx`)
- **Pages**: lowercase directory names with `page.tsx` file (e.g., `all-plans/page.tsx`)
- **Utilities**: Not yet established; any utils should go in `app/utils/` or `app/lib/`

### UI/UX Patterns
- **Colors**: Orange accent (`bg-orange-500`, `text-orange-600`) for CTAs; gray palette for text
- **Spacing**: Consistent use of `py-16`, `px-6`, `gap-10` for vertical rhythm
- **Responsive Text**: Mix of `text-[Xvw]` viewport units and Tailwind breakpoints for dynamic sizing
- **Shadows**: Minimal (`shadow-sm`, `shadow-md`) for depth; prefer clean borders

### Client-Side Interactivity
- **State Management**: Use `useState` hook (no Redux/Context API established)
- **Effects**: Use `useEffect` for resize listeners (e.g., `PlanSlider.tsx` adjusts `slidesToShow` on window resize)
- **Refs**: Use `useRef` for carousel controls (e.g., `sliderRef` in slider components)

## Key Files & Components Reference

| File | Purpose | Type |
|------|---------|------|
| `app/layout.tsx` | Root wrapper, metadata, fonts | Server |
| `app/page.tsx` | Homepage with hero, plans, testimonials | Server |
| `app/components/Header.tsx` | Navigation bar | Client |
| `app/components/PlanSlider.tsx` | Carousel filtering by plan category/SIM | Client |
| `app/components/HomeBanner.tsx` | Hero section | Unknown (check file) |
| `app/components/Footer.tsx` | Footer with links & social | Server |
| `app/globals.css` | Global styles (Tailwind directives) |
| `next.config.ts` | Next.js config (empty, minimal setup) |
| `eslint.config.mjs` | ESLint rules (Next.js + TypeScript) |

## External Dependencies & Integration Points
- **Carousel**: `react-slick` + `slick-carousel` CSS; custom dots styling injected via CSS strings
- **Icons**: `lucide-react` (preferred) and `react-icons` (legacy)
- **UI Primitives**: `@headlessui/react` for accessibility components
- **Image Assets**: Located in `public/img/` (relative paths like `/img/logo.png`)
- **Metadata**: SEO title/description set in `layout.tsx` metadata object

## Important Constraints & Gotchas
1. **No Database/API Layer**: All plan data is hardcoded in component state arrays; future refactor may add a backend
2. **Mobile-First Responsive Design**: Always test with `sm:`, `md:`, `lg:` Tailwind breakpoints
3. **Image Paths**: Always use `/img/` prefix (public folder routing), not relative imports
4. **"use client" Directive**: Required for components using React hooks (useState, useEffect, useRef, etc.)
5. **Carousel CSS**: `react-slick` requires CSS import + custom style injection (see `PlanSlider.tsx` customStyles pattern)
6. **TypeScript Strict Mode**: No implicit `any` types; use proper interfaces/types for component props

## Recommended Practices for AI Agents
- When adding new pages, follow the file structure: `app/[feature]/page.tsx`
- Extract repeated JSX into components in `app/components/` with clear prop interfaces
- Use TypeScript interfaces for all component props (enforce with strict mode)
- Test responsive design across breakpoints (`sm`, `md`, `lg`)
- Keep component logic simple; use hooks for state/effects, not complex derived state
- Reference existing components (Header, Footer, PlanSlider) as patterns for new features
- Always use Tailwind classes for styling; avoid inline styles or CSS files
