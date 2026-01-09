import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  children: ReactNode;
  className?: string;
  variant?: "orange" | "green" | "blue" | "white";
  hoverEffect?: boolean;
}

export function GradientCard({ children, className, variant = "white", hoverEffect = true }: GradientCardProps) {
  const variants = {
    orange: "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    green: "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    white: "bg-white border-gray-100",
  };

  return (
    <div className={cn(
      "rounded-2xl border p-6 shadow-sm transition-all duration-300",
      variants[variant],
      hoverEffect && "hover:shadow-xl hover:-translate-y-1 hover:border-transparent",
      className
    )}>
      {children}
    </div>
  );
}
