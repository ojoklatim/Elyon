import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Heart } from "lucide-react";
import { lazy, Suspense } from "react";
const Hero3D = lazy(() => import("@/components/Hero3D"));
const HeroSlideshow = lazy(() => import("@/components/HeroSlideshow"));
const Card3D = lazy(() => import("@/components/Card3D"));
import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";

const Home = () => {
  const { getContent, loading } = useSiteContent("home");

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Slideshow Background */}
        <Suspense fallback={<div className="absolute inset-0 bg-muted animate-pulse" />}>
          <HeroSlideshow fallbackImage={getContent("hero", "background_image", "")} />
        </Suspense>
        
        {/* Transparent Overlay */}
        <div className="absolute inset-0 bg-transparent z-10" />
        
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ 
              opacity: {
                times: [0, 0.1, 0.8, 1],
                duration: 4,
                delay: 0.2
              },
              scale: { duration: 0.6, delay: 0.2 }
            }}
            className="font-poppins text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            {getContent("hero", "title", "Welcome to Elyon Kindergarten and Primary School")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-inter text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            {getContent("hero", "subtitle", "Nurturing young minds with quality Christian education in the heart of Kampala")}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/admissions">
              <Button size="lg" variant="secondary" className="font-inter font-semibold hover:scale-105 transition-transform">
                {getContent("hero", "button1_text", "Enroll Your Child")}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-foreground mb-6">
              {getContent("about_snippet", "title", "Building Bright Futures Since Our Founding")}
            </h2>
            <p className="font-inter text-lg text-muted-foreground mb-8">
              {getContent("about_snippet", "description", "At Elyon Kindergarten and Primary School, we provide a nurturing environment where children develop academically, spiritually, and socially. With campuses in Mutungo and Nsangi, we're committed to excellence in education rooted in Christian values.")}
            </p>
            <Link to="/about">
              <Button variant="default" className="font-inter">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Elyon */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
            {getContent("why_choose", "title", "Why Choose Elyon School?")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Suspense fallback={<Card className="h-full animate-pulse" />}>
              <Card3D>
                <Card className="border-2 hover:border-primary transition-colors h-full">
                  <CardContent className="pt-6 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <BookOpen className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="font-poppins text-xl font-semibold mb-2">
                      {getContent("why_choose", "card1_title", "Quality Education")}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("why_choose", "card1_desc", "Comprehensive curriculum from Baby Class to Primary 7")}
                    </p>
                  </CardContent>
                </Card>
              </Card3D>
            </Suspense>

            <Suspense fallback={<Card className="h-full animate-pulse" />}>
              <Card3D>
                <Card className="border-2 hover:border-secondary transition-colors h-full">
                  <CardContent className="pt-6 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Heart className="h-6 w-6 text-secondary" />
                    </motion.div>
                    <h3 className="font-poppins text-xl font-semibold mb-2">
                      {getContent("why_choose", "card2_title", "Christian Values")}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("why_choose", "card2_desc", "Education grounded in faith and moral development")}
                    </p>
                  </CardContent>
                </Card>
              </Card3D>
            </Suspense>

            <Suspense fallback={<Card className="h-full animate-pulse" />}>
              <Card3D>
                <Card className="border-2 hover:border-accent transition-colors h-full">
                  <CardContent className="pt-6 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Users className="h-6 w-6 text-accent" />
                    </motion.div>
                    <h3 className="font-poppins text-xl font-semibold mb-2">
                      {getContent("why_choose", "card3_title", "Caring Teachers")}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("why_choose", "card3_desc", "Dedicated educators who nurture every child's potential")}
                    </p>
                  </CardContent>
                </Card>
              </Card3D>
            </Suspense>

            <Suspense fallback={<Card className="h-full animate-pulse" />}>
              <Card3D>
                <Card className="border-2 hover:border-primary transition-colors h-full">
                  <CardContent className="pt-6 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Award className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="font-poppins text-xl font-semibold mb-2">
                      {getContent("why_choose", "card4_title", "Two Campuses")}
                    </h3>
                    <p className="font-inter text-sm text-muted-foreground">
                      {getContent("why_choose", "card4_desc", "Convenient locations in Mutungo and Nsangi")}
                    </p>
                  </CardContent>
                </Card>
              </Card3D>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
            {getContent("programs", "title", "Our Programs")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Suspense fallback={<Card className="h-full animate-pulse" />}>
                <Card3D>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    {getContent("programs", "kindergarten_image", "") && (
                      <img 
                        src={getContent("programs", "kindergarten_image", "")} 
                        alt="Kindergarten students learning" 
                        className="w-full h-48 object-cover" 
                      />
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-poppins text-2xl font-semibold mb-3">
                        {getContent("programs", "kindergarten_title", "Kindergarten")}
                      </h3>
                      <p className="font-inter text-muted-foreground mb-4">
                        {getContent("programs", "kindergarten_desc", "Baby Class, Nursery, and Early Learning programs designed for ages 2-5")}
                      </p>
                      <Link to="/programs">
                        <Button variant="outline" className="font-inter hover:scale-105 transition-transform">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Card3D>
              </Suspense>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Suspense fallback={<Card className="h-full animate-pulse" />}>
                <Card3D>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    {getContent("programs", "primary_image", "") && (
                      <img 
                        src={getContent("programs", "primary_image", "")} 
                        alt="Primary school students" 
                        className="w-full h-48 object-cover" 
                      />
                    )}
                    <CardContent className="p-6">
                      <h3 className="font-poppins text-2xl font-semibold mb-3">
                        {getContent("programs", "primary_title", "Primary School")}
                      </h3>
                      <p className="font-inter text-muted-foreground mb-4">
                        {getContent("programs", "primary_desc", "Primary 1 through Primary 7 with emphasis on academic excellence")}
                      </p>
                      <Link to="/programs">
                        <Button variant="outline" className="font-inter hover:scale-105 transition-transform">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </Card3D>
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">
            {getContent("cta", "title", "Ready to Join Our Community?")}
          </h2>
          <p className="font-inter text-lg mb-8 max-w-2xl mx-auto">
            {getContent("cta", "description", "Give your child the gift of quality education in a nurturing Christian environment")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions">
              <Button size="lg" variant="secondary" className="font-inter font-semibold">
                Start Enrollment
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-inter font-semibold bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
