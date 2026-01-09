import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGallery } from "@/hooks/useGallery";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Skeleton } from "@/components/ui/skeleton";
import { X } from "lucide-react";

const Gallery = () => {
  const { images, loading, getCategories } = useGallery(false);
  const { getContent } = useSiteContent("gallery");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ["all", ...getCategories()];
  
  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  if (loading) {
    return (
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
                {getContent("hero", "title", "Photo Gallery")}
              </h1>
              <p className="font-inter text-lg">
                {getContent("hero", "subtitle", "Explore moments from our vibrant school community")}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-lg" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
              {getContent("hero", "title", "Photo Gallery")}
            </h1>
            <p className="font-inter text-lg">
              {getContent("hero", "subtitle", "Explore moments from our vibrant school community")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
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

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-inter text-lg text-muted-foreground">
                No images available in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image) => (
                <Card 
                  key={image.id} 
                  className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedImage(image.image_url)}
                >
                  <CardContent className="p-0 relative">
                    <img
                      src={image.image_url}
                      alt={image.title}
                      className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <h3 className="font-poppins text-lg font-semibold text-white">
                        {image.title}
                      </h3>
                      {image.description && (
                        <p className="font-inter text-sm text-white/80">
                          {image.description}
                        </p>
                      )}
                      <Badge variant="secondary" className="w-fit mt-2 capitalize">
                        {image.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">Image Preview</DialogTitle>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full size preview"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
            {getContent("cta", "title", "Want to See More?")}
          </h2>
          <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {getContent("cta", "description", "Follow us on social media for daily updates and more photos from our school activities")}
          </p>
          <Button size="lg" variant="default" className="font-inter">
            {getContent("cta", "button_text", "Follow Us on Instagram")}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Gallery;
