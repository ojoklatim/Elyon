import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const Admissions = () => {
  const { getContent } = useSiteContent("admissions");

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
              {getContent("hero", "title", "Admissions")}
            </h1>
            <p className="font-inter text-lg">
              {getContent("hero", "subtitle", "Join the Elyon School family - Where every child's potential is nurtured")}
            </p>
          </div>
        </div>
      </section>

      {/* Enrollment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
            {getContent("process", "title", "Enrollment Process")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  1
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">
                  {getContent("process", "step1_title", "Submit Inquiry")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("process", "step1_desc", "Fill out the inquiry form below or contact us directly")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  2
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">
                  {getContent("process", "step2_title", "Schedule Visit")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("process", "step2_desc", "Tour our campus and meet with our admissions team")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  3
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">
                  {getContent("process", "step3_title", "Complete Application")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("process", "step3_desc", "Submit required documents and application forms")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  4
                </div>
                <h3 className="font-poppins text-lg font-semibold mb-2">
                  {getContent("process", "step4_title", "Enrollment")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("process", "step4_desc", "Receive confirmation and complete enrollment")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
              {getContent("requirements", "title", "Admission Requirements")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">
                    {getContent("requirements", "documents_title", "Required Documents")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="font-inter text-muted-foreground">
                      {getContent("requirements", "doc1", "Child's birth certificate")}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="font-inter text-muted-foreground">
                      {getContent("requirements", "doc2", "Immunization records")}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="font-inter text-muted-foreground">
                      {getContent("requirements", "doc3", "Recent passport photos")}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="font-inter text-muted-foreground">
                      {getContent("requirements", "doc4", "Previous school records (if applicable)")}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="font-inter text-muted-foreground">
                      {getContent("requirements", "doc5", "Parent/Guardian ID copies")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-poppins text-xl">
                    {getContent("requirements", "age_title", "Age Requirements")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-inter font-semibold">
                      {getContent("requirements", "age1_label", "Baby Class:")}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("requirements", "age1_value", "2-3 years old")}
                    </p>
                  </div>
                  <div>
                    <p className="font-inter font-semibold">
                      {getContent("requirements", "age2_label", "Nursery:")}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("requirements", "age2_value", "3-5 years old")}
                    </p>
                  </div>
                  <div>
                    <p className="font-inter font-semibold">
                      {getContent("requirements", "age3_label", "Primary 1:")}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("requirements", "age3_value", "6 years old")}
                    </p>
                  </div>
                  <div>
                    <p className="font-inter text-sm text-muted-foreground italic">
                      {getContent("requirements", "age_note", "Age requirements as of January 1st of the enrollment year")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-4">
              {getContent("form", "title", "Enrollment Inquiry Form")}
            </h2>
            <p className="font-inter text-center text-muted-foreground mb-12">
              {getContent("form", "description", "Fill out this form and our admissions team will contact you within 24 hours")}
            </p>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName" className="font-inter">Parent/Guardian Name *</Label>
                      <Input id="parentName" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="font-inter">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+256 XXX XXXXXX" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-inter">Email Address *</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="childName" className="font-inter">Child's Name *</Label>
                      <Input id="childName" placeholder="Jane Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="font-inter">Child's Age *</Label>
                      <Input id="age" type="number" placeholder="5" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="program" className="font-inter">Program of Interest *</Label>
                      <Select>
                        <SelectTrigger id="program">
                          <SelectValue placeholder="Select program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baby">Baby Class</SelectItem>
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="p1">Primary 1</SelectItem>
                          <SelectItem value="p2">Primary 2</SelectItem>
                          <SelectItem value="p3">Primary 3</SelectItem>
                          <SelectItem value="p4">Primary 4</SelectItem>
                          <SelectItem value="p5">Primary 5</SelectItem>
                          <SelectItem value="p6">Primary 6</SelectItem>
                          <SelectItem value="p7">Primary 7</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="campus" className="font-inter">Preferred Campus *</Label>
                      <Select>
                        <SelectTrigger id="campus">
                          <SelectValue placeholder="Select campus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mutungo">Mutungo</SelectItem>
                          <SelectItem value="nsangi">Nsangi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-inter">Additional Information</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us anything else you'd like us to know..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full font-inter font-semibold">
                    Submit Inquiry
                  </Button>

                  <p className="font-inter text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to be contacted by Elyon School regarding your inquiry
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
            {getContent("cta", "title", "Have Questions?")}
          </h2>
          <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {getContent("cta", "description", "Our admissions team is here to help! Contact us directly or visit our Contact page for more ways to reach us.")}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="font-inter">
              Contact Admissions Team
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Admissions;
