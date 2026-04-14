import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Palette, Music, Globe } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";
const Programs = () => {
  const {
    getContent
  } = useSiteContent("programs");
  return <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent to-accent/90 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6 text-primary">
              {getContent("hero", "title", "Our Programs")}
            </h1>
            <p className="font-inter text-lg text-primary">
              {getContent("hero", "subtitle", "Comprehensive education programs designed to nurture young minds from ages 2 through 13")}
            </p>
          </div>
        </div>
      </section>

      {/* Kindergarten Program */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-secondary">Ages 2-5</Badge>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                {getContent("kindergarten", "title", "Kindergarten Program")}
              </h2>
              
              <p className="font-inter text-lg text-muted-foreground mb-6">
                {getContent("kindergarten", "description", "Our kindergarten program provides a warm, nurturing environment where young children develop essential skills through play-based learning and structured activities.")}
              </p>

              <div className="space-y-4 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-poppins text-xl">
                      {getContent("kindergarten", "nursery_title", "Nursery (Ages 3-5)")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-inter text-muted-foreground">
                      {getContent("kindergarten", "nursery_desc", "Pre-reading and pre-math skills, creative play, language development, and preparation for primary school.")}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Link to="/admissions">
                <Button size="lg" className="font-inter">Learn More About Kindergarten</Button>
              </Link>
            </div>

            {getContent("kindergarten", "image", "") && (
              <div className="order-1 lg:order-2">
                <img src={getContent("kindergarten", "image", "")} alt="Kindergarten students learning" className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Primary Program */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {getContent("primary", "image", "") && (
              <div>
                <img src={getContent("primary", "image", "")} alt="Primary school students" className="rounded-lg shadow-lg w-full h-[400px] object-cover" />
              </div>
            )}

            <div>
              <Badge className="mb-4 bg-primary">Ages 6-13</Badge>
              <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
                {getContent("primary", "title", "Primary School Program")}
              </h2>
              
              <p className="font-inter text-lg text-muted-foreground mb-6">
                {getContent("primary", "description", "Our primary program (P1-P7) offers a rigorous academic curriculum that builds strong foundations in all core subjects while developing critical thinking and problem-solving skills.")}
              </p>

              <div className="space-y-4 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-poppins text-xl">
                      {getContent("primary", "lower_title", "Lower Primary (P1-P3)")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-inter text-muted-foreground">
                      {getContent("primary", "lower_desc", "Foundation in literacy, numeracy, science, and social studies with emphasis on developing good study habits and character.")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-poppins text-xl">
                      {getContent("primary", "upper_title", "Upper Primary (P4-P7)")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-inter text-muted-foreground">
                      {getContent("primary", "upper_desc", "Advanced curriculum preparing students for PLE, with focus on critical thinking, independent learning, and academic excellence.")}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Link to="/admissions">
                <Button size="lg" className="font-inter">Learn More About Primary</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Special Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
            {getContent("features", "title", "What Makes Our Programs Special")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-poppins text-xl font-semibold mb-3">
                  {getContent("features", "feature1_title", "Language Focus")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("features", "feature1_desc", "Strong emphasis on English language development and communication skills")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-poppins text-xl font-semibold mb-3">
                  {getContent("features", "feature2_title", "Biblical Studies")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("features", "feature2_desc", "Daily Bible lessons and Christian character education integrated throughout")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-poppins text-xl font-semibold mb-3">
                  {getContent("features", "feature3_title", "Creative Arts")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("features", "feature3_desc", "Art, drama, and hands-on activities that foster creativity and self-expression")}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-poppins text-xl font-semibold mb-3">
                  {getContent("features", "feature4_title", "Music & Movement")}
                </h3>
                <p className="font-inter text-sm text-muted-foreground">
                  {getContent("features", "feature4_desc", "Regular music lessons, singing, and physical education for holistic development")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
            {getContent("cta", "title", "Ready to Enroll Your Child?")}
          </h2>
          <p className="font-inter text-lg mb-8 max-w-2xl mx-auto">
            {getContent("cta", "description", "Join our community and give your child the foundation for lifelong success")}
          </p>
          <Link to="/admissions">
            <Button size="lg" variant="secondary" className="font-inter font-semibold">
              Start Enrollment Process
            </Button>
          </Link>
        </div>
      </section>
    </main>;
};
export default Programs;