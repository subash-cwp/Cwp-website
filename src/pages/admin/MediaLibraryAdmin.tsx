import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Trash2, Search, Image, FileText, Film, Copy, FolderOpen } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
  alt_text: string | null;
  tags: string[] | null;
  folder: string;
  created_at: string;
}

export default function MediaLibraryAdmin() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterFolder, setFilterFolder] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, [filterFolder]);

  const fetchMedia = async () => {
    setLoading(true);
    let query = supabase
      .from("media_library")
      .select("*")
      .order("created_at", { ascending: false });

    if (filterFolder !== "all") {
      query = query.eq("folder", filterFolder);
    }

    const { data } = await query;
    setMedia(data || []);
    setLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `media/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: `Error uploading ${file.name}`, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("media_library").insert([{
        file_name: file.name,
        file_path: urlData.publicUrl,
        file_type: file.type,
        file_size: file.size,
        folder: "general",
      }]);

      if (dbError) {
        toast({ title: `Error saving ${file.name} metadata`, variant: "destructive" });
      }
    }

    toast({ title: "Upload complete" });
    setUploading(false);
    fetchMedia();
    e.target.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete ${item.file_name}?`)) return;

    // Extract the path from the URL for storage deletion
    const path = item.file_path.split("/media/")[1];
    if (path) {
      await supabase.storage.from("media").remove([`media/${path}`]);
    }

    await supabase.from("media_library").delete().eq("id", item.id);
    toast({ title: "File deleted" });
    fetchMedia();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({ title: "URL copied to clipboard" });
  };

  const updateAltText = async (id: string, altText: string) => {
    await supabase.from("media_library").update({ alt_text: altText }).eq("id", id);
    toast({ title: "Alt text updated" });
    fetchMedia();
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="h-8 w-8 text-blue-500" />;
    if (type.startsWith("video/")) return <Film className="h-8 w-8 text-purple-500" />;
    return <FileText className="h-8 w-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const filteredMedia = media.filter(item =>
    item.file_name.toLowerCase().includes(search.toLowerCase()) ||
    (item.alt_text && item.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  const folders = [...new Set(media.map(m => m.folder))];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Media Library</h1>
            <p className="text-muted-foreground">{media.length} files</p>
          </div>
          <div className="flex gap-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleUpload}
            />
            <Button asChild disabled={uploading}>
              <label htmlFor="file-upload" className="cursor-pointer">
                {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                Upload Files
              </label>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterFolder} onValueChange={setFilterFolder}>
                <SelectTrigger className="w-40">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Folder" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  {folders.map(folder => (
                    <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="text-center py-12">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No files uploaded yet</p>
                <Button asChild variant="outline" className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload your first file
                  </label>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-muted rounded-lg overflow-hidden aspect-square cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.file_type.startsWith("image/") ? (
                      <img
                        src={item.file_path}
                        alt={item.alt_text || item.file_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getFileIcon(item.file_type)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); copyUrl(item.file_path); }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-xs text-white truncate">{item.file_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia?.file_name}</DialogTitle>
            </DialogHeader>
            {selectedMedia && (
              <div className="space-y-4">
                {selectedMedia.file_type.startsWith("image/") && (
                  <img
                    src={selectedMedia.file_path}
                    alt={selectedMedia.alt_text || selectedMedia.file_name}
                    className="w-full max-h-96 object-contain rounded-lg bg-muted"
                  />
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p>{selectedMedia.file_type}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Size</p>
                    <p>{formatFileSize(selectedMedia.file_size)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Folder</p>
                    <p>{selectedMedia.folder}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uploaded</p>
                    <p>{new Date(selectedMedia.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Alt Text (for SEO)</Label>
                  <Input
                    defaultValue={selectedMedia.alt_text || ""}
                    placeholder="Describe this image..."
                    onBlur={(e) => updateAltText(selectedMedia.id, e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>File URL</Label>
                  <div className="flex gap-2">
                    <Input value={selectedMedia.file_path} readOnly />
                    <Button variant="outline" onClick={() => copyUrl(selectedMedia.file_path)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}