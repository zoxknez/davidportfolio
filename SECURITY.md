# Security Policy

## 🔒 Security Overview

This document outlines the security measures, best practices, and policies implemented in the David Knežević Fitness Coach Platform.

## 🛡️ Implemented Security Features

### 1. Content Security Policy (CSP)

Strict CSP headers prevent XSS attacks and unauthorized script execution:

```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com
style-src 'self' 'unsafe-inline'
img-src 'self' data: https: blob:
media-src 'self' https://commondatastorage.googleapis.com https://cdn.coverr.co
object-src 'none'
base-uri 'self'
form-action 'self'
upgrade-insecure-requests
```

### 2. HTTP Security Headers

All pages include enterprise-grade security headers:

- **Strict-Transport-Security**: Forces HTTPS
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME sniffing
- **X-XSS-Protection**: Browser XSS protection
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

### 3. Rate Limiting

API endpoints are protected with rate limiting:

- **Contact Form**: 5 requests/minute
- **Checkout**: 3 requests/minute (strict)
- **API Reads**: 60 requests/minute
- **API Writes**: 20 requests/minute

Implementation: In-memory LRU cache (upgrade to Redis for production scale)

### 4. Input Validation & Sanitization

All user inputs are validated and sanitized:

- **Zod Schemas**: Type-safe validation
- **XSS Protection**: Removes dangerous patterns
- **SQL Injection**: N/A (no direct database queries yet)
- **HTML Injection**: Stripped from all inputs
- **Script Tags**: Blocked in all forms

### 5. Payment Security

- **Luhn Algorithm**: Card number validation
- **No Storage**: Card data never stored (PCI DSS compliance)
- **HTTPS Only**: All payment forms require HTTPS
- **Tokenization**: Recommended for production (Stripe)

### 6. Environment Variables

- **Validation**: Zod schemas validate all env vars
- **Type Safety**: TypeScript types for env vars
- **Production Checks**: Required vars enforced in production
- **No Defaults**: Critical vars have no fallback in production

### 7. TypeScript Safety

- **Strict Mode**: Enabled
- **No Unchecked Index Access**: Prevents undefined errors
- **No Unused Parameters**: Clean code enforcement
- **No Implicit Returns**: Explicit return statements
- **Force Consistent Casing**: File naming consistency

## 🚨 Reporting Security Vulnerabilities

If you discover a security vulnerability, please follow these steps:

### DO:
1. **Email**: Send details to security@davidfitness.com
2. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. **Wait**: Allow 48 hours for initial response

### DON'T:
- ❌ Open public GitHub issues
- ❌ Disclose publicly before fix
- ❌ Exploit vulnerabilities

## ⚠️ Known Limitations

### Current Development Phase

1. **Demo Videos**: Using public Google Cloud Storage
   - **Risk**: Large file sizes, third-party dependency
   - **Mitigation**: Plan to migrate to Vercel Blob Storage
   - **Timeline**: Before production launch

2. **In-Memory Rate Limiting**: Not distributed
   - **Risk**: Resets on server restart
   - **Mitigation**: Acceptable for single-instance deployments
   - **Upgrade Path**: Redis for production scale

3. **No Database**: Using hardcoded data
   - **Risk**: No persistent storage
   - **Mitigation**: Temporary solution
   - **Timeline**: Database integration planned

4. **Payment Processing**: Simulated
   - **Risk**: No actual payment processing
   - **Mitigation**: Use Stripe/PayPal before production
   - **Timeline**: Before accepting real payments

## 🔐 Best Practices for Deployment

### Environment Setup

```bash
# Required in production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Highly recommended
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_token
```

### Pre-Production Checklist

- [ ] Set strong `NEXT_PUBLIC_SITE_URL`
- [ ] Enable error tracking (Sentry)
- [ ] Configure real payment gateway
- [ ] Set up database with backups
- [ ] Implement Redis for rate limiting
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerts
- [ ] Review and update CSP headers
- [ ] Run security audit (`npm audit`)
- [ ] Test rate limiting under load
- [ ] Verify all API endpoints require auth

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy with environment variables
vercel --prod \
  --env NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  --env NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## 🧪 Security Testing

### Manual Testing

```bash
# Check for vulnerabilities
npm audit

# Fix automatic vulnerabilities
npm audit fix

# Type checking
npm run type-check

# Linting
npm run lint
```

### Recommended Tools

- **OWASP ZAP**: Web application security scanner
- **npm audit**: Dependency vulnerability scanner
- **Snyk**: Continuous security monitoring
- **Lighthouse**: Security audit in Chrome DevTools

## 📋 Security Update Policy

### Dependency Updates

- **Critical**: Within 24 hours
- **High**: Within 1 week
- **Medium**: Within 1 month
- **Low**: Next release cycle

### Security Patches

Security patches are released as needed and communicated via:
- Email to stakeholders
- GitHub Security Advisories
- Project README

## 🔄 Security Review Schedule

| Review Type | Frequency |
|-------------|-----------|
| Dependency Audit | Weekly |
| Code Security Review | Monthly |
| Penetration Testing | Quarterly |
| Access Control Review | Quarterly |
| Incident Response Drill | Bi-annually |

## 📞 Security Contact

- **Email**: security@davidfitness.com
- **Response Time**: 48 hours for initial response
- **PGP Key**: Available upon request

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Vercel Security](https://vercel.com/docs/security)
- [PCI DSS Compliance](https://www.pcisecuritystandards.org/)

---

**Last Updated**: November 2025  
**Version**: 1.0.0

*This document is reviewed and updated quarterly to reflect the current security posture of the application.*

