import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Vlog {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  category: string;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useVlogs = (includeHidden: boolean = false) => {
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchVlogs();
  }, [includeHidden]);

  const fetchVlogs = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      let query = supabase
        .from("vlogs")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!includeHidden) {
        query = query.eq("is_visible", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setVlogs(data || []);
    } catch (error) {
      console.error("Error fetching vlogs:", error);
      toast({
        title: "Error",
        description: "Failed to load vlogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addVlog = async (
    title: string,
    videoUrl: string,
    description?: string,
    category: string = "general",
    thumbnailUrl?: string
  ) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false, error: new Error("Supabase is not configured") };
    }
    try {
      const { error } = await supabase.from("vlogs").insert({
        title,
        video_url: videoUrl,
        description: description || null,
        category,
        thumbnail_url: thumbnailUrl || null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vlog added successfully",
      });

      await fetchVlogs();
      return { success: true };
    } catch (error) {
      console.error("Error adding vlog:", error);
      toast({
        title: "Error",
        description: "Failed to add vlog",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateVlog = async (id: string, updates: Partial<Vlog>) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false, error: new Error("Supabase is not configured") };
    }
    try {
      const { error } = await supabase
        .from("vlogs")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vlog updated successfully",
      });

      await fetchVlogs();
      return { success: true };
    } catch (error) {
      console.error("Error updating vlog:", error);
      toast({
        title: "Error",
        description: "Failed to update vlog",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteVlog = async (id: string) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false, error: new Error("Supabase is not configured") };
    }
    try {
      const { error } = await supabase.from("vlogs").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vlog deleted successfully",
      });

      await fetchVlogs();
      return { success: true };
    } catch (error) {
      console.error("Error deleting vlog:", error);
      toast({
        title: "Error",
        description: "Failed to delete vlog",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return {
    vlogs,
    loading,
    addVlog,
    updateVlog,
    deleteVlog,
    refetch: fetchVlogs,
  };
};
