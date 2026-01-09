import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Blog {
  id: string;
  title: string;
  content: string | null;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlogs = (includeUnpublished: boolean = false) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogs();
  }, [includeUnpublished]);

  const fetchBlogs = async () => {
    try {
      let query = supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!includeUnpublished) {
        query = query.eq("published", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadCoverImage = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blogs")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("blogs")
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl };
    } catch (error) {
      console.error("Error uploading cover image:", error);
      return { success: false, url: null, error };
    }
  };

  const addBlog = async (
    title: string,
    content: string,
    coverImage?: string | null,
    published: boolean = false
  ) => {
    try {
      const { error } = await supabase.from("blogs").insert({
        title,
        content,
        cover_image: coverImage || null,
        published,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully",
      });

      await fetchBlogs();
      return { success: true };
    } catch (error) {
      console.error("Error adding blog:", error);
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateBlog = async (id: string, updates: Partial<Blog>) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });

      await fetchBlogs();
      return { success: true };
    } catch (error) {
      console.error("Error updating blog:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteBlog = async (id: string, coverImageUrl?: string | null) => {
    try {
      // Delete cover image from storage if exists
      if (coverImageUrl) {
        const urlParts = coverImageUrl.split("/blogs/");
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          await supabase.storage.from("blogs").remove([filePath]);
        }
      }

      const { error } = await supabase.from("blogs").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });

      await fetchBlogs();
      return { success: true };
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return {
    blogs,
    loading,
    addBlog,
    updateBlog,
    deleteBlog,
    uploadCoverImage,
    refetch: fetchBlogs,
  };
};
