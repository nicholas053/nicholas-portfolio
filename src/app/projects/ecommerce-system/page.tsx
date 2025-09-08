import { SiNextdotjs, SiReact, SiTailwindcss, SiPostgresql, SiVercel, SiDotnet } from 'react-icons/si';
import FeatureRow from '@/components/FeatureRow';
import { FiExternalLink } from 'react-icons/fi'
export default function EcommerceProjectPage() {
  return (
    <main className="px-4 md:px-12 py-12 space-y-24 max-w-6xl mx-auto">
      {/* Page Title */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">E-commerce Platform</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A full-stack e-commerce application with customer & admin roles, secure JWT authentication,
          product management, cart & checkout, inventory tracking and reporting — built for production-readiness.
        </p>
        <div className="flex items-center justify-center gap-4">
            <a
                href="https://github.com/nicholas053/Ecommerce-Platform"
                target="_blank"
                rel="noreferrer noopener"
                className="px-5 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black inline-flex items-center gap-2 shadow"
            >
                Code on Github <FiExternalLink />
            </a>
        </div>
      </section>

      {/* Overview */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Overview</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          This platform supports a complete merchant and customer workflow: product browsing, category filters,
          secure authentication, a persistent client cart, checkout with simulated payment confirmation (dev),
          and an admin area for inventory and order management. The backend issues JWTs and stores refresh tokens safely.
        </p>
      </section>

      {/* Features: Auth & Security */}
      <FeatureRow
        title="Authentication & Security"
        description="Customers and Administrators authenticate via JWTs issued by the ASP.NET Core backend. The frontend uses Next.js API proxy routes to set HttpOnly tokens (access & refresh) — this prevents sensitive tokens from being exposed to JavaScript while enabling secure server-side requests."
      />

      {/* Features: Product Catalog */}
      <FeatureRow
        title="Product Catalog & Search"
        description="Products are organized by categories with server-side pagination and filters. Product pages include rich details—images, price, stock, and descriptions—and a client add-to-cart component for a fast shopping experience."
        reverse
      />

      {/* Features: Cart & Checkout */}
      <FeatureRow
        title="Cart & Checkout"
        description="Cart state is managed with Zustand and persisted to localStorage. The store hydrates client-side and synchronizes across tabs. Checkout creates orders through internal server routes and (in development) simulates payment confirmation to complete the flow."
      />

      {/* Features: Orders & Admin */}
      <FeatureRow
        title="Orders, Inventory & Admin"
        description="Customers can view order history and details. Admins access a protected dashboard to monitor sales, perform product CRUD (including bulk import), handle inventory adjustments, and print/export reports for a selected date range."
        reverse
      />

      {/* Features: Reporting & Transactions */}
      <FeatureRow
        title="Reporting & Inventory Transactions"
        description="A dedicated admin reports section provides sales exports and inventory transaction history. Admins can create adjustments, view stock movement, and export order lists (with recipient, address, items, payment details) for accounting or audits."
      />

      {/* Responsive & Accessibility */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Responsive & Accessible</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          The UI is responsive with a mobile-first layout and a desktop mode. Accessibility considerations include
          semantic HTML, keyboard-navigable forms, and sensible focus states.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">Tech Stack</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          A modern full-stack architecture emphasizing security, performance, and developer productivity.
        </p>

        <div className="flex flex-wrap justify-center gap-8 text-6xl mt-8 text-gray-800 dark:text-gray-200">
          <SiNextdotjs title="Next.js" />
          <SiReact title="React" className="text-sky-500" />
          <SiTailwindcss title="TailwindCSS" className="text-sky-400" />
          <SiPostgresql title="PostgreSQL" className="text-blue-600" />
          <SiDotnet title=".NET (C#)" className="text-slate-600" />
          <SiVercel title="Vercel" />
        </div>

        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 space-y-2 text-center mt-6">
          <p><strong>Frontend:</strong> Next.js (App Router), React, TypeScript, Tailwind CSS</p>
          <p><strong>State:</strong> Zustand for cart & client state with localStorage persistence</p>
          <p><strong>Backend:</strong> ASP.NET Core (C#), Entity Framework Core, JWT authentication</p>
          <p><strong>Database:</strong> PostgreSQL</p>
          <p><strong>Auth:</strong> JWT (access + refresh), HttpOnly cookies via Next.js API proxy</p>
          <p><strong>Deployment:</strong> Vercel (frontend), Docker / Azure (backend)</p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Future Roadmap</h2>
        <div className="relative border-l border-gray-300 dark:border-gray-600 ml-4 space-y-12">
          <div className="ml-6">
            <h3 className="text-xl font-semibold">Payment Gateway Integration</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Integrate Stripe (or another PCI-compliant provider) for production payments, with webhook validation and reconciliation.
            </p>
          </div>

          <div className="ml-6">
            <h3 className="text-xl font-semibold">Advanced Admin Analytics</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Add time-based analytics, cohort reports, sales funnels, and downloadable PDFs/CSV for finance teams.
            </p>
          </div>

          <div className="ml-6">
            <h3 className="text-xl font-semibold">Internationalization & Multi-Currency</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Expand locale support, currency conversion, tax handling, and localized product content for regional markets.
            </p>
          </div>

          <div className="ml-6">
            <h3 className="text-xl font-semibold">Mobile & PWA</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Provide a Progressive Web App for offline browsing & quick reordering; later extend to native mobile apps if needed.
            </p>
          </div>

          <div className="ml-6">
            <h3 className="text-xl font-semibold">Performance & SEO</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Optimize images, add server-side caching for product lists, enhance schema markup for product pages, and implement a CDN for asset delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
