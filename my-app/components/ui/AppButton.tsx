import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function AppButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className,
}: AppButtonProps) {
  const base = "font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer";

  const variants = {
    primary: "bg-glow text-base hover:brightness-110 hover:shadow-[0_0_20px_#18B6E6aa]",
    outline: "bg-transparent border-2 border-glow text-glow hover:bg-glow hover:text-base hover:shadow-[0_0_20px_#18B6E6aa]",
  };

  const sizes = {
    xs: "px-4 py-1.5 text-xs",
    sm: "px-6 py-2 text-sm",
    md: "px-10 py-3 text-sm",
    lg: "px-14 py-4 text-base",
  };

  return (
    <Button
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Button>
  );
}