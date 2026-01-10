import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, LogOut, Images, FileText, Home, Info, BookOpen, MapPin, GraduationCap, Phone, Video, Newspaper, Presentation, Mail, Users } from "lucide-react";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminContentEditor from "@/components/admin/AdminContentEditor";
import AdminVlogs from "@/components/admin/AdminVlogs";
import AdminBlogs from "@/components/admin/AdminBlogs";
import AdminHeroSlides from "@/components/admin/AdminHeroSlides";
import AdminContactSubmissions from "@/components/admin/AdminContactSubmissions";
import AdminAdmissions from "@/components/admin/AdminAdmissions";
import AdminLocations from "@/components/admin/AdminLocations";

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("home");

  useEffect(() => {
    // TEMPORARY: Any authenticated user can access admin
    if (!loading && !user) {
      navigate("/admin/login");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  // TEMPORARY: Any authenticated user can access admin
  if (!user) {
    return null;
  }

  const pages = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: Info },
    { id: "programs", label: "Programs", icon: BookOpen },
    { id: "campuses", label: "Campuses", icon: MapPin },
    { id: "admissions", label: "Admissions", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "vlogs", label: "Vlogs", icon: Video },
    { id: "blogs", label: "Blogs", icon: Newspaper },
  ];

  return (
    <main className="flex-1 bg-muted/30">
      {/* Admin Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="font-poppins text-2xl font-bold">Admin Dashboard</h1>
              <p className="font-inter text-sm text-muted-foreground">
                Manage your website content
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="font-inter">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="flex flex-wrap gap-2 h-auto p-2">
            <TabsTrigger value="hero" className="font-inter">
              <Presentation className="h-4 w-4 mr-2" />
              Hero Slides
            </TabsTrigger>
            <TabsTrigger value="content" className="font-inter">
              <FileText className="h-4 w-4 mr-2" />
              Page Content
            </TabsTrigger>
            <TabsTrigger value="gallery" className="font-inter">
              <Images className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="vlogs" className="font-inter">
              <Video className="h-4 w-4 mr-2" />
              Vlogs
            </TabsTrigger>
            <TabsTrigger value="blogs" className="font-inter">
              <Newspaper className="h-4 w-4 mr-2" />
              Blogs
            </TabsTrigger>
            <TabsTrigger value="admissions" className="font-inter">
              <Users className="h-4 w-4 mr-2" />
              Admissions
            </TabsTrigger>
            <TabsTrigger value="contacts" className="font-inter">
              <Mail className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="locations" className="font-inter">
              <MapPin className="h-4 w-4 mr-2" />
              Locations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <AdminHeroSlides />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={selectedPage === page.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPage(page.id)}
                  className="font-inter"
                >
                  <page.icon className="h-4 w-4 mr-2" />
                  {page.label}
                </Button>
              ))}
            </div>
            <AdminContentEditor page={selectedPage} />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="vlogs">
            <AdminVlogs />
          </TabsContent>

          <TabsContent value="blogs">
            <AdminBlogs />
          </TabsContent>

          <TabsContent value="admissions">
            <AdminAdmissions />
          </TabsContent>

          <TabsContent value="contacts">
            <AdminContactSubmissions />
          </TabsContent>

          <TabsContent value="locations">
            <AdminLocations />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
