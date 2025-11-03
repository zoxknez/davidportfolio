# David Knežević - Fitness Coach Portfolio

A modern, high-performance fitness coaching platform built with cutting-edge web technologies. Features personalized training programs, coaching services, media gallery, and seamless checkout experience.

## 🚀 Features

### Core Functionality
- ✅ **Dynamic Training Programs** - Browse and purchase fitness programs
- ✅ **Interactive Quiz** - Personalized program recommendations
- ✅ **Coaching Services** - 1-on-1 and group coaching options
- ✅ **Media Gallery** - Training videos and photos
- ✅ **News & Articles** - Fitness insights and tips
- ✅ **Contact Forms** - Easy communication with rate limiting

### Technical Highlights
- ⚡ **Next.js 15** with App Router and Server Components
- 🎨 **Tailwind CSS 4** with custom design system
- 🔒 **Enterprise-grade Security** (CSP, XSS protection, rate limiting)
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **WCAG 2.1 AA Compliant** - Accessibility built-in
- 🎯 **SEO Optimized** - Dynamic sitemaps, meta tags, Open Graph
- 📊 **Performance Monitoring** - Web Vitals tracking
- 🔐 **Type-Safe** - TypeScript with strict mode
- 🧪 **API Layer** - RESTful API routes with validation
- 🚦 **Bundle Analysis** - Optimized build sizes

## 📋 Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 10.0.0

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/username/davidportfolio.git
cd davidportfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your values:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
davidportfolio/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API routes
│   │   ├── contact/          # Contact form API
│   │   ├── programs/         # Programs API
│   │   └── checkout/         # Checkout API
│   ├── coaching/             # Coaching pages
│   ├── programs/             # Training programs
│   ├── checkout/             # Checkout flow
│   ├── contact/              # Contact page
│   ├── media/                # Media gallery
│   ├── news/                 # News & articles
│   ├── quiz/                 # Program recommendation quiz
│   └── layout.tsx            # Root layout
├── components/               # Reusable React components
│   ├── ui/                   # Base UI components (buttons, etc.)
│   ├── hero.tsx              # Homepage hero
│   ├── program-card.tsx      # Program display card
│   └── ...                   # Other components
├── lib/                      # Utility functions
│   ├── constants.ts          # App-wide constants
│   ├── env.ts                # Environment validation
│   ├── rate-limit.ts         # Rate limiting utilities
│   ├── validations.ts        # Zod schemas
│   ├── web-vitals.ts         # Performance tracking
│   └── utils.ts              # Helper functions
├── types/                    # TypeScript type definitions
├── data/                     # Static data (programs, etc.)
├── hooks/                    # Custom React hooks
├── public/                   # Static assets
└── ...                       # Config files
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |
| `npm run analyze` | Analyze bundle size |

## 🌍 Environment Variables

### Required
- `NEXT_PUBLIC_SITE_URL` - Your site's public URL (required in production)

### Optional
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `SENTRY_AUTH_TOKEN` - Sentry build-time token
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `ANALYZE` - Enable bundle analyzer (`true`/`false`)

See `.env.example` for complete list.

## 🔐 Security Features

1. **Content Security Policy** - Prevents XSS attacks
2. **Rate Limiting** - API endpoint protection
3. **Input Sanitization** - XSS protection in forms
4. **Secure Headers** - HSTS, X-Frame-Options, etc.
5. **Zod Validation** - Type-safe form validation
6. **Luhn Algorithm** - Credit card validation

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with automatic code splitting
- **Images**: AVIF/WebP with responsive sizing
- **Fonts**: Optimized with `display: swap`
- **Lazy Loading**: Background videos and images

Run bundle analysis:
```bash
npm run analyze
```

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Skip-to-content link
- Proper ARIA labels
- Focus management

## 🧪 API Routes

### POST `/api/contact`
Submit contact form
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

### GET `/api/programs`
Get all programs (with optional filters)

Query params: `level`, `minWeeks`, `maxWeeks`, `daysPerWeek`

### GET `/api/programs/[slug]`
Get specific program by slug

### POST `/api/checkout`
Process program purchase
```json
{
  "name": "string",
  "email": "string",
  "card": "string",
  "expiry": "string",
  "cvv": "string",
  "programSlug": "string"
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/username/davidportfolio)

### Other Platforms

Build the application:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

## 🛡️ Security

See [SECURITY.md](./SECURITY.md) for security policies and best practices.

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private portfolio project. If you find issues, please contact the maintainer.

## 📧 Contact

- **Email**: david@fitnesscoach.com
- **Website**: [davidfitness.com](https://davidfitness.com)
- **Instagram**: [@davidfitness](https://instagram.com/davidfitness)

---

Built with ❤️ using Next.js 15, React 19, TypeScript, and Tailwind CSS
