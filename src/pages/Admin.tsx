import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, LogOut, Images, FileText, Home, Info, BookOpen, MapPin, GraduationCap, Phone, Video, Newspaper, Presentation, Mail, Users, Menu, X, ExternalLink, LayoutDashboard } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
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
      <main className="flex-1 flex items-center justify-center py-16 min-h-screen bg-muted/30">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="font-inter text-muted-foreground">Loading dashboard...</p>
        </div>
      </main>
    );
  }

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
    { id: "footer", label: "Footer", icon: LayoutDashboard },
  ];

  const sidebarItems = [
    { id: "hero", label: "Hero Slides", icon: Presentation },
    { id: "content", label: "Page Content", icon: FileText },
    { id: "gallery", label: "Gallery", icon: Images },
    { id: "vlogs", label: "Vlogs", icon: Video },
    { id: "blogs", label: "Blogs", icon: Newspaper },
    { id: "admissions", label: "Admissions", icon: Users },
    { id: "contacts", label: "Contacts", icon: Mail },
    { id: "locations", label: "Locations", icon: MapPin },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "hero":
        return <AdminHeroSlides />;
      case "content":
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
              {pages.map((page) => (
                <Button
                  key={page.id}
                  variant={selectedPage === page.id ? "default" : "ghost"}
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
          </div>
        );
      case "gallery":
        return <AdminGallery />;
      case "vlogs":
        return <AdminVlogs />;
      case "blogs":
        return <AdminBlogs />;
      case "admissions":
        return <AdminAdmissions />;
      case "contacts":
        return <AdminContactSubmissions />;
      case "locations":
        return <AdminLocations />;
      default:
        return <AdminHeroSlides />;
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg transform transition-transform duration-200 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-6 w-6 text-primary" />
              <div>
                <h2 className="font-poppins font-bold text-lg leading-tight">Elyon Admin</h2>
                <p className="font-inter text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Sidebar Nav */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-inter transition-colors
                  ${activeTab === item.id 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t space-y-2">
            <Link
              to="/"
              target="_blank"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-inter text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View Website
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-inter text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
            <div className="px-3 pt-2 border-t">
              <p className="font-inter text-xs text-muted-foreground truncate" title={user.email || ""}>
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header bar */}
        <header className="sticky top-0 z-30 bg-background border-b px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-poppins text-lg font-bold capitalize">
                  {sidebarItems.find(i => i.id === activeTab)?.label || "Dashboard"}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs text-muted-foreground hidden sm:block">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="font-inter">
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
