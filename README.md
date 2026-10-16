# Arkansas Renewal

Next.js site for the Arkansas medical marijuana card plan in `Arkansas_Final_Sitemap.xlsx`.

The homepage sells **video renewals** for people who already have a card. A first certification is not offered by telemedicine. That follows 17 CAR 140-3201(b)(12) and the Decisions sheet.

## Run

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` before a real launch. Until then, full URLs use `https://your-arkansas-domain.com`.

## What is included

- All 123 URLs from the All URLs sheet, with the workbook paths and trailing slashes
- Header, footer, breadcrumbs, and the linking rules for each page type
- Homepage booking request, renewal calendar file, help search, city filter, qualification quiz, dispensary locator, and application checklist
- JSON-LD from the Schema sheet, with the gaps below left out on purpose
- Route check: `node scripts/qa-routes.mjs` against a running server
- Inventory: `docs/route-inventory.md`

## What is not live

See `docs/gaps-and-deployment.md`. Do not deploy this build as a clinic until the domain, scheduling provider, legal review, and open Decisions are settled.
