import { SITE, CONTACT } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | " + SITE.shortName,
  description: "Privacy Policy for " + SITE.name + " - How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 1, 2024";

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-32 pb-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-12">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  1. Introduction
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Welcome to {SITE.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to
                  protecting your personal information and your right to privacy. This
                  Privacy Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website or use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials (username and password)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Fitness goals and preferences</li>
                  <li>Communications and feedback you send to us</li>
                  <li>Usage data and website interactions</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Sending promotional communications (with your consent)</li>
                  <li>Personalizing your experience</li>
                  <li>Improving our website and services</li>
                  <li>Responding to your inquiries and support requests</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We do not sell, trade, or otherwise transfer your personal information
                  to outside parties except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>
                    <strong className="text-white">Service Providers:</strong> We may share
                    information with trusted third parties who assist us in operating our
                    website and conducting our business (e.g., Stripe for payments, Resend
                    for emails).
                  </li>
                  <li>
                    <strong className="text-white">Legal Requirements:</strong> We may
                    disclose information when required by law or to protect our rights.
                  </li>
                  <li>
                    <strong className="text-white">Business Transfers:</strong> In the event
                    of a merger or acquisition, your information may be transferred.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  5. Data Security
                </h2>
                <p className="text-white/70 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect
                  your personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission over the
                  Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  6. Cookies and Tracking
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Understand how you use our website</li>
                  <li>Improve your experience</li>
                  <li>Provide analytics (via Vercel Analytics)</li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-4">
                  You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  7. Your Rights
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  8. Data Retention
                </h2>
                <p className="text-white/70 leading-relaxed">
                  We retain your personal information only for as long as necessary to
                  fulfill the purposes outlined in this Privacy Policy, unless a longer
                  retention period is required by law. When data is no longer needed, we
                  will securely delete or anonymize it.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  9. Children&apos;s Privacy
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Our services are not intended for individuals under the age of 16. We do
                  not knowingly collect personal information from children. If you believe
                  we have collected information from a child, please contact us immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  10. Changes to This Policy
                </h2>
                <p className="text-white/70 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you
                  of any changes by posting the new Privacy Policy on this page and updating
                  the &quot;Last updated&quot; date. We encourage you to review this Privacy Policy
                  periodically.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  11. Contact Us
                </h2>
                <p className="text-white/70 leading-relaxed">
                  If you have questions about this Privacy Policy or our privacy practices,
                  please contact us at:
                </p>
                <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white font-medium">{SITE.name}</p>
                  <p className="text-white/70">Email: {CONTACT.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
