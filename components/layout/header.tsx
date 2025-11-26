"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ROUTES, SITE } from "@/lib/constants";
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

const navigationItems = [
  { name: "Home", href: ROUTES.home, icon: Home },
  {
    name: "Training",
    icon: Dumbbell,
    children: [
      { name: "1-on-1 Coaching", href: ROUTES.coaching.oneOnOne, icon: User, description: "Personalized training plans" },
      { name: "Group Classes", href: ROUTES.coaching.group, icon: Users, description: "Train with a community" },
    ],
  },
  { name: "Programs", href: ROUTES.programs, icon: Sparkles },
  { name: "Media", href: ROUTES.media, icon: Play },
  { name: "News", href: ROUTES.news, icon: Newspaper },
  { name: "Contact", href: ROUTES.contact, icon: Mail },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const lastScrollY = useRef(0);

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
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 backdrop-blur-sm"
            >
              <Dumbbell className="h-5 w-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-white tracking-tight group-hover:text-white/80 transition-colors">
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
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        activeDropdown === item.name
                          ? "text-white bg-white/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
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
                          className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/50 overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "flex items-start gap-3 px-4 py-3 transition-colors",
                                isActive(child.href)
                                  ? "bg-white/10 text-white"
                                  : "text-white/70 hover:bg-white/5 hover:text-white"
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
                      "flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive(item.href)
                        ? "text-white bg-white/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
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
                className="text-white/70 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href="/auth/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link href="/auth/register">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
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
                className="w-full sm:w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 p-0"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile menu header */}
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
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
                                      ? "bg-white/10 text-white"
                                      : "text-white/70 hover:bg-white/5 hover:text-white"
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
                                  ? "bg-white/10 text-white"
                                  : "text-white/70 hover:bg-white/5 hover:text-white"
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
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="/auth/login">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                    <Button
                      className="w-full bg-white text-black hover:bg-white/90"
                      asChild
                    >
                      <Link href="/auth/register">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up Free
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
