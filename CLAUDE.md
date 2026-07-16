# Portfolio Development Rules

Follow these rules throughout the entire project.

## General Rules

- Always write clean, modular, scalable code.
- Use TypeScript only. Never use JavaScript files.
- Follow Next.js App Router conventions.
- Keep components reusable. Avoid duplicate code.
- Follow SOLID principles where applicable.
- Use functional components only. Prefer composition over inheritance.
- Never use inline styles unless absolutely necessary. Use Tailwind CSS for all styling.
- Keep code readable and self-documenting.
- Think before generating code.
- Reuse existing components before creating new ones. Never duplicate logic.
- If creating a new component, check whether a similar one already exists.
- Prefer server components unless client-side interactivity is required. Use `"use client"` only when necessary.
- Minimize bundle size.

## Folder Structure

Follow this structure exactly:

```
portfolio/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── animations/
│   ├── cards/
│   ├── buttons/
│   ├── shared/
│   └── icons/
├── hooks/
├── lib/
├── services/
├── providers/
├── context/
├── data/
├── constants/
├── config/
├── types/
├── utils/
├── styles/
├── animations/
├── public/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   ├── videos/
│   └── models/
├── middleware.ts
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Naming Convention

- **Folders**: lowercase (`hero`, `projects`, `contact`)
- **Files**: PascalCase (`Hero.tsx`, `ProjectCard.tsx`, `Navbar.tsx`)
- **Hooks**: `useTheme.ts`, `useScroll.ts`
- **Utilities**: `formatDate.ts`, `cn.ts`
- **Types**: `project.ts`, `experience.ts`
- **Interfaces**: `IProject`, `IExperience`
- **Enums**: `ProjectStatus`
- **Variables**: camelCase
- **Constants**: UPPER_CASE

## Component Rules

- Each component should contain only one responsibility.
- If a component exceeds 200 lines, split it.
- Complex components get their own folder, e.g.:

```
Hero/
├── Hero.tsx
├── HeroBackground.tsx
├── HeroContent.tsx
├── HeroButtons.tsx
└── index.ts
```

## Import Rules

- Always use aliases: `@/components`, `@/hooks`, `@/lib`.
- Never use relative traversal like `../../../`.

## Styling Rules

- Only Tailwind CSS. No Bootstrap, Material UI, or Chakra. No inline CSS.
- Keep spacing consistent — padding scale: 16, 24, 32, 48, 64.
- Border radius: 12, 16, 20.
- Typography scale: 12, 14, 16, 18, 20, 24, 32, 48, 64.

## Responsive Rules

- Mobile first.
- Support 320, 375, 390, 414, 768, 1024, 1280, 1440, 1920px.
- Use Tailwind breakpoints. Never create separate pages for mobile.

## Animation Rules

- Use Framer Motion, GSAP, and Lenis only.
- Never animate everything — animations should have purpose.
- Duration scale: 200ms, 300ms, 500ms, 800ms.
- Use easing. Avoid excessive bouncing.
- Support `prefers-reduced-motion`. Maintain 60 FPS.
- Every animation should degrade gracefully on low-performance devices.

## Image Rules

- Use WebP/AVIF and the Next.js Image component. Lazy load.
- Never use huge PNG files. Compress images.

## Performance Rules

- Lazy load heavy components. Dynamic import Three.js.
- Optimize fonts. Avoid unnecessary re-renders. Memoize expensive components.
- Code split large sections.
- Never sacrifice performance for unnecessary animations.
- Every new feature should be responsive by default.
- Lighthouse targets: Performance >95, SEO 100, Accessibility 100, Best Practices 100.

## SEO Rules

- Use the Metadata API. Generate `sitemap.xml` and `robots.txt`. Use structured data.
- Every page must have: title, description, OG image, canonical URL.

## Accessibility Rules

- Keyboard navigation. Visible focus states. ARIA labels. Semantic HTML. Alt text. Color contrast.
- Prefer accessibility over visual effects.

## Code Style

- Use async/await. No nested ternaries. Avoid magic numbers — extract constants.
- Keep functions under 40 lines when possible. Prefer early returns.
- Avoid unnecessary comments. Code should explain itself.

## Icons

- Use Lucide React only. No mixed icon libraries.

## Fonts

- Geist, Inter, Space Grotesk only.

## Color System

- Use CSS variables. Never hardcode colors repeatedly.
- The palette below is the single source of truth. Define it once as CSS variables and expose it as Tailwind tokens — never inline a raw hex value in a component.

| Token | Hex | CSS variable | Tailwind class prefix |
|---|---|---|---|
| Background | `#0B0B0F` | `--background` | `background` |
| Surface | `#15151A` | `--surface` | `surface` |
| Card | `#1C1C22` | `--card` | `card` |
| Border | `#2A2A33` | `--border` | `border` |
| Primary Text | `#FFFFFF` | `--foreground` | `foreground` |
| Secondary Text | `#A1A1AA` | `--secondary` | `secondary` |
| Muted | `#71717A` | `--muted` | `muted` |
| Accent | `#F59E0B` | `--accent` | `accent` |
| Accent Hover | `#FBBF24` | `--accent-hover` | `accent-hover` |
| Success | `#22C55E` | `--success` | `success` |
| Error | `#EF4444` | `--error` | `error` |

- This is a single fixed dark theme — there is no light mode toggle. Do not gate these variables behind `prefers-color-scheme`.

## Project Sections

Loading Screen, Hero, About, Experience, Skills, Services, Projects, Case Studies, Testimonials, Achievements, Contact, Footer.

## Git Rules

- Meaningful commits only, e.g. `feat: add hero animation`, `fix: navbar scroll issue`, `refactor: optimize project cards`.
- Never commit broken code.

## Final Goal

The website should feel premium, luxury, minimal, modern, smooth, professional, award-winning — Apple-level polish, Awwwards quality. Optimized for every screen size, with consistent spacing, typography, animation, and architecture throughout.
