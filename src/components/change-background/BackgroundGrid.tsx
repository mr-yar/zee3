import { BackgroundThumbnail } from "./BackgroundThumbnail";
import { useBackgroundStore } from "@/stores/useBackgroundStore";

export function BackgroundGrid() {
  const backgrounds = useBackgroundStore((s) => s.backgrounds);

  return (
    <div className="px-5 pt-[38px]">
      <p className="font-semibold text-sm text-black leading-[1.2] mb-[10px]">
        Your backgrounds
      </p>
      <div className="grid grid-cols-3 gap-3">
        {backgrounds.map((bg) => (
          <BackgroundThumbnail
            key={bg.id}
            item={bg}
          />
        ))}
      </div>
    </div>
  );
}
