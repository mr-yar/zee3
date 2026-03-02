import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "group bg-white size-[34px] rounded-[10px] hover:bg-[#f2f4f6] active:bg-[#e8ecf0] transition-colors duration-150 [&_svg:not([class*='size-'])]:size-5 [&_svg]:text-[#cad4dd] [&_svg]:group-hover:text-black [&_svg]:transition-colors [&_svg]:duration-150",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
