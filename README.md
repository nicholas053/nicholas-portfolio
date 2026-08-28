This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Site URL (SEO / Open Graph)

Canonical URLs, sitemap, and JSON-LD need an absolute origin via `getSiteUrl()`:

1. Prefer `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) — **set this in Vercel if you use a custom domain**.
2. Else `VERCEL_URL` (automatic on Vercel for `*.vercel.app`).
3. Else `http://localhost:3000`.

Bare Vercel previews usually need no env. Custom domains should set `NEXT_PUBLIC_SITE_URL` so share cards and sitemap do not advertise the `*.vercel.app` host.

## Headshot (Google Person / About)

Drop a professional photo at `public/nicholas-chong.png`. It appears in the About section and in Person / ProfilePage JSON-LD only — **not** on the branded Open Graph share card (`/opengraph-image`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
