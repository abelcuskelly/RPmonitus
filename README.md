# RPmonitus Website

A Next.js website for RPmonitus - Medicare Remote Patient Monitoring services.

## Features

- ✅ Conversion-optimized landing pages
- ✅ HIPAA-compliant data handling
- ✅ Medicare-compliant messaging
- ✅ Automated eligibility checking
- ✅ Secure enrollment process
- ✅ Mobile-responsive design
- ✅ SEO optimization
- ✅ Analytics tracking
- ✅ Email automation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Resend account (for emails)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables in `.env.local`:
- Supabase credentials
- Encryption key (generate with: `openssl rand -hex 32`)
- Resend API key
- Analytics keys (optional)

3. Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL schema from `lib/supabase.ts` in the Supabase SQL Editor

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
rpmonitus-website/
├── app/
│   ├── api/              # API routes
│   ├── eligibility/      # Eligibility check page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── HowItWorks.tsx
│   ├── Testimonials.tsx
│   ├── FAQ.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   └── EligibilityForm.tsx
├── lib/                  # Utility functions
│   └── supabase.ts       # Supabase client
└── public/               # Static assets
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- `ENCRYPTION_KEY`

Optional:
- `RESEND_API_KEY` (for emails)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (for analytics)
- `GA_API_SECRET` (for analytics)

## Security

- All PII/PHI is encrypted at rest using AES-256-GCM
- SSL/TLS for data in transit
- Row Level Security enabled in Supabase
- Security headers configured in `next.config.ts`

## License

Private - All rights reserved
