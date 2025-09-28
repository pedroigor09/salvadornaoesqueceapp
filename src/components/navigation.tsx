"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Heart, Home } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Painel de Dados", icon: Home },
  { href: "/memorial", label: "Memorial das Vítimas", icon: Heart },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Salvador Não Esquece
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white",
                  pathname === href && "text-white"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
        
        <p className="hidden text-sm text-white/60 sm:block">
          Em memória das vítimas da violência em Salvador/BA
        </p>
      </div>
    </header>
  );
}