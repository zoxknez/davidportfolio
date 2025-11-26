"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Dumbbell,
  Calendar,
  ShoppingBag,
  Settings,
  User,
  TrendingUp,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Programs", href: "/dashboard/programs", icon: Dumbbell },
  { name: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface DashboardSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-black/90 backdrop-blur-xl border-r border-white/10 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {!isCollapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20">
                  <Dumbbell className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white">Dashboard</span>
              </Link>
            )}
            
            <div className="flex items-center gap-2">
              {/* Mobile close button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
              
              {/* Collapse button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex text-white hover:bg-white/10"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronLeft className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                      isActive(item.href)
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                    {isActive(item.href) && !isCollapsed && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User section */}
          <div className="border-t border-white/10 p-4">
            {!isCollapsed && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-white/50 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
              className={cn(
                "w-full text-white/60 hover:text-white hover:bg-white/10",
                isCollapsed ? "px-3" : ""
              )}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="ml-2">Sign Out</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile menu button (rendered in header) */}
    </>
  );
}
