import { Link, useLocation } from "wouter";
import { Home, IdCard, Briefcase, Award, Coins, MessageSquare, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: IdCard, label: "ID Card", href: "/digital-id" },
    { icon: Briefcase, label: "Jobs", href: "/jobs" },
    { icon: Coins, label: "Finance", href: "/finance" },
    { icon: Award, label: "Rewards", href: "/rewards" },
    { icon: MessageSquare, label: "Sahayak", href: "/ai-assistant" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:top-0 md:bottom-auto md:border-t-0 md:border-b md:pb-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-sm">
      <div className="container max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex justify-around md:justify-between items-center h-16 md:h-20">
          
          {/* Logo for Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">S</div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-600 font-display">
              Shramik-Setu
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-2 font-medium transition-colors hover:text-primary",
                location === item.href ? "text-primary" : "text-gray-500"
              )}>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Link href="/find-workers" className="px-4 py-2 rounded-full bg-accent text-white font-medium hover:bg-blue-900 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
              Employer
            </Link>
          </div>

          {/* Mobile Nav Items */}
          <div className="flex md:hidden w-full justify-between items-center px-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "flex flex-col items-center justify-center w-14 py-1 gap-1 transition-all duration-300",
                location === item.href 
                  ? "text-primary transform -translate-y-1" 
                  : "text-gray-400 hover:text-gray-600"
              )}>
                <div className={cn(
                  "p-1.5 rounded-xl transition-all",
                  location === item.href ? "bg-primary/10" : "bg-transparent"
                )}>
                  <item.icon className={cn("w-5 h-5", location === item.href && "stroke-[2.5px]")} />
                </div>
                <span className="text-[10px] font-medium truncate w-full text-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
