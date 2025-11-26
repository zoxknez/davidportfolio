"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd, generateFAQSchema } from "@/lib/json-ld";

const faqCategories = [
  { id: "all", name: "All Questions" },
  { id: "programs", name: "Programs" },
  { id: "coaching", name: "Coaching" },
  { id: "pricing", name: "Pricing & Payment" },
  { id: "support", name: "Support" },
];

const faqs = [
  // Programs
  {
    category: "programs",
    question: "What equipment do I need for the training programs?",
    answer:
      "Most programs can be done with minimal equipment - typically dumbbells, a barbell with plates, and a pull-up bar. Each program specifies the exact equipment needed. We also offer equipment-free alternatives for many exercises.",
  },
  {
    category: "programs",
    question: "How long are the workout sessions?",
    answer:
      "Workout sessions typically range from 45-75 minutes depending on the program. Strength-focused programs tend to be longer due to rest periods, while HIIT sessions are shorter but more intense. Each workout includes a warm-up and cool-down.",
  },
  {
    category: "programs",
    question: "Can I do multiple programs at once?",
    answer:
      "We recommend focusing on one program at a time for optimal results. Each program is designed with specific volume and intensity that assumes it's your primary training. However, you can supplement with accessory work from other programs if needed.",
  },
  {
    category: "programs",
    question: "What if I miss a workout?",
    answer:
      "Life happens! If you miss a workout, simply pick up where you left off. For missed days, you can either skip them entirely or extend your program by a day. The key is consistency over perfection - don't try to 'make up' workouts by doubling up.",
  },
  {
    category: "programs",
    question: "Are the programs suitable for beginners?",
    answer:
      "We have programs for all fitness levels. Our Strength Fundamentals program is perfect for beginners, teaching proper form and building a solid foundation. Each program clearly states its difficulty level, so you can choose appropriately.",
  },

  // Coaching
  {
    category: "coaching",
    question: "How do 1-on-1 coaching sessions work?",
    answer:
      "Sessions are conducted via video call (Zoom or Google Meet). Before each session, you'll fill out a check-in form about your progress. During the session, we'll review your form, adjust your program, discuss nutrition, and address any questions. Sessions typically last 60 minutes.",
  },
  {
    category: "coaching",
    question: "How often will we have coaching calls?",
    answer:
      "Call frequency depends on your package. The Starter package includes 4 sessions over 1 month (weekly). The Transform package includes 12 sessions over 3 months (weekly). The Elite package includes 24 sessions over 6 months (weekly with extra check-ins).",
  },
  {
    category: "coaching",
    question: "What's included in the coaching packages?",
    answer:
      "All coaching packages include personalized programming, nutrition guidance, form corrections, and ongoing support. Higher-tier packages include more frequent check-ins, 24/7 messaging support, and additional resources like supplement protocols and detailed macro plans.",
  },
  {
    category: "coaching",
    question: "Can I switch between coaches?",
    answer:
      "Currently, all coaching is done directly by David. This ensures consistency and personalized attention throughout your journey. For group coaching, sessions are led by David with occasional guest coaches for specialized topics.",
  },
  {
    category: "coaching",
    question: "What if I need to reschedule a session?",
    answer:
      "You can reschedule with at least 24 hours notice without any penalty. Simply message us or use the booking system to select a new time. Sessions cancelled with less than 24 hours notice will count as used.",
  },

  // Pricing & Payment
  {
    category: "pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay through our secure Stripe payment system. All transactions are encrypted and secure.",
  },
  {
    category: "pricing",
    question: "Is there a refund policy?",
    answer:
      "Yes! We offer a 14-day money-back guarantee on all digital programs. If you're not satisfied, contact us within 14 days of purchase for a full refund. Coaching packages are refundable for unused sessions only.",
  },
  {
    category: "pricing",
    question: "Do you offer payment plans?",
    answer:
      "For coaching packages over $300, we offer split payment options. You can pay in 2-3 installments. Contact us directly to set up a payment plan that works for you.",
  },
  {
    category: "pricing",
    question: "Are there any discounts for multiple purchases?",
    answer:
      "Yes! We offer bundle discounts when purchasing multiple programs together. Newsletter subscribers also receive exclusive discount codes. Current and former coaching clients receive 20% off all programs.",
  },
  {
    category: "pricing",
    question: "Is access to programs lifetime?",
    answer:
      "Yes! Once you purchase a program, you have lifetime access to it, including any future updates. You can also download the PDFs and videos for offline use.",
  },

  // Support
  {
    category: "support",
    question: "How quickly will I get a response to my questions?",
    answer:
      "For general inquiries, we respond within 24-48 hours on business days. Coaching clients with messaging support receive responses within 12 hours. Urgent matters are prioritized and addressed as quickly as possible.",
  },
  {
    category: "support",
    question: "Can I get form checks if I'm not a coaching client?",
    answer:
      "Yes! You can submit form check videos through our contact form, and we'll provide feedback within 48 hours. For more detailed and ongoing form correction, we recommend our coaching packages.",
  },
  {
    category: "support",
    question: "What timezone are you in for scheduling?",
    answer:
      "We're based in Serbia (CET/CEST). However, we work with clients worldwide and offer flexible scheduling to accommodate different timezones. Early morning and late evening slots are available for international clients.",
  },
  {
    category: "support",
    question: "How can I contact you?",
    answer:
      "You can reach us through the contact form on our website, email us directly at david@elitefitness.com, or DM us on Instagram @davidfitness. We're active on all platforms and respond as quickly as possible.",
  },
  {
    category: "support",
    question: "Do you offer corporate or group rates?",
    answer:
      "Yes! We offer special rates for corporate wellness programs and group training. Contact us directly with your group size and needs, and we'll create a custom proposal.",
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Generate JSON-LD for all FAQs
  const faqSchemaData = faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  return (
    <>
      <JsonLd schema={generateFAQSchema(faqSchemaData)} />

      <main className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-white/60 max-w-2xl mx-auto mb-8"
            >
              Find answers to common questions about our programs, coaching, and
              services. Can't find what you're looking for? Reach out to us
              directly.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/10 transition-all"
              />
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-20 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.question)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-white/60 flex-shrink-0 transition-transform ${
                          openQuestions.includes(faq.question)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openQuestions.includes(faq.question) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-white/70 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60">
                  No questions found matching your search.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 border-t border-white/10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-white/60 max-w-md mx-auto mb-8">
                Can't find the answer you're looking for? Our team is here to
                help. Reach out and we'll get back to you as soon as possible.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-semibold rounded-xl"
                >
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
