import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
const Contact = () => {
  const {
    getContent
  } = useSiteContent("contact");
  return <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/90 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6 text-primary">
              {getContent("hero", "title", "Contact Us")}
            </h1>
            <p className="font-inter text-lg text-primary">
              {getContent("hero", "subtitle", "We'd love to hear from you! Reach out with any questions or to schedule a visit")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="font-poppins text-3xl font-bold mb-6">
                  {getContent("info", "heading", "Get In Touch")}
                </h2>
                <p className="font-inter text-muted-foreground mb-8">
                  {getContent("info", "description", "Whether you're interested in enrollment, have questions about our programs, or just want to learn more about Elyon School, we're here to help.")}
                </p>
              </div>

              {/* Mutungo Campus Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">
                    {getContent("mutungo", "title", "Mutungo Campus")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-inter font-medium">Address</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {getContent("mutungo", "address", "Mutungo, Kampala, Uganda")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-inter font-medium">Phone</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {getContent("mutungo", "phone", "+256 XXX XXXXXX")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-inter font-medium">Email</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {getContent("mutungo", "email", "mutungo@elyonschool.com")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nsangi Campus Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">
                    {getContent("nsangi", "title", "Nsangi Campus")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-inter font-medium">Address</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {getContent("nsangi", "address", "Nsangi, Wakiso District, Uganda")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-inter font-medium">Phone</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {getContent("nsangi", "phone", "+256 XXX XXXXXX")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-inter font-medium">Email</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {getContent("nsangi", "email", "nsangi@elyonschool.com")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-inter text-muted-foreground">
                    {getContent("hours", "weekdays", "Monday - Friday: 8:00 AM - 5:00 PM")}
                  </p>
                  <p className="font-inter text-muted-foreground">
                    {getContent("hours", "saturday", "Saturday: 9:00 AM - 1:00 PM")}
                  </p>
                  <p className="font-inter text-muted-foreground">
                    {getContent("hours", "sunday", "Sunday: Closed")}
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a href={getContent("social", "facebook", "#")} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href={getContent("social", "instagram", "#")} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href={getContent("social", "youtube", "#")} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" aria-label="YouTube">
                      <Youtube className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-2xl">
                    {getContent("form", "title", "Send Us a Message")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-inter">Full Name *</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-inter">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-inter">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+256 XXX XXXXXX" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="font-inter">Subject *</Label>
                      <Input id="subject" placeholder="General Inquiry" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="font-inter">Message *</Label>
                      <Textarea id="message" placeholder="Tell us how we can help you..." rows={6} required />
                    </div>

                    <Button type="submit" size="lg" className="w-full font-inter font-semibold">
                      Send Message
                    </Button>

                    <p className="font-inter text-xs text-center text-muted-foreground">
                      We'll respond to your message within 24 hours
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
            Find Us On The Map
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mutungo Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Mutungo Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <p className="font-inter text-muted-foreground">Google Maps - Mutungo</p>
                </div>
                <Button variant="outline" className="w-full mt-4 font-inter">
                  Get Directions
                </Button>
              </CardContent>
            </Card>

            {/* Nsangi Map Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="font-poppins text-xl">Nsangi Campus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <p className="font-inter text-muted-foreground">Google Maps - Nsangi</p>
                </div>
                <Button variant="outline" className="w-full mt-4 font-inter">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>;
};
export default Contact;