
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  User, 
  Gamepad, 
  Trophy, 
  BarChart3, 
  Settings, 
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    label: "Games",
    icon: Gamepad,
    href: "/games",
  },
  {
    label: "Achievements",
    icon: Trophy,
    href: "/achievements",
  },
  {
    label: "Stats",
    icon: BarChart3,
    href: "/stats",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/80"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-50 h-screen w-64 flex-shrink-0 flex flex-col",
          "bg-sidebar border-r border-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center justify-between border-b border-border">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-worldrep-accent-neon to-worldrep-blue bg-clip-text text-transparent">
              worldRep
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/20 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border">
          <Link
            to="/connect"
            className="flex items-center justify-center px-4 py-2 rounded-md border text-sm font-medium 
                      border-worldrep-accent-neon text-worldrep-accent-neon 
                      hover:bg-worldrep-accent-neon/10 transition-colors"
          >
            Connect Steam
          </Link>
        </div>
      </aside>
    </>
  );
}
