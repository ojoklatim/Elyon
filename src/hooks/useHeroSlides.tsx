import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface HeroSlide {
  id: string;
  image_url: string;
  title: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const useHeroSlides = (adminMode: boolean = false) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSlides();
  }, [adminMode]);

  const fetchSlides = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      let query = supabase
        .from("hero_slides")
        .select("*")
        .order("display_order", { ascending: true });

      if (!adminMode) {
        query = query.eq("is_visible", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSlides((data as HeroSlide[]) || []);
    } catch (error) {
      console.error("Error fetching hero slides:", error);
      toast({
        title: "Error",
        description: "Failed to load hero slides",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadSlide = async (file: File, title?: string) => {
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
      const filePath = `slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("hero-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("hero-images")
        .getPublicUrl(filePath);

      const maxOrder = slides.length > 0 
        ? Math.max(...slides.map(s => s.display_order)) 
        : 0;

      const { error: insertError } = await supabase
        .from("hero_slides")
        .insert({
          image_url: publicUrl,
          title: title || null,
          display_order: maxOrder + 1,
        });

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Hero slide uploaded successfully",
      });

      await fetchSlides();
      return { success: true };
    } catch (error) {
      console.error("Error uploading hero slide:", error);
      toast({
        title: "Error",
        description: "Failed to upload hero slide",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const updateSlide = async (id: string, updates: Partial<HeroSlide>) => {
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
        .from("hero_slides")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero slide updated successfully",
      });

      await fetchSlides();
      return { success: true };
    } catch (error) {
      console.error("Error updating hero slide:", error);
      toast({
        title: "Error",
        description: "Failed to update hero slide",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const deleteSlide = async (id: string, imageUrl: string) => {
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
      const urlParts = imageUrl.split("/hero-images/");
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from("hero-images").remove([filePath]);
      }

      const { error } = await supabase
        .from("hero_slides")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero slide deleted successfully",
      });

      await fetchSlides();
      return { success: true };
    } catch (error) {
      console.error("Error deleting hero slide:", error);
      toast({
        title: "Error",
        description: "Failed to delete hero slide",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const replaceSlideImage = async (id: string, oldImageUrl: string, newFile: File) => {
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
      const urlParts = oldImageUrl.split("/hero-images/");
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from("hero-images").remove([filePath]);
      }

      // Upload new image
      const fileExt = newFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("hero-images")
        .upload(filePath, newFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("hero-images")
        .getPublicUrl(filePath);

      // Update database record
      const { error: updateError } = await supabase
        .from("hero_slides")
        .update({ image_url: publicUrl })
        .eq("id", id);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "Hero slide image replaced successfully",
      });

      await fetchSlides();
      return { success: true, url: publicUrl };
    } catch (error) {
      console.error("Error replacing hero slide image:", error);
      toast({
        title: "Error",
        description: "Failed to replace hero slide image",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return {
    slides,
    loading,
    uploadSlide,
    updateSlide,
    deleteSlide,
    replaceSlideImage,
    refetch: fetchSlides,
  };
};
