"use client";

import { useState, useEffect, useRef } from "react";
import { Link, usePathname } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ROUTES, SITE } from "@/lib/constants";
import { useTranslations } from "next-intl";
import {
  Menu,
  X,
  Dumbbell,
  Users,
  User,
  Sparkles,
  Play,
  Newspaper,
  Mail,
  ChevronDown,
  Home,
  LogIn,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const navigationItems = [
    { name: t("common.home"), href: ROUTES.home, icon: Home },
    {
      name: t("common.training"),
      icon: Dumbbell,
      children: [
        { name: t("navigation.oneOnOne"), href: ROUTES.coaching.oneOnOne, icon: User, description: t("navigation.oneOnOneDesc") },
        { name: t("navigation.groupClasses"), href: ROUTES.coaching.group, icon: Users, description: t("navigation.groupClassesDesc") },
      ],
    },
    { name: t("common.programs"), href: ROUTES.programs, icon: Sparkles },
    { name: t("common.media"), href: ROUTES.media, icon: Play },
    { name: t("common.news"), href: ROUTES.news, icon: Newspaper },
    { name: t("common.contact"), href: ROUTES.contact, icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past 100px - hide
        setIsVisible(false);
      } else {
        // Scrolling up - show
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      data-site-header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
        isScrolled
          ? "border-b border-white/12 bg-[rgba(6,8,12,0.92)] shadow-2xl shadow-black/40 backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 8 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[oklch(0.66_0.22_31_/_0.4)] bg-[oklch(0.66_0.22_31_/_0.2)] backdrop-blur-sm shadow-lg shadow-[oklch(0.66_0.22_31_/_0.25)]"
            >
              <Dumbbell className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-black tracking-tight text-white transition-all duration-300 group-hover:text-white/90 group-hover:tracking-normal">
              {SITE.shortName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
                        activeDropdown === item.name
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:bg-white/[0.07] hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 transition-transform duration-200",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-2 w-64 overflow-hidden rounded-lg border border-white/10 bg-[rgba(6,8,12,0.96)] shadow-xl shadow-black/50 backdrop-blur-xl"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "flex items-start gap-3 px-4 py-3 transition-colors",
                                isActive(child.href)
                                  ? "bg-[oklch(0.79_0.16_170_/_0.1)] text-white"
                                  : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                              )}
                            >
                              <child.icon className="h-5 w-5 mt-0.5 shrink-0" />
                              <div>
                                <div className="font-medium">{child.name}</div>
                                <div className="text-xs text-white/50">{child.description}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                      isActive(item.href)
                        ? "bg-[oklch(0.79_0.16_170_/_0.15)] text-white shadow-lg shadow-[oklch(0.79_0.16_170_/_0.2)]"
                        : "text-white/70 hover:bg-white/[0.09] hover:text-white hover:shadow-md"
                    )}
                  >
                    <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            {/* Auth buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/auth/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t("common.login")}
                </Link>
              </Button>
              <Button
                size="sm"
                className="rounded-lg bg-[oklch(0.66_0.22_31)] text-white hover:bg-[oklch(0.72_0.22_31)]"
                asChild
              >
                <Link href="/auth/register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t("common.signUp")}
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full border-l border-white/10 bg-[rgba(6,8,12,0.97)] p-0 backdrop-blur-xl sm:w-80"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[oklch(0.66_0.22_31_/_0.18)]">
                        <Dumbbell className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-bold text-white">{SITE.shortName}</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white hover:bg-white/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile navigation links */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-1 px-3">
                      {navigationItems.map((item) => (
                        <div key={item.name}>
                          {item.children ? (
                            <div className="space-y-1">
                              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                                {item.name}
                              </div>
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                                    isActive(child.href)
                                      ? "bg-[oklch(0.79_0.16_170_/_0.12)] text-white"
                                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                  )}
                                >
                                  <child.icon className="h-5 w-5" />
                                  <div>
                                    <div className="font-medium">{child.name}</div>
                                    <div className="text-xs text-white/50">{child.description}</div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <Link
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                                  isActive(item.href)
                                    ? "bg-[oklch(0.79_0.16_170_/_0.12)] text-white"
                                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                )}
                            >
                              <item.icon className="h-5 w-5" />
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile auth buttons */}
                  <div className="p-4 border-t border-white/10 space-y-2">
                    <Button
                      variant="outline"
                      className="w-full rounded-lg border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="/auth/login">
                        <LogIn className="h-4 w-4 mr-2" />
                        {t("common.login")}
                      </Link>
                    </Button>
                    <Button
                      className="w-full rounded-lg bg-[oklch(0.66_0.22_31)] text-white hover:bg-[oklch(0.72_0.22_31)]"
                      asChild
                    >
                      <Link href="/auth/register">
                        <UserPlus className="h-4 w-4 mr-2" />
                        {t("common.signUpFree")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
