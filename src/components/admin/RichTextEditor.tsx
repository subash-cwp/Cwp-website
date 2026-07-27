import { useRef, useState } from "react";
import MDEditor, { commands, ICommand } from "@uiw/react-md-editor";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ImagePlus } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  folder?: string;
}

export function RichTextEditor({ value, onChange, label = "Content", placeholder, folder = "blog" }: RichTextEditorProps) {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const uploadAndInsert = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ variant: "destructive", title: "Please choose an image" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "Max 5MB" });
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${folder}/inline/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("media").getPublicUrl(path);
      const alt = window.prompt("Image alt text (for SEO/accessibility):", file.name.replace(/\.[^.]+$/, "")) || "";
      const caption = window.prompt("Optional caption (leave empty to skip):", "") || "";
      const md = caption
        ? `\n\n<figure>\n  <img src="${publicUrl}" alt="${alt.replace(/"/g, "&quot;")}" loading="lazy" />\n  <figcaption>${caption}</figcaption>\n</figure>\n\n`
        : `\n\n![${alt}](${publicUrl})\n\n`;
      onChange((value || "") + md);
      toast({ title: "Image inserted" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Upload failed", description: e.message });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const imageCommand: ICommand = {
    name: "inline-image",
    keyCommand: "inline-image",
    buttonProps: { "aria-label": "Insert image", title: "Upload & insert image" },
    icon: uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />,
    execute: () => fileRef.current?.click(),
  };

  return (
    <div className="space-y-2" data-color-mode="dark">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "visual" | "html")} className="h-8">
          <TabsList className="h-8">
            <TabsTrigger value="visual" className="text-xs px-2 h-6">Markdown</TabsTrigger>
            <TabsTrigger value="html" className="text-xs px-2 h-6">HTML</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadAndInsert(e.target.files[0])} />

      {mode === "visual" ? (
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || "")}
          preview="live"
          height={500}
          className="!bg-background"
          commands={[
            commands.bold, commands.italic, commands.strikethrough, commands.divider,
            commands.title1, commands.title2, commands.title3, commands.divider,
            commands.link, imageCommand, commands.quote, commands.code, commands.codeBlock, commands.divider,
            commands.unorderedListCommand, commands.orderedListCommand, commands.checkedListCommand, commands.divider,
            commands.table, commands.hr,
          ]}
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Enter HTML content..."}
          className="min-h-[500px] font-mono text-sm"
        />
      )}

      <p className="text-xs text-muted-foreground">
        {mode === "visual"
          ? "Markdown with live preview. Use the image button to upload inline images with alt text and captions."
          : "Raw HTML. Sanitised on render."}
      </p>
    </div>
  );
}
