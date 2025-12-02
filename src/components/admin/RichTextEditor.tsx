import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, label = "Content", placeholder }: RichTextEditorProps) {
  const [mode, setMode] = useState<"visual" | "html">("visual");

  return (
    <div className="space-y-2" data-color-mode="dark">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "visual" | "html")} className="h-8">
          <TabsList className="h-8">
            <TabsTrigger value="visual" className="text-xs px-2 h-6">Visual</TabsTrigger>
            <TabsTrigger value="html" className="text-xs px-2 h-6">HTML</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {mode === "visual" ? (
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || "")}
          preview="edit"
          height={400}
          className="!bg-background"
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter HTML content..."}
          className="min-h-[400px] font-mono text-sm"
        />
      )}
      
      <p className="text-xs text-muted-foreground">
        {mode === "visual" 
          ? "Use Markdown syntax for formatting. Headers, bold, italic, links, lists, and code blocks are supported."
          : "Enter raw HTML content. Be careful with formatting."
        }
      </p>
    </div>
  );
}