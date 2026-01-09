import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePageImages = () => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File, page: string, section: string) => {
    setUploading(true);
    
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${page}/${section}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("page-images")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("page-images")
        .getPublicUrl(fileName);

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      return { success: true, url: urlData.publicUrl };
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return { success: false, url: null };
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};
