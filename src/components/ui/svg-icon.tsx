import { cn } from "@/lib/utils";

interface SvgIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  svg: string;
}

export function SvgIcon({ svg, className, ...props }: SvgIconProps) {
  return (
    <div className={cn("inline-flex items-center justify-center shrink-0", className)}>
      <img
        src={svg}
        className="w-full h-full"
        draggable={false}
        {...props}
      />
    </div>
  );
}
