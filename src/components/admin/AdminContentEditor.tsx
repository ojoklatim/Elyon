import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSiteContent } from "@/hooks/useSiteContent";
import { usePageImages } from "@/hooks/usePageImages";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, RefreshCw, Upload, Image as ImageIcon, X, Replace } from "lucide-react";

interface ContentSection {
  section: string;
  label: string;
  fields: {
    key: string;
    label: string;
    type: "text" | "textarea" | "image";
    placeholder?: string;
  }[];
}

const PAGE_CONTENT_STRUCTURE: Record<string, ContentSection[]> = {
  home: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Welcome to Elyon Kindergarten and Primary School" },
        { key: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Nurturing young minds..." },
        { key: "button1_text", label: "Primary Button Text", type: "text", placeholder: "Enroll Your Child" },
        { key: "background_image", label: "Background Image", type: "image" },
      ],
    },
    {
      section: "about_snippet",
      label: "About Snippet",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Building Bright Futures" },
        { key: "description", label: "Description", type: "textarea", placeholder: "At Elyon..." },
      ],
    },
    {
      section: "why_choose",
      label: "Why Choose Us Section",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Why Choose Elyon School?" },
        { key: "card1_title", label: "Card 1 Title", type: "text", placeholder: "Quality Education" },
        { key: "card1_desc", label: "Card 1 Description", type: "text", placeholder: "Comprehensive curriculum..." },
        { key: "card2_title", label: "Card 2 Title", type: "text", placeholder: "Christian Values" },
        { key: "card2_desc", label: "Card 2 Description", type: "text", placeholder: "Education grounded in faith..." },
        { key: "card3_title", label: "Card 3 Title", type: "text", placeholder: "Caring Teachers" },
        { key: "card3_desc", label: "Card 3 Description", type: "text", placeholder: "Dedicated educators..." },
        { key: "card4_title", label: "Card 4 Title", type: "text", placeholder: "Two Campuses" },
        { key: "card4_desc", label: "Card 4 Description", type: "text", placeholder: "Convenient locations..." },
      ],
    },
    {
      section: "programs",
      label: "Programs Preview",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Our Programs" },
        { key: "kindergarten_title", label: "Kindergarten Title", type: "text", placeholder: "Kindergarten" },
        { key: "kindergarten_desc", label: "Kindergarten Description", type: "text", placeholder: "Baby Class, Nursery..." },
        { key: "kindergarten_image", label: "Kindergarten Image", type: "image" },
        { key: "primary_title", label: "Primary Title", type: "text", placeholder: "Primary School" },
        { key: "primary_desc", label: "Primary Description", type: "text", placeholder: "Primary 1 through 7..." },
        { key: "primary_image", label: "Primary Image", type: "image" },
      ],
    },
    {
      section: "cta",
      label: "Call to Action",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Ready to Join Our Community?" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Give your child the gift..." },
      ],
    },
  ],
  about: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "About Elyon School" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "A legacy of excellence..." },
      ],
    },
    {
      section: "mission",
      label: "Mission",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Our Mission" },
        { key: "description", label: "Description", type: "textarea", placeholder: "To provide quality..." },
      ],
    },
    {
      section: "vision",
      label: "Vision",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Our Vision" },
        { key: "description", label: "Description", type: "textarea", placeholder: "To be the leading..." },
      ],
    },
    {
      section: "values",
      label: "Values",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Our Values" },
        { key: "description", label: "Description", type: "textarea", placeholder: "Excellence, Integrity..." },
      ],
    },
    {
      section: "story",
      label: "Our Story",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Our Story" },
        { key: "paragraph1", label: "Paragraph 1", type: "textarea", placeholder: "Elyon was founded..." },
        { key: "paragraph2", label: "Paragraph 2", type: "textarea", placeholder: "From our humble beginnings..." },
        { key: "paragraph3", label: "Paragraph 3", type: "textarea", placeholder: "Under the leadership..." },
        { key: "story_image", label: "Story Image", type: "image" },
      ],
    },
    {
      section: "leadership",
      label: "Leadership",
      fields: [
        { key: "name", label: "Principal Name", type: "text", placeholder: "Winfred Atwongire Namanya" },
        { key: "title", label: "Title", type: "text", placeholder: "Principal & Director" },
        { key: "bio", label: "Biography", type: "textarea", placeholder: "With years of experience..." },
        { key: "photo", label: "Principal Photo", type: "image" },
      ],
    },
    {
      section: "philosophy",
      label: "Educational Philosophy",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Our Educational Philosophy" },
        { key: "card1_title", label: "Card 1 Title", type: "text", placeholder: "Child-Centered Learning" },
        { key: "card1_desc", label: "Card 1 Description", type: "textarea" },
        { key: "card2_title", label: "Card 2 Title", type: "text", placeholder: "Holistic Development" },
        { key: "card2_desc", label: "Card 2 Description", type: "textarea" },
        { key: "card3_title", label: "Card 3 Title", type: "text", placeholder: "Christian Foundation" },
        { key: "card3_desc", label: "Card 3 Description", type: "textarea" },
        { key: "card4_title", label: "Card 4 Title", type: "text", placeholder: "Excellence in Education" },
        { key: "card4_desc", label: "Card 4 Description", type: "textarea" },
      ],
    },
    {
      section: "organogram",
      label: "Institutional Organogram",
      fields: [
        { key: "director_name", label: "Executive Director Name", type: "text", placeholder: "Director's Office" },
        { key: "director_photo", label: "Executive Director Photo", type: "image" },
        { key: "principal_name", label: "Principal Name", type: "text", placeholder: "Principal's Office" },
        { key: "principal_photo", label: "Principal Photo", type: "image" },
        
        { key: "mutungo_headmaster_name", label: "Mutungo Headmaster Name", type: "text", placeholder: "Mutungo Head" },
        { key: "mutungo_headmaster_photo", label: "Mutungo Headmaster Photo", type: "image" },
        { key: "mutungo_admin_name", label: "Mutungo Deputy Admin Name", type: "text" },
        { key: "mutungo_admin_photo", label: "Mutungo Deputy Admin Photo", type: "image" },
        { key: "mutungo_curriculum_name", label: "Mutungo Curriculum Head Name", type: "text" },
        { key: "mutungo_curriculum_photo", label: "Mutungo Curriculum Head Photo", type: "image" },
        { key: "mutungo_academics_name", label: "Mutungo Deputy Academics Name", type: "text" },
        { key: "mutungo_academics_photo", label: "Mutungo Deputy Academics Photo", type: "image" },

        { key: "nsangi_headmaster_name", label: "Nsangi Headmaster Name", type: "text", placeholder: "Nsangi Head" },
        { key: "nsangi_headmaster_photo", label: "Nsangi Headmaster Photo", type: "image" },
        { key: "nsangi_admin_name", label: "Nsangi Deputy Admin Name", type: "text" },
        { key: "nsangi_admin_photo", label: "Nsangi Deputy Admin Photo", type: "image" },
        { key: "nsangi_curriculum_name", label: "Nsangi Curriculum Head Name", type: "text" },
        { key: "nsangi_curriculum_photo", label: "Nsangi Curriculum Head Photo", type: "image" },
        { key: "nsangi_academics_name", label: "Nsangi Deputy Academics Name", type: "text" },
        { key: "nsangi_academics_photo", label: "Nsangi Deputy Academics Photo", type: "image" },
      ],
    },
  ],
  programs: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Our Programs" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Comprehensive education programs..." },
      ],
    },
    {
      section: "kindergarten",
      label: "Kindergarten Program",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Kindergarten Program" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Kindergarten Image", type: "image" },
        { key: "baby_class_title", label: "Baby Class Title", type: "text", placeholder: "Baby Class (Ages 2-3)" },
        { key: "baby_class_desc", label: "Baby Class Description", type: "textarea" },
        { key: "nursery_title", label: "Nursery Title", type: "text", placeholder: "Nursery (Ages 3-5)" },
        { key: "nursery_desc", label: "Nursery Description", type: "textarea" },
      ],
    },
    {
      section: "primary",
      label: "Primary Program",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Primary School Program" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Primary Image", type: "image" },
        { key: "lower_title", label: "Lower Primary Title", type: "text", placeholder: "Lower Primary (P1-P3)" },
        { key: "lower_desc", label: "Lower Primary Description", type: "textarea" },
        { key: "upper_title", label: "Upper Primary Title", type: "text", placeholder: "Upper Primary (P4-P7)" },
        { key: "upper_desc", label: "Upper Primary Description", type: "textarea" },
      ],
    },
    {
      section: "features",
      label: "Special Features",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "What Makes Our Programs Special" },
        { key: "feature1_title", label: "Feature 1 Title", type: "text", placeholder: "Language Focus" },
        { key: "feature1_desc", label: "Feature 1 Description", type: "text" },
        { key: "feature2_title", label: "Feature 2 Title", type: "text", placeholder: "Biblical Studies" },
        { key: "feature2_desc", label: "Feature 2 Description", type: "text" },
        { key: "feature3_title", label: "Feature 3 Title", type: "text", placeholder: "Creative Arts" },
        { key: "feature3_desc", label: "Feature 3 Description", type: "text" },
        { key: "feature4_title", label: "Feature 4 Title", type: "text", placeholder: "Music & Movement" },
        { key: "feature4_desc", label: "Feature 4 Description", type: "text" },
      ],
    },
    {
      section: "cta",
      label: "Call to Action",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Ready to Enroll Your Child?" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
  campuses: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Our Campuses" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Two convenient locations..." },
      ],
    },
    {
      section: "mutungo",
      label: "Mutungo Campus",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Mutungo Campus" },
        { key: "address", label: "Address", type: "text", placeholder: "Mutungo, Kampala, Uganda" },
        { key: "phone", label: "Phone", type: "text", placeholder: "+256 XXX XXXXXX" },
        { key: "email", label: "Email", type: "text", placeholder: "mutungo@elyonschool.com" },
        { key: "hours", label: "School Hours", type: "text", placeholder: "Monday - Friday: 7:30 AM - 4:00 PM" },
        { key: "image", label: "Campus Image", type: "image" },
        { key: "facilities_title", label: "Facilities Title", type: "text", placeholder: "Campus Facilities" },
        { key: "facility1", label: "Facility 1", type: "text", placeholder: "Modern, well-equipped classrooms" },
        { key: "facility2", label: "Facility 2", type: "text", placeholder: "Safe outdoor play areas" },
        { key: "facility3", label: "Facility 3", type: "text", placeholder: "Computer lab and library" },
        { key: "facility4", label: "Facility 4", type: "text", placeholder: "Dining facilities" },
        { key: "facility5", label: "Facility 5", type: "text", placeholder: "Sports and recreation areas" },
      ],
    },
    {
      section: "nsangi",
      label: "Nsangi Campus",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Nsangi Campus" },
        { key: "address", label: "Address", type: "text", placeholder: "Nsangi, Wakiso District, Uganda" },
        { key: "phone", label: "Phone", type: "text", placeholder: "+256 XXX XXXXXX" },
        { key: "email", label: "Email", type: "text", placeholder: "nsangi@elyonschool.com" },
        { key: "hours", label: "School Hours", type: "text", placeholder: "Monday - Friday: 7:30 AM - 4:00 PM" },
        { key: "image", label: "Campus Image", type: "image" },
        { key: "facilities_title", label: "Facilities Title", type: "text", placeholder: "Campus Facilities" },
        { key: "facility1", label: "Facility 1", type: "text", placeholder: "Spacious learning environments" },
        { key: "facility2", label: "Facility 2", type: "text", placeholder: "Large playground and gardens" },
        { key: "facility3", label: "Facility 3", type: "text", placeholder: "Science and computer labs" },
        { key: "facility4", label: "Facility 4", type: "text", placeholder: "Multipurpose hall" },
        { key: "facility5", label: "Facility 5", type: "text", placeholder: "Ample parking space" },
      ],
    },
    {
      section: "cta",
      label: "Call to Action",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Visit Our Campuses" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
  admissions: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Admissions" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Join the Elyon School family..." },
      ],
    },
    {
      section: "process",
      label: "Enrollment Process",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Enrollment Process" },
        { key: "step1_title", label: "Step 1 Title", type: "text", placeholder: "Submit Inquiry" },
        { key: "step1_desc", label: "Step 1 Description", type: "text" },
        { key: "step2_title", label: "Step 2 Title", type: "text", placeholder: "Schedule Visit" },
        { key: "step2_desc", label: "Step 2 Description", type: "text" },
        { key: "step3_title", label: "Step 3 Title", type: "text", placeholder: "Complete Application" },
        { key: "step3_desc", label: "Step 3 Description", type: "text" },
        { key: "step4_title", label: "Step 4 Title", type: "text", placeholder: "Enrollment" },
        { key: "step4_desc", label: "Step 4 Description", type: "text" },
      ],
    },
    {
      section: "requirements",
      label: "Requirements",
      fields: [
        { key: "title", label: "Section Title", type: "text", placeholder: "Admission Requirements" },
        { key: "documents_title", label: "Documents Title", type: "text", placeholder: "Required Documents" },
        { key: "doc1", label: "Document 1", type: "text", placeholder: "Child's birth certificate" },
        { key: "doc2", label: "Document 2", type: "text", placeholder: "Immunization records" },
        { key: "doc3", label: "Document 3", type: "text", placeholder: "Recent passport photos" },
        { key: "doc4", label: "Document 4", type: "text", placeholder: "Previous school records" },
        { key: "doc5", label: "Document 5", type: "text", placeholder: "Parent/Guardian ID copies" },
        { key: "age_title", label: "Age Requirements Title", type: "text", placeholder: "Age Requirements" },
        { key: "age1_label", label: "Age 1 Label", type: "text", placeholder: "Baby Class:" },
        { key: "age1_value", label: "Age 1 Value", type: "text", placeholder: "2-3 years old" },
        { key: "age2_label", label: "Age 2 Label", type: "text", placeholder: "Nursery:" },
        { key: "age2_value", label: "Age 2 Value", type: "text", placeholder: "3-5 years old" },
        { key: "age3_label", label: "Age 3 Label", type: "text", placeholder: "Primary 1:" },
        { key: "age3_value", label: "Age 3 Value", type: "text", placeholder: "6 years old" },
        { key: "age_note", label: "Age Note", type: "text", placeholder: "Age requirements as of January 1st of the enrollment year" },
      ],
    },
    {
      section: "form",
      label: "Inquiry Form",
      fields: [
        { key: "title", label: "Form Title", type: "text", placeholder: "Enrollment Inquiry Form" },
        { key: "description", label: "Form Description", type: "textarea", placeholder: "Fill out this form and our admissions team will contact you within 24 hours" },
      ],
    },
    {
      section: "cta",
      label: "Call to Action",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Have Questions?" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
  ],
  contact: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Contact Us" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "We'd love to hear from you..." },
      ],
    },
    {
      section: "info",
      label: "Contact Information",
      fields: [
        { key: "heading", label: "Section Heading", type: "text", placeholder: "Get In Touch" },
        { key: "description", label: "Description", type: "textarea" },
      ],
    },
    {
      section: "mutungo",
      label: "Mutungo Campus Contact",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Mutungo Campus" },
        { key: "address", label: "Address", type: "text", placeholder: "Mutungo, Kampala, Uganda" },
        { key: "phone", label: "Phone", type: "text", placeholder: "+256 XXX XXXXXX" },
        { key: "email", label: "Email", type: "text", placeholder: "mutungo@elyonschool.com" },
      ],
    },
    {
      section: "nsangi",
      label: "Nsangi Campus Contact",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Nsangi Campus" },
        { key: "address", label: "Address", type: "text", placeholder: "Nsangi, Wakiso District" },
        { key: "phone", label: "Phone", type: "text", placeholder: "+256 XXX XXXXXX" },
        { key: "email", label: "Email", type: "text", placeholder: "nsangi@elyonschool.com" },
      ],
    },
    {
      section: "hours",
      label: "Office Hours",
      fields: [
        { key: "weekdays", label: "Weekdays", type: "text", placeholder: "Monday - Friday: 8:00 AM - 5:00 PM" },
        { key: "saturday", label: "Saturday", type: "text", placeholder: "Saturday: 9:00 AM - 1:00 PM" },
        { key: "sunday", label: "Sunday", type: "text", placeholder: "Sunday: Closed" },
      ],
    },
    {
      section: "social",
      label: "Social Media Links",
      fields: [
        { key: "facebook", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/..." },
        { key: "instagram", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/..." },
        { key: "youtube", label: "YouTube URL", type: "text", placeholder: "https://youtube.com/..." },
        { key: "x_url", label: "X (Twitter) URL", type: "text", placeholder: "https://x.com/..." },
      ],
    },
    {
      section: "form",
      label: "Contact Form",
      fields: [
        { key: "title", label: "Form Title", type: "text", placeholder: "Send Us a Message" },
      ],
    },
  ],
  gallery: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Photo Gallery" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Explore moments from our vibrant school community" },
      ],
    },
    {
      section: "cta",
      label: "Call to Action",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "Want to See More?" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "button_text", label: "Button Text", type: "text", placeholder: "Follow Us on Instagram" },
      ],
    },
  ],
  vlogs: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "School Vlogs" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Watch our latest videos..." },
      ],
    },
  ],
  blogs: [
    {
      section: "hero",
      label: "Hero Section",
      fields: [
        { key: "title", label: "Title", type: "text", placeholder: "School Blog" },
        { key: "subtitle", label: "Subtitle", type: "text", placeholder: "News, updates, and stories from our school community" },
      ],
    },
  ],
  footer: [
    {
      section: "brand",
      label: "Brand Information",
      fields: [
        { key: "name", label: "School Name", type: "text", placeholder: "Elyon Kindergarten & Primary School" },
        { key: "motto", label: "School Motto", type: "text", placeholder: "\"In God We Trust\"" },
        { key: "logo", label: "School Logo", type: "image" },
        { key: "description", label: "Short Description", type: "textarea", placeholder: "Nurturing young minds..." },
      ],
    },
    {
      section: "contact",
      label: "Footer Contact Info",
      fields: [
        { key: "address", label: "Address", type: "text", placeholder: "Mutungo & Nsangi, Kampala, Uganda" },
        { key: "phone", label: "Phone Number", type: "text", placeholder: "+256 XXX XXXXXX" },
        { key: "email", label: "Email Address", type: "text", placeholder: "info@elyonschool.com" },
      ],
    },
  ],
};

