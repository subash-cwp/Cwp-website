import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageContentRow {
  id: string;
  page_key: string;
  section_key: string;
  content: Record<string, any>;
  published: boolean;
}

export function usePageContent(pageKey: string) {
  return useQuery({
    queryKey: ["page_content", pageKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_content")
        .select("*")
        .eq("page_key", pageKey)
        .eq("published", true);
      if (error) throw error;
      const map: Record<string, Record<string, any>> = {};
      (data as PageContentRow[] | null)?.forEach((row) => {
        map[row.section_key] = row.content || {};
      });
      return map;
    },
    staleTime: 60_000,
  });
}

/** Read one section with a fallback object so the UI always renders. */
export function useSection<T extends Record<string, any>>(
  pageKey: string,
  sectionKey: string,
  fallback: T,
): T {
  const { data } = usePageContent(pageKey);
  const section = data?.[sectionKey];
  if (!section) return fallback;
  return { ...fallback, ...section } as T;
}
