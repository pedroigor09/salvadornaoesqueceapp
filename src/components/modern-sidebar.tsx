"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Heart, 
  Home, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar,
  Settings,
  HelpCircle,
  Crown,
  Clock
} from "lucide-react";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isActive?: boolean;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Heart, label: "Memorial", href: "/memorial" },
  { icon: Clock, label: "Timeline", href: "/timeline" },
  { icon: MapPin, label: "Mapa de Bairros", href: "/bairros" },
  { icon: HelpCircle, label: "Ajuda", href: "#" }
];

interface ModernSidebarProps {
  children: React.ReactNode;
}

export function ModernSidebar({ children }: ModernSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-gray-900 border-r border-gray-800 flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-red-500">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">Salvador</h1>
              <p className="text-gray-400 text-xs">Não Esquece</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {SIDEBAR_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm",
                  isActive 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Usuário</p>
              <p className="text-gray-400 text-xs truncate">Salvador/BA</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navigation - Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 z-50">
        <div className="flex justify-around items-center">
          {SIDEBAR_ITEMS.slice(0, 4).map((item, index) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200",
                  isActive 
                    ? "text-blue-400" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="md:hidden flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-red-500">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-sm">Salvador</h1>
                <p className="text-gray-400 text-xs">Não Esquece</p>
              </div>
            </div>
            <div className="hidden md:block">
              <h2 className="text-white text-xl font-semibold">
                Dashboard de Violência
              </h2>
              <p className="text-gray-400 text-sm">
                Dados em tempo real da SSP-BA
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white text-sm font-medium">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
                <p className="text-gray-400 text-xs">
                  Última atualização
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-950 p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </div>
      </main>
    </div>
  );
}