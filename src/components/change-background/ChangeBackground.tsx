import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SvgIcon } from "@/components/ui/svg-icon";
import { iconCloseSvg, iconAiColor2Svg, iconArrowSvg } from "@/lib/icons";
import { PromptTextArea } from "./PromptTextArea";
import { BackgroundGrid } from "./BackgroundGrid";
import { useBackgroundStore } from "@/stores/useBackgroundStore";
import { useRef, useState, useCallback, useEffect } from "react";

export function ChangeBackground() {
  const open = useBackgroundStore((s) => s.open);
  const setOpen = useBackgroundStore((s) => s.setOpen);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(134);
  const [showThumb, setShowThumb] = useState(false);

  const TRACK_INSET = 8;

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) {
      setShowThumb(false);
      return;
    }
    setShowThumb(true);
    const trackHeight = clientHeight - TRACK_INSET * 2;
    const ratio = clientHeight / scrollHeight;
    const height = Math.max(ratio * trackHeight, 30);
    const maxTop = trackHeight - height;
    const top = TRACK_INSET + (scrollTop / (scrollHeight - clientHeight)) * maxTop;
    setThumbHeight(height);
    setThumbTop(top);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(updateThumb);
    }
  }, [open, updateThumb]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[400px] sm:max-w-[400px] p-0 gap-0 border-none"
      >
        {showThumb && (
          <div
            className="absolute right-1 w-1 bg-[#cad4dd] rounded-[10px] z-10 transition-[top,height] duration-150"
            style={{ top: thumbTop, height: thumbHeight }}
          />
        )}

        <div
          ref={scrollRef}
          onScroll={updateThumb}
          className="flex-1 overflow-y-auto scrollbar-none"
        >
          <SheetHeader className="flex-row items-center justify-between px-5 pt-8 pb-0 gap-0 space-y-0">
            <SheetTitle className="text-[22px] font-bold text-black leading-[1.2]">
              Change background
            </SheetTitle>
            <SheetDescription className="sr-only">
              Change the background of your video
            </SheetDescription>
            <button
              onClick={() => setOpen(false)}
              className="p-0 border-none bg-transparent cursor-pointer shrink-0"
            >
              <SvgIcon svg={iconCloseSvg} className="w-6 h-6 text-black" />
            </button>
          </SheetHeader>

          <div className="flex flex-col gap-6 px-5 pt-[24px]">
            <PromptTextArea />

            <div className="flex flex-col gap-3 items-center w-full">
              <Button
                className="group bg-black h-12 px-7 rounded-full w-full gap-2 hover:bg-[#3d3d3d] transition-all duration-150"
              >
                <img src={iconAiColor2Svg} className="w-4 h-4 block group-active:hidden" />
                <img src={iconArrowSvg} className="w-4 h-4 hidden group-active:block" />
                <span className="font-semibold text-sm group-active:text-[13.2px] text-white leading-[0.8]">
                  Generate BG for 1 credit
                </span>
              </Button>
            </div>
          </div>

          <BackgroundGrid />

          <div className="h-8" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
