import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail, ExternalLink, Loader2 } from "lucide-react";
import { useSchoolLocations } from "@/hooks/useSchoolLocations";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const Campuses = () => {
  const { locations, loading: locationsLoading } = useSchoolLocations();
  const { getContent } = useSiteContent("campuses");

  if (locationsLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary/90 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
              {getContent("hero", "title", "Our Campuses")}
            </h1>
            <p className="font-inter text-lg">
              {getContent("hero", "subtitle", "Visit our convenient locations serving families across Kampala and Wakiso")}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Locations Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {locations.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-inter text-muted-foreground text-lg italic">
                Our campus details are being updated. Please check back soon or contact us for directions.
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {locations.map((location, index) => (
                <div 
                  key={location.id} 
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
                    <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-primary">
                      {location.name}
                    </h2>
                    
                    <div className="space-y-6">
                      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="font-poppins text-xl flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            Address
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-inter text-muted-foreground">
                            {location.address}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="font-poppins text-xl flex items-center gap-2">
                            <Phone className="h-5 w-5 text-primary" />
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {location.phone && (
                            <p className="font-inter text-muted-foreground flex items-center gap-2">
                              <span className="font-semibold text-foreground/70">Phone:</span> {location.phone}
                            </p>
                          )}
                          {location.email && (
                            <p className="font-inter text-muted-foreground flex items-center gap-2">
                              <span className="font-semibold text-foreground/70">Email:</span> {location.email}
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                          <CardTitle className="font-poppins text-xl flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            School Hours
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-inter text-muted-foreground">
                            Monday - Friday: 7:30 AM - 4:00 PM
                          </p>
                        </CardContent>
                      </Card>

                      <div className="flex flex-wrap gap-4 pt-4">
                        {location.google_maps_url && (
                          <a 
                            href={location.google_maps_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button className="font-inter group">
                              <ExternalLink className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                              Get Directions
                            </Button>
                          </a>
                        )}
                        <Link to="/contact">
                          <Button variant="outline" className="font-inter">Schedule Visit</Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                    {/* Map Embed Section */}
                    {location.google_maps_embed ? (
                      <div 
                        className="rounded-xl overflow-hidden shadow-xl border w-full h-[400px]"
                        dangerouslySetInnerHTML={{ 
                          __html: location.google_maps_embed.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="400"') 
                        }}
                      />
                    ) : (
                      <div className="bg-muted rounded-xl h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed">
                        <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <p className="font-inter text-muted-foreground">
                          Google Maps view for {location.name} is being prepared.
                        </p>
                        {location.google_maps_url && (
                          <a 
                            href={location.google_maps_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline mt-2 inline-flex items-center gap-1"
                          >
                            View on Google Maps <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />
            
            <CardContent className="py-16 text-center relative z-10">
              <h2 className="font-poppins text-3xl md:text-5xl font-bold mb-6">
                {getContent("cta", "title", "Experience Elyon Firsthand")}
              </h2>
              <p className="font-inter text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
                {getContent("cta", "description", "We'd love to show you around! Schedule a visit to see our facilities, meet our teachers, and experience the Elyon difference firsthand.")}
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="font-inter font-bold px-8 h-14 text-lg hover:scale-105 transition-transform shadow-lg">
                  Schedule a Campus Visit
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Campuses;

