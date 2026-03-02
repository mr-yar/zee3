import { create } from "zustand";
import type { BackgroundItem } from "@/types/background";
import imgBgThumb from "@/assets/images/bg-thumb.png";


interface BackgroundState {
  open: boolean;
  prompt: string;
  backgrounds: BackgroundItem[];
  promptHistory: string[];
  historyIndex: number;
  setOpen: (open: boolean) => void;
  setPrompt: (prompt: string) => void;
  undo: () => void;
  redo: () => void;
}

const initialPrompt =
  "Animate glowing rays pulsating from behind the bottle, leaves gently swaying, and golden sparkles floating upward for a natural, radiant effect.";

const initialBackgrounds: BackgroundItem[] = [
  {
    id: 1,
    loadingPercent: 25,
    loadingTimeLeft: "1 minute left",
  },
  {
    id: 2,
    src: imgBgThumb,
    isDefault: true,
  },
  {
    id: 3,
    src: imgBgThumb,

  },
  {
    id: 4,
    src: imgBgThumb,

  },
  {
    id: 5,
    src: imgBgThumb,

  },
  {
    id: 6,
    src: imgBgThumb,

  },
];

export const useBackgroundStore = create<BackgroundState>((set, get) => ({
  open: false,
  prompt: initialPrompt,
  backgrounds: initialBackgrounds,
  promptHistory: [initialPrompt],
  historyIndex: 0,

  setOpen: (open) => set({ open }),

  setPrompt: (prompt) => {
    const { promptHistory, historyIndex } = get();
    const newHistory = [...promptHistory.slice(0, historyIndex + 1), prompt];
    set({
      prompt,
      promptHistory: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },


  undo: () => {
    const { historyIndex, promptHistory } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ historyIndex: newIndex, prompt: promptHistory[newIndex] });
    }
  },

  redo: () => {
    const { historyIndex, promptHistory } = get();
    if (historyIndex < promptHistory.length - 1) {
      const newIndex = historyIndex + 1;
      set({ historyIndex: newIndex, prompt: promptHistory[newIndex] });
    }
  },
}));
