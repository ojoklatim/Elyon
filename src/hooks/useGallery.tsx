import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const useGallery = (adminMode: boolean = false) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, [adminMode]);

  const fetchImages = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      let query = supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (!adminMode) {
        query = query.eq("is_visible", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, title: string, description: string, category: string) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false, error: new Error("Supabase is not configured") };
    }
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      const maxOrder = images.length > 0 
        ? Math.max(...images.map(img => img.display_order)) 
        : 0;

      const { error: insertError } = await supabase
        .from("gallery_images")
        .insert({
          title,
          description,
          image_url: publicUrl,
          category,
          display_order: maxOrder + 1,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      await fetchImages();
      return { success: true };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Error",
        description: error instanceof Error ? error.message : "Failed to upload gallery image. Please run storage_setup.sql.",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateImage = async (id: string, updates: Partial<GalleryImage>) => {
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
        .from("gallery_images")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image updated successfully",
      });

      await fetchImages();
      return { success: true };
    } catch (error) {
      console.error("Error updating image:", error);
      toast({
        title: "Update Error",
        description: error instanceof Error ? error.message : "Failed to update gallery image",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false, error: new Error("Supabase is not configured") };
    }
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split("/gallery/");
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from("gallery").remove([filePath]);
      }

      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      await fetchImages();
      return { success: true };
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const replaceImage = async (id: string, oldImageUrl: string, newFile: File) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false, error: new Error("Supabase is not configured") };
    }
    try {
      // Delete old image from storage
      const urlParts = oldImageUrl.split("/gallery/");
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from("gallery").remove([filePath]);
      }

      // Upload new image
      const fileExt = newFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(filePath, newFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(filePath);

      // Update database record
      const { error: updateError } = await supabase
        .from("gallery_images")
        .update({ image_url: publicUrl })
        .eq("id", id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Image replaced successfully",
      });

      await fetchImages();
      return { success: true, url: publicUrl };
    } catch (error) {
      console.error("Error replacing image:", error);
      toast({
        title: "Error",
        description: "Failed to replace image",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const getCategories = () => {
    const categories = new Set(images.map(img => img.category));
    return Array.from(categories);
  };

  return {
    images,
    loading,
    uploadImage,
    updateImage,
    deleteImage,
    replaceImage,
    getCategories,
    refetch: fetchImages,
  };
};
