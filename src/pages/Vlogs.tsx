import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useVlogs } from "@/hooks/useVlogs";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["all", "events", "lessons", "announcements", "activities", "general"];

const Vlogs = () => {
  const { vlogs, loading } = useVlogs();
  const { getContent } = useSiteContent("vlogs");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVlog, setSelectedVlog] = useState<{ title: string; url: string } | null>(null);

  const filteredVlogs = selectedCategory === "all" 
    ? vlogs 
    : vlogs.filter(vlog => vlog.category === selectedCategory);

  const getVideoEmbedUrl = (url: string) => {
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    return url;
  };

  const getVideoThumbnail = (url: string, customThumbnail?: string | null) => {
    if (customThumbnail) return customThumbnail;
    
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/mqdefault.jpg`;
    }
    return null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-poppins text-4xl md:text-5xl font-bold mb-4"
          >
            {getContent("hero", "title", "School Vlogs")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-inter text-lg max-w-2xl mx-auto"
          >
            {getContent("hero", "subtitle", "Watch our latest videos featuring school events, lessons, and activities")}
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="font-inter capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Vlogs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-72 rounded-lg" />
              ))}
            </div>
          ) : filteredVlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-inter text-muted-foreground">
                No vlogs found in this category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVlogs.map((vlog, index) => (
                <motion.div
                  key={vlog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedVlog({ title: vlog.title, url: vlog.video_url })}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        {getVideoThumbnail(vlog.video_url, vlog.thumbnail_url) ? (
                          <img
                            src={getVideoThumbnail(vlog.video_url, vlog.thumbnail_url)!}
                            alt={vlog.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-48 bg-muted flex items-center justify-center">
                            <Play className="h-16 w-16 text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-primary ml-1" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-inter rounded capitalize mb-2">
                          {vlog.category}
                        </span>
                        <h3 className="font-poppins font-semibold text-lg mb-2 line-clamp-2">
                          {vlog.title}
                        </h3>
                        {vlog.description && (
                          <p className="font-inter text-sm text-muted-foreground line-clamp-2 mb-3">
                            {vlog.description}
                          </p>
                        )}
                        <div className="flex items-center text-xs text-muted-foreground font-inter">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(vlog.created_at)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!selectedVlog} onOpenChange={() => setSelectedVlog(null)}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="font-poppins">{selectedVlog?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {selectedVlog && (
              <iframe
                src={getVideoEmbedUrl(selectedVlog.url)}
                title={selectedVlog.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Vlogs;
