import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBlogs } from "@/hooks/useBlogs";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const Blogs = () => {
  const { blogs, loading } = useBlogs();
  const { getContent } = useSiteContent("blogs");
  const [selectedBlog, setSelectedBlog] = useState<{
    title: string;
    content: string | null;
    cover_image: string | null;
    created_at: string;
  } | null>(null);

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
      <section className="relative py-16 bg-gradient-to-r from-secondary to-secondary/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-poppins text-4xl md:text-5xl font-bold mb-4"
          >
            {getContent("hero", "title", "School Blog")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-inter text-lg max-w-2xl mx-auto"
          >
            {getContent("hero", "subtitle", "News, updates, and stories from our school community")}
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-lg" />
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="font-inter text-lg text-muted-foreground">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card 
                    className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all h-full flex flex-col"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <div className="relative h-48">
                      {blog.cover_image ? (
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-xs text-muted-foreground font-inter mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(blog.created_at)}
                      </div>
                      <h3 className="font-poppins font-semibold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      {blog.content && (
                        <p className="font-inter text-sm text-muted-foreground line-clamp-3 flex-1">
                          {blog.content}
                        </p>
                      )}
                      <div className="mt-4 flex items-center text-primary font-inter text-sm font-medium group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Modal */}
      <Dialog open={!!selectedBlog} onOpenChange={() => setSelectedBlog(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins text-2xl">{selectedBlog?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedBlog?.cover_image && (
              <img
                src={selectedBlog.cover_image}
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            )}
            <div className="flex items-center text-sm text-muted-foreground font-inter">
              <Calendar className="h-4 w-4 mr-1" />
              {selectedBlog && formatDate(selectedBlog.created_at)}
            </div>
            {selectedBlog?.content && (
              <div className="font-inter text-foreground whitespace-pre-wrap leading-relaxed">
                {selectedBlog.content}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Blogs;
