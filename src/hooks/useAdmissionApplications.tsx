import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdmissionApplication {
  id: string;
  parent_name: string;
  phone: string;
  email: string;
  child_name: string;
  child_age: number;
  program: string;
  preferred_campus: string;
  additional_info: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useAdmissionApplications = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchApplications = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("admission_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching admission applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const submitApplication = async (data: {
    parent_name: string;
    phone: string;
    email: string;
    child_name: string;
    child_age: number;
    program: string;
    preferred_campus: string;
    additional_info?: string;
  }) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false };
    }
    try {
      const { error } = await supabase.from("admission_applications").insert([data]);

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "Our admissions team will contact you within 24 hours.",
      });

      return { success: true };
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false };
    }
    try {
      const { error } = await supabase
        .from("admission_applications")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Application marked as ${status}`,
      });

      await fetchApplications();
      return { success: true };
    } catch (error) {
      console.error("Error updating application status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const deleteApplication = async (id: string) => {
    if (!supabase) {
      toast({
        title: "Error",
        description: "Supabase is not configured. Please set environment variables.",
        variant: "destructive",
      });
      return { success: false };
    }
    try {
      const { error } = await supabase
        .from("admission_applications")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Application has been deleted.",
      });

      await fetchApplications();
      return { success: true };
    } catch (error) {
      console.error("Error deleting application:", error);
      toast({
        title: "Error",
        description: "Failed to delete application.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  return {
    applications,
    loading,
    submitApplication,
    updateApplicationStatus,
    deleteApplication,
    refetch: fetchApplications,
  };
};
