import { EMOJI_LIST } from './emojis';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <div
      aria-label="Emoji picker"
      className="absolute bottom-full left-0 z-10 mb-1 grid max-h-60 w-60 grid-cols-6 gap-1 overflow-y-auto rounded-xl border border-border/50 bg-card p-2 shadow-lg"
    >
      {EMOJI_LIST.map((emoji) => (
        <button
          key={emoji}
          type="button"
          aria-label={`Insert ${emoji}`}
          onClick={() => onSelect(emoji)}
          className="flex h-8 w-8 select-none items-center justify-center rounded-lg text-lg transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span aria-hidden="true">{emoji}</span>
        </button>
      ))}
    </div>
  );
}
