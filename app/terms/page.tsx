import { SITE, CONTACT } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | " + SITE.shortName,
  description: "Terms of Service for " + SITE.name + " - Rules and guidelines for using our services.",
};

export default function TermsPage() {
  const lastUpdated = "January 1, 2024";

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-32 pb-16 border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Terms of Service
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
                  1. Agreement to Terms
                </h2>
                <p className="text-white/70 leading-relaxed">
                  By accessing or using {SITE.name} (&quot;Service&quot;), you agree to be bound
                  by these Terms of Service. If you disagree with any part of the terms,
                  you may not access the Service. These Terms apply to all visitors, users,
                  and others who access or use the Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  2. Description of Service
                </h2>
                <p className="text-white/70 leading-relaxed">
                  {SITE.name} provides online fitness training programs, coaching services,
                  and related content. Our services include but are not limited to:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
                  <li>Digital workout programs</li>
                  <li>1-on-1 personal coaching sessions</li>
                  <li>Group training sessions</li>
                  <li>Nutrition guidance</li>
                  <li>Educational content and resources</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  3. Account Registration
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  To access certain features of the Service, you must register for an
                  account. When you register, you agree to:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your password and account</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  4. Purchases and Payments
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  All purchases are processed through Stripe, our secure payment provider.
                  By making a purchase, you agree that:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>You are authorized to use the payment method provided</li>
                  <li>All payment information you provide is accurate</li>
                  <li>Prices are subject to change without notice</li>
                  <li>We are not responsible for any fees charged by your bank</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  5. Refund Policy
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  We offer the following refund terms:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>
                    <strong className="text-white">Digital Programs:</strong> 14-day
                    money-back guarantee from the date of purchase.
                  </li>
                  <li>
                    <strong className="text-white">Coaching Packages:</strong> Refunds
                    available for unused sessions only. Used sessions are non-refundable.
                  </li>
                  <li>
                    <strong className="text-white">Group Sessions:</strong> Refunds available
                    if cancelled 48 hours before the session start time.
                  </li>
                </ul>
                <p className="text-white/70 leading-relaxed mt-4">
                  To request a refund, please contact us at {CONTACT.email}.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  6. Intellectual Property
                </h2>
                <p className="text-white/70 leading-relaxed">
                  The Service and its original content, features, and functionality are
                  and will remain the exclusive property of {SITE.name}. Our content is
                  protected by copyright, trademark, and other laws. You may not reproduce,
                  distribute, modify, create derivative works of, publicly display, or
                  exploit any of our content without prior written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  7. User Responsibilities
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  By using our Service, you agree to:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>Use the Service only for lawful purposes</li>
                  <li>Not share your account credentials with others</li>
                  <li>Not distribute or resell our programs without permission</li>
                  <li>Consult a physician before starting any exercise program</li>
                  <li>Not hold us liable for any injuries resulting from following our programs</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  8. Health Disclaimer
                </h2>
                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-4">
                  <p className="text-yellow-400 font-medium">Important Notice</p>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Our fitness programs and advice are intended for informational and
                  educational purposes only. They are not intended as medical advice.
                  Always consult with a qualified healthcare provider before beginning
                  any exercise or nutrition program. By using our Service, you acknowledge
                  that you are participating in physical activities at your own risk.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  9. Limitation of Liability
                </h2>
                <p className="text-white/70 leading-relaxed">
                  To the maximum extent permitted by law, {SITE.name} shall not be liable
                  for any indirect, incidental, special, consequential, or punitive damages,
                  or any loss of profits or revenues, whether incurred directly or indirectly,
                  or any loss of data, use, goodwill, or other intangible losses resulting
                  from your use of the Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  10. Cancellation of Services
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  You may cancel your account at any time by contacting us. We reserve
                  the right to suspend or terminate your account if:
                </p>
                <ul className="list-disc pl-6 text-white/70 space-y-2">
                  <li>You violate these Terms of Service</li>
                  <li>You engage in fraudulent activity</li>
                  <li>You share or distribute our content without permission</li>
                  <li>You create multiple accounts for abuse purposes</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  11. Changes to Terms
                </h2>
                <p className="text-white/70 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time.
                  If a revision is material, we will provide at least 30 days notice
                  prior to any new terms taking effect. What constitutes a material
                  change will be determined at our sole discretion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  12. Governing Law
                </h2>
                <p className="text-white/70 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the
                  laws of Serbia, without regard to its conflict of law provisions.
                  Any disputes arising from these Terms will be resolved in the courts
                  of Serbia.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  13. Contact Information
                </h2>
                <p className="text-white/70 leading-relaxed">
                  If you have any questions about these Terms, please contact us:
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
