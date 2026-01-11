# Garage Quote Generator

Generate PDF quotes from Garage fire truck listings. Paste a URL, get a PDF.

## What it does

Fire departments often need a paper quote to show their board before purchasing a truck. This app takes any [Garage](https://www.shopgarage.com) listing URL and generates a clean, printable PDF with all the vehicle details.

The tricky part was handling the listing descriptions - they're unstructured text with specs, features, and promotional copy all mixed together. The app parses these and formats them nicely (headers get bolded, key-value pairs get styled, etc).

## Running locally

```bash
git clone https://github.com/elkinal/garage-alexey-elkin.git
cd garage-alexey-elkin
npm install
npm run dev
```

Then open http://localhost:3000

## How it works

1. User pastes a Garage listing URL
2. App extracts the UUID from the URL
3. Calls Garage's API to get listing data
4. Fetches and compresses the listing image (some are 6MB+, had to use Sharp to resize them or the PDF library chokes)
5. Renders a PDF with react-pdf
6. Downloads to browser

## Project structure

```
app/
├── page.tsx                      # The main form UI
├── api/generate-invoice/route.tsx  # Does the actual PDF generation
├── components/InvoicePDF.tsx     # The PDF template
└── lib/
    ├── types.ts                  # TypeScript types for listing data
    └── utils.ts                  # Helper functions (UUID parsing, text cleanup, etc)
```

## Testing

```bash
npm test
```

Tests cover the utility functions - UUID extraction, text cleanup, feature type detection, etc.

## Tech

- Next.js 15
- @react-pdf/renderer for PDF generation
- Sharp for image compression
- TypeScript
- Tailwind for the web UI

## Notes

The Garage API doesn't have official docs, so I figured out the endpoints by inspecting network requests on their site. The main one is `GET /listings/{uuid}` on `garage-backend.onrender.com`.

Some listing images were failing to load in the PDF - turned out they were just too big. Fixed by fetching them server-side and compressing with Sharp before embedding.

The feature text parsing is regex-based and definitely not perfect, but it handles the common patterns I saw in the listings (ALL CAPS headers, "Key: Value" specs, etc).
