import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SchoolLocation {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  email: string | null;
  google_maps_url: string | null;
  google_maps_embed: string | null;
  is_visible: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export const useSchoolLocations = (adminMode: boolean = false) => {
  const [locations, setLocations] = useState<SchoolLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLocations = async () => {
    try {
      let query = supabase
        .from("school_locations")
        .select("*")
        .order("display_order", { ascending: true });

      // In admin mode, fetch all; otherwise, filter by visibility
      if (!adminMode) {
        query = query.eq("is_visible", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error fetching school locations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [adminMode]);

  const addLocation = async (data: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    google_maps_url?: string;
    google_maps_embed?: string;
    is_visible?: boolean;
    display_order?: number;
  }) => {
    try {
      const { error } = await supabase.from("school_locations").insert([data]);

      if (error) throw error;

      toast({
        title: "Location added",
        description: "School location has been added successfully.",
      });

      await fetchLocations();
      return { success: true };
    } catch (error) {
      console.error("Error adding location:", error);
      toast({
        title: "Error",
        description: "Failed to add location.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const updateLocation = async (id: string, data: Partial<SchoolLocation>) => {
    try {
      const { error } = await supabase
        .from("school_locations")
        .update(data)
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Location updated",
        description: "School location has been updated.",
      });

      await fetchLocations();
      return { success: true };
    } catch (error) {
      console.error("Error updating location:", error);
      toast({
        title: "Error",
        description: "Failed to update location.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const deleteLocation = async (id: string) => {
    try {
      const { error } = await supabase
        .from("school_locations")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Location has been deleted.",
      });

      await fetchLocations();
      return { success: true };
    } catch (error) {
      console.error("Error deleting location:", error);
      toast({
        title: "Error",
        description: "Failed to delete location.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  return {
    locations,
    loading,
    addLocation,
    updateLocation,
    deleteLocation,
    refetch: fetchLocations,
  };
};
