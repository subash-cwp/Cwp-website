import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Search, FileText, Briefcase, Loader2 } from "lucide-react";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  type: "blog" | "case_study";
  id: string;
  title: string;
  excerpt: string;
  slug: string;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setLoading(true);
      
      const [blogRes, caseRes] = await Promise.all([
        supabase
          .from("blog_posts")
          .select("id, title, excerpt, slug")
          .eq("published", true)
          .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
          .limit(5),
        supabase
          .from("case_studies")
          .select("id, title, description, slug")
          .eq("published", true)
          .or(`title.ilike.%${query}%,description.ilike.%${query}%,client.ilike.%${query}%`)
          .limit(5),
      ]);

      const searchResults: SearchResult[] = [
        ...(blogRes.data || []).map((p) => ({
          type: "blog" as const,
          id: p.id,
          title: p.title,
          excerpt: p.excerpt || "",
          slug: p.slug,
        })),
        ...(caseRes.data || []).map((c) => ({
          type: "case_study" as const,
          id: c.id,
          title: c.title,
          excerpt: c.description || "",
          slug: c.slug,
        })),
      ];

      setResults(searchResults);
      setLoading(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    onOpenChange(false);
    setQuery("");
    if (result.type === "blog") {
      navigate(`/blog/${result.slug}`);
    } else {
      navigate(`/case-studies/${result.slug}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blog posts and case studies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No results found</p>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors flex items-start gap-3"
                >
                  {result.type === "blog" ? (
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">{result.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{result.excerpt}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
