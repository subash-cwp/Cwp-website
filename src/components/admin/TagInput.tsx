import { useState, KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export function TagInput({ label, value, onChange, placeholder = "Add tag and press Enter", suggestions = [] }: TagInputProps) {
  const [input, setInput] = useState("");

  const add = (raw: string) => {
    const tag = raw.trim().replace(/,$/, "").trim();
    if (!tag) return;
    if (value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const remove = (t: string) => onChange(value.filter((x) => x !== t));

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
      if (input.trim()) {
        e.preventDefault();
        add(input);
      }
    } else if (e.key === "Backspace" && !input && value.length) {
      remove(value[value.length - 1]);
    }
  };

  const filteredSuggestions = suggestions.filter((s) => s && !value.includes(s) && s.toLowerCase().includes(input.toLowerCase())).slice(0, 6);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5 min-h-10 focus-within:ring-1 focus-within:ring-ring">
        {value.map((t) => (
          <Badge key={t} variant="secondary" className="gap-1 pr-1">
            {t}
            <button type="button" onClick={() => remove(t)} className="rounded hover:bg-muted p-0.5" aria-label={`Remove ${t}`}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          onBlur={() => input.trim() && add(input)}
          placeholder={value.length ? "" : placeholder}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-1"
        />
      </div>
      {input && filteredSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {filteredSuggestions.map((s) => (
            <button key={s} type="button" onClick={() => add(s)} className="text-xs rounded-md border border-border px-2 py-1 hover:bg-muted">
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
