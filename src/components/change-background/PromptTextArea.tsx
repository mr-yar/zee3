import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { IconUndo, IconRedo } from "@/components/icons";
import { iconAiColorSvg } from "@/lib/icons";
import { useBackgroundStore } from "@/stores/useBackgroundStore";

export function PromptTextArea() {
  const prompt = useBackgroundStore((s) => s.prompt);
  const setPrompt = useBackgroundStore((s) => s.setPrompt);

  const undo = useBackgroundStore((s) => s.undo);
  const redo = useBackgroundStore((s) => s.redo);
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className="font-semibold text-sm text-black leading-[1.2]">
        Background idea
      </label>
      <div className="bg-white border border-[#f2f4f6] flex flex-col items-center rounded-xl w-full overflow-hidden pt-4 relative">
        <div className="flex h-[116px] items-start px-4 w-full relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 text-sm text-black leading-[1.4] font-medium border-none shadow-none p-0 min-h-0 h-full resize-none focus-visible:ring-0 focus-visible:border-none bg-transparent"
          />
        </div>

        <div className="w-full">
          <div
            className="flex items-center justify-between pb-[9px] pl-[9px] pr-4 pt-5 rounded-b-xl w-full"
            style={{
              background:
                "linear-gradient(to top, white 69.841%, rgba(255,255,255,0))",
            }}
          >

            <Button
              variant="ghost"
              className="flex gap-1 items-center pl-[7px] pr-3 py-[7px] h-auto rounded-[10px] bg-transparent hover:bg-transparent transition-colors duration-150"
            >
              <img src={iconAiColorSvg} className="w-4 h-4" />
              <span className="font-semibold text-xs text-black leading-[1.2]">
                Regenerate
              </span>
            </Button>

            <div className="flex gap-2 items-center pl-2">
              <IconButton onClick={undo}><IconUndo /></IconButton>
              <IconButton onClick={redo}><IconRedo /></IconButton>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
