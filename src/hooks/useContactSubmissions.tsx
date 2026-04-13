import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const submitContact = async (data: {
    full_name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
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
      const { error } = await supabase.from("contact_submissions").insert([data]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });

      return { success: true };
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
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
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Submission marked as ${status}`,
      });

      await fetchSubmissions();
      return { success: true };
    } catch (error) {
      console.error("Error updating submission status:", error);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const deleteSubmission = async (id: string) => {
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
        .from("contact_submissions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Submission has been deleted.",
      });

      await fetchSubmissions();
      return { success: true };
    } catch (error) {
      console.error("Error deleting submission:", error);
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  return {
    submissions,
    loading,
    submitContact,
    updateSubmissionStatus,
    deleteSubmission,
    refetch: fetchSubmissions,
  };
};
