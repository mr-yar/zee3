import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import type { BackgroundItem } from "@/types/background";

interface BackgroundThumbnailProps {
  item: BackgroundItem;
  onClick?: () => void;
}

export function BackgroundThumbnail({ item, onClick }: BackgroundThumbnailProps) {
  if (!item.src) {
    return (
      <div className="relative rounded-xl overflow-hidden aspect-[112/198] cursor-pointer">
        <div className="absolute inset-0 bg-black rounded-xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span className="text-white text-sm font-medium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {item.loadingPercent}%
          </span>
        </div>
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap">
          {item.loadingTimeLeft}
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden aspect-[112/198] cursor-pointer transition-all duration-150",
        item.isDefault
          ? "border-2 border-black rounded-[16px]"
          : "rounded-xl"
      )}
    >
      <OptimizedImage
        src={item.src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {item.isDefault && (
        <div className="absolute top-2 left-2">
          <Badge
            variant="outline"
            className="backdrop-blur-[7.5px] bg-white border-black/5 rounded-[5px] px-1 py-1.5 text-[10px] font-bold text-[#404040] uppercase leading-normal"
          >
            default
          </Badge>
        </div>
      )}
    </div>
  );
}
