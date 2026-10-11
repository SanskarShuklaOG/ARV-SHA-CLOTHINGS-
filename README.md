# ARVÉSHA CLOTHINGS

A responsive Next.js storefront starter with a minimal editorial design, product catalogue, category/subcategory navigation, device-local cart persistence, checkout form, account screens, policy hub, support pages, custom error screens, Neon PostgreSQL schema and a separately addressed admin-gate scaffold.

## Run locally

- Node.js 20 or newer
- `npm install`
- Copy `.env.example` to `.env.local`
- `npm run dev`

## What works in this starter

- Responsive storefront with mobile bottom navigation
- Product catalogue and detail pages
- Add to bag, quantity changes, removal and browser-local temporary cart persistence
- Category and subcategory browsing
- Checkout form with basic browser validation
- Login and registration form UX with generic setup messages
- Policy index and individual policy routes
- Custom not-found and generic error pages
- Health endpoint and starter Neon schema
- Admin entry path `/admin-gate/<ADMIN_PATH_SECRET>` that is not linked publicly

## Important: not production-ready

This project cannot honestly be described as a fully functional live commerce service until external services are configured and server endpoints are implemented, tested and deployed. The UI intentionally does not pretend to create accounts, accept orders or charge cards when credentials are missing. Product names, prices and visual product art are starter catalogue content; replace them with approved product photography, real inventory and verified prices.

### Security requirements before collecting customer data

- **Authentication:** Configure Clerk or another managed provider and implement verified server-side sessions, email verification, recovery, session revocation and authorization on every protected endpoint. Truecaller direct login requires access to an approved Truecaller OAuth/OIDC integration; it cannot be enabled by simply adding a button.
- **Passwords:** Prefer managed authentication so this app never handles passwords. If implementing your own identity store, store only Argon2id password hashes (not encrypted/reversible passwords), use a maintained Argon2 implementation, rate-limit attempts and never log credentials.
- **Neon:** Set `DATABASE_URL` only in server runtime. Use least-privilege database roles, migrations, backups, access controls and retention rules. Avoid retaining full raw IP history or date of birth without a justified purpose. Store a keyed/hash representation of IP only where necessary for abuse detection.
- **Admin:** A secret URL is obscurity, not authentication. Add a staff identity provider, MFA, role checks on every admin route/API, audit events, rate limits and least-privilege DB access before exposing customer or sales data. Do not deploy the current admin scaffold as an operational dashboard.
- **Turnstile:** Render the widget and verify its token server-side with Cloudflare on every relevant endpoint. A client-side widget alone is not protection.
- **Disposable email:** Reject disposable domains on the server using a maintained domain list, with a clear recovery path for legitimate users.
- **Resend:** Use verified sender/domain configuration, expiring single-use verification/recovery tokens and generic responses that do not disclose account existence.
- **Razorpay:** Create orders on the server from database prices, verify payment signatures and webhook signatures, make webhook processing idempotent, reconcile payment state from the provider, and never trust client totals or success redirects. Do not store card details.
- **Validation:** Add server-side Zod schemas and normalization for every write endpoint, CSRF protection where applicable, secure cookies, CSP/security headers, request size limits, rate limits and monitoring. The current checkout's HTML validation is not server-side validation.
- **Legal:** The policy pages are starter drafts, not legal advice. Replace them with accurate policies reviewed for your business, jurisdiction, data flows, shipping and refund rules. Add a real support contact before launch.

## Environment variables

See `.env.example`. Never commit `.env.local` or expose server-only secrets with a `NEXT_PUBLIC_` prefix. Do not launch until you connect the production domain with HTTPS, verify favicon/brand assets, configure all providers, use real product images, and complete security, accessibility and end-to-end tests.