interface AdminContentEditorProps {
  page: string;
}

const AdminContentEditor = ({ page }: AdminContentEditorProps) => {
  const { content, loading, updateContent, refetch } = useSiteContent();
  const { uploadImage, uploading } = usePageImages();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleImageUpload = async (sectionId: string, fieldKey: string, file: File) => {
    const result = await uploadImage(file, page, `${sectionId}-${fieldKey}`);
    if (result.success && result.url) {
      handleFieldChange(sectionId, fieldKey, result.url);
    }
  };

  const sections = PAGE_CONTENT_STRUCTURE[page] || [];

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Only initialize formData when content is loaded and we haven't started editing
    // OR when the page changes
    if (!loading && (isFirstRender.current || Object.keys(formData).length === 0)) {
      const initialData: Record<string, Record<string, string>> = {};
      sections.forEach((section) => {
        const sectionKey = `${page}_${section.section}`;
        initialData[section.section] = {};
        section.fields.forEach((field) => {
          initialData[section.section][field.key] = content[sectionKey]?.[field.key] || "";
        });
      });
      setFormData(initialData);
      setHasChanges(false);
      isFirstRender.current = false;
    }
  }, [page, loading, content]);

  // Reset first render flag when page changes
  useEffect(() => {
    isFirstRender.current = true;
    setFormData({});
  }, [page]);

  const handleFieldChange = (sectionId: string, fieldKey: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [fieldKey]: value },
    }));
    setHasChanges(true);
  };

  const getContentType = (fieldType: string) => {
    if (fieldType === "image") return "image";
    return "text";
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    let hasErrors = false;
    try {
      const fieldList: { section: string; key: string; value: string; type: string }[] = [];
      
      sections.forEach(section => {
        const sectionData = formData[section.section] || {};
        section.fields.forEach(field => {
          const value = sectionData[field.key];
          if (value !== undefined) {
            fieldList.push({ section: section.section, key: field.key, value, type: field.type });
          }
        });
      });

      for (let i = 0; i < fieldList.length; i++) {
        const { section, key, value, type } = fieldList[i];
        const isLast = i === fieldList.length - 1;
        const result = await updateContent(page, section, key, value, getContentType(type), !isLast);
        if (result && !result.success) {
          hasErrors = true;
        }
      }

      if (hasErrors) {
        toast({ title: "Partial Save", description: "Some changes could not be saved. Check console for details.", variant: "destructive" });
      } else {
        toast({ title: "All Changes Saved", description: "Your content has been updated successfully" });
      }
      setHasChanges(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save some changes", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-poppins text-xl font-bold capitalize">{page} Page Content</h2>
          <p className="font-inter text-sm text-muted-foreground">Edit the content displayed on the {page} page</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refetch} disabled={isSaving}>
            <RefreshCw className="h-4 w-4 mr-2" />Refresh
          </Button>
          <Button onClick={handleSaveAll} disabled={isSaving || !hasChanges}>
            {isSaving ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</> : <><Save className="h-4 w-4 mr-2" />Save All Changes</>}
          </Button>
        </div>
      </div>

      {sections.length === 0 ? (
        <Card><CardContent className="py-16 text-center"><p className="font-inter text-muted-foreground">No editable content structure defined for this page yet.</p></CardContent></Card>
      ) : (
        sections.map((section) => (
          <Card key={section.section}>
            <CardHeader>
              <CardTitle className="font-poppins">{section.label}</CardTitle>
              <CardDescription className="font-inter">Edit the {section.label.toLowerCase()} content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={`${section.section}-${field.key}`} className="font-inter">{field.label}</Label>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={`${section.section}-${field.key}`}
                      value={formData[section.section]?.[field.key] || ""}
                      onChange={(e) => handleFieldChange(section.section, field.key, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  ) : field.type === "image" ? (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={(el) => { fileInputRefs.current[`${section.section}-${field.key}`] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(section.section, field.key, file);
                        }}
                      />
                      {formData[section.section]?.[field.key] ? (
                        <div className="space-y-2">
                          <div className="relative group rounded-lg border overflow-hidden w-full max-w-md">
                            <img 
                              src={formData[section.section][field.key]} 
                              alt="Current image" 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() => fileInputRefs.current[`${section.section}-${field.key}`]?.click()}
                                disabled={uploading}
                              >
                                {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Replace className="h-4 w-4 mr-1" />}
                                Replace
                              </Button>
                              <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() => handleFieldChange(section.section, field.key, "")}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Input
                              id={`${section.section}-${field.key}`}
                              value={formData[section.section]?.[field.key] || ""}
                              onChange={(e) => handleFieldChange(section.section, field.key, e.target.value)}
                              placeholder="Image URL"
                              className="flex-1 text-xs"
                            />
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => fileInputRefs.current[`${section.section}-${field.key}`]?.click()}
                          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-all max-w-md"
                        >
                          {uploading ? (
                            <div className="space-y-2">
                              <Loader2 className="h-10 w-10 mx-auto text-primary animate-spin" />
                              <p className="font-inter text-sm text-muted-foreground">Uploading...</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                              <p className="font-inter text-sm text-muted-foreground">Click to upload an image</p>
                              <p className="font-inter text-xs text-muted-foreground/70">PNG, JPG, WEBP up to 10MB</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Input
                      id={`${section.section}-${field.key}`}
                      value={formData[section.section]?.[field.key] || ""}
                      onChange={(e) => handleFieldChange(section.section, field.key, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AdminContentEditor;
