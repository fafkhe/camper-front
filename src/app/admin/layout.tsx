"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Image,
  MessageSquare,
  ClipboardList,
  Video,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { label: "داشبورد", icon: LayoutDashboard, href: "/admin" },
  { label: "پروژه‌ها", icon: Image, href: "/admin/projects" },
  { label: "نظرات", icon: MessageSquare, href: "/admin/testimonials" },
  { label: "درخواست‌ها", icon: ClipboardList, href: "/admin/requests" },
  { label: "کاربران", icon: Users, href: "/admin/users" },
  { label: "ویدیوها", icon: Video, href: "/admin/videos" },
  { label: "تنظیمات", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!mounted) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 z-40 h-screen w-64 border-l bg-white shadow-sm transition-all duration-300",
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4 bg-gradient-to-l from-brand-50 to-white">
          <Link href="/admin" className="flex items-center gap-2 text-brand-700 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            آقای کمپر
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-brand-50 text-brand-700 shadow-sm border border-brand-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className={cn("w-5 h-5", active && "text-brand-600")} />
                {item.label}
              </Link>
            );
          })}
          <hr className="my-3" />
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            خروج
          </button>
        </nav>
      </aside>

      <div className="lg:mr-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white/95 backdrop-blur px-4 sm:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={handleLogout} className="hidden sm:flex">
            <LogOut className="w-4 h-4 ml-1" />
            خروج
          </Button>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
