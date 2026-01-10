import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const Campuses = () => {
  const { getContent } = useSiteContent("campuses");

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
              {getContent("hero", "subtitle", "Two convenient locations serving families across Kampala and Wakiso")}
            </p>
          </div>
        </div>
      </section>

      {/* Mutungo Campus */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                {getContent("mutungo", "title", "Mutungo Campus")}
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground">
                    {getContent("mutungo", "address", "Mutungo, Kampala, Uganda")}
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground mb-2">
                    Phone: {getContent("mutungo", "phone", "+256 XXX XXXXXX")}
                  </p>
                  <p className="font-inter text-muted-foreground">
                    Email: {getContent("mutungo", "email", "mutungo@elyonschool.com")}
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    School Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground">
                    {getContent("mutungo", "hours", "Monday - Friday: 7:30 AM - 4:00 PM")}
                  </p>
                </CardContent>
              </Card>

              <div className="space-x-4">
                <Button className="font-inter">Get Directions</Button>
                <Link to="/contact">
                  <Button variant="outline" className="font-inter">Schedule Visit</Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {getContent("mutungo", "image", "") && (
                <img 
                  src={getContent("mutungo", "image", "")} 
                  alt="Mutungo Campus" 
                  className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                />
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">
                    {getContent("mutungo", "facilities_title", "Campus Facilities")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="font-inter text-muted-foreground space-y-2">
                    <li>• {getContent("mutungo", "facility1", "Modern, well-equipped classrooms")}</li>
                    <li>• {getContent("mutungo", "facility2", "Safe outdoor play areas")}</li>
                    <li>• {getContent("mutungo", "facility3", "Computer lab and library")}</li>
                    <li>• {getContent("mutungo", "facility4", "Dining facilities")}</li>
                    <li>• {getContent("mutungo", "facility5", "Sports and recreation areas")}</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Google Maps Embed Placeholder */}
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="font-inter text-muted-foreground">Google Maps - Mutungo Campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nsangi Campus */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 space-y-6">
              {getContent("nsangi", "image", "") && (
                <img 
                  src={getContent("nsangi", "image", "")} 
                  alt="Nsangi Campus" 
                  className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                />
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">
                    {getContent("nsangi", "facilities_title", "Campus Facilities")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="font-inter text-muted-foreground space-y-2">
                    <li>• {getContent("nsangi", "facility1", "Spacious learning environments")}</li>
                    <li>• {getContent("nsangi", "facility2", "Large playground and gardens")}</li>
                    <li>• {getContent("nsangi", "facility3", "Science and computer labs")}</li>
                    <li>• {getContent("nsangi", "facility4", "Multipurpose hall")}</li>
                    <li>• {getContent("nsangi", "facility5", "Ample parking space")}</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Google Maps Embed Placeholder */}
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <p className="font-inter text-muted-foreground">Google Maps - Nsangi Campus</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                {getContent("nsangi", "title", "Nsangi Campus")}
              </h2>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground">
                    {getContent("nsangi", "address", "Nsangi, Wakiso District, Uganda")}
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground mb-2">
                    Phone: {getContent("nsangi", "phone", "+256 XXX XXXXXX")}
                  </p>
                  <p className="font-inter text-muted-foreground">
                    Email: {getContent("nsangi", "email", "nsangi@elyonschool.com")}
                  </p>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    School Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground">
                    {getContent("nsangi", "hours", "Monday - Friday: 7:30 AM - 4:00 PM")}
                  </p>
                </CardContent>
              </Card>

              <div className="space-x-4">
                <Button className="font-inter">Get Directions</Button>
                <Link to="/contact">
                  <Button variant="outline" className="font-inter">Schedule Visit</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-white border-0">
            <CardContent className="py-12 text-center">
              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                {getContent("cta", "title", "Visit Our Campuses")}
              </h2>
              <p className="font-inter text-lg mb-8 max-w-2xl mx-auto">
                {getContent("cta", "description", "We'd love to show you around! Schedule a visit to see our facilities, meet our teachers, and experience the Elyon difference firsthand.")}
              </p>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="font-inter font-semibold">
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
