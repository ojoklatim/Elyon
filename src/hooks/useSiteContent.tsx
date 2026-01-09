import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteContent {
  id: string;
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
}

export const useSiteContent = (page?: string) => {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, [page]);

  const fetchContent = async () => {
    try {
      let query = supabase.from("site_content").select("*");
      
      if (page) {
        query = query.eq("page", page);
      }

      const { data, error } = await query;

      if (error) throw error;

      const contentMap: Record<string, Record<string, string>> = {};
      
      data?.forEach((item: SiteContent) => {
        const key = `${item.page}_${item.section}`;
        if (!contentMap[key]) {
          contentMap[key] = {};
        }
        contentMap[key][item.content_key] = item.content_value;
      });

      setContent(contentMap);
    } catch (error) {
      console.error("Error fetching site content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (section: string, key: string, defaultValue: string = "") => {
    const pageKey = page ? `${page}_${section}` : section;
    return content[pageKey]?.[key] || defaultValue;
  };

  const updateContent = async (
    targetPage: string,
    section: string,
    key: string,
    value: string,
    contentType: string = "text"
  ) => {
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert(
          {
            page: targetPage,
            section,
            content_key: key,
            content_value: value,
            content_type: contentType,
          },
          {
            onConflict: "page,section,content_key",
          }
        );

      if (error) throw error;
      
      await fetchContent();
      return { success: true };
    } catch (error) {
      console.error("Error updating content:", error);
      return { success: false, error };
    }
  };

  return { content, loading, getContent, updateContent, refetch: fetchContent };
};
