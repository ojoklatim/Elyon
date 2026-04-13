import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Eye, Award } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Organogram } from "@/components/Organogram";

const About = () => {
  const { getContent } = useSiteContent("about");

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-poppins text-4xl md:text-5xl font-bold mb-6">
              {getContent("hero", "title", "About Elyon School")}
            </h1>
            <p className="font-inter text-lg">
              {getContent("hero", "subtitle", "A legacy of excellence in education, building character and academic achievement since our founding")}
            </p>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <Organogram />

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-poppins text-2xl font-semibold mb-4">
                  {getContent("mission", "title", "Our Mission")}
                </h3>
                <p className="font-inter text-muted-foreground">
                  {getContent("mission", "description", "To provide quality Christian education that nurtures academic excellence, moral integrity, and spiritual growth in every child.")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-poppins text-2xl font-semibold mb-4">
                  {getContent("vision", "title", "Our Vision")}
                </h3>
                <p className="font-inter text-muted-foreground">
                  {getContent("vision", "description", "To be the leading educational institution in Uganda, recognized for academic excellence and character development rooted in Christian values.")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-poppins text-2xl font-semibold mb-4">
                  {getContent("values", "title", "Our Values")}
                </h3>
                <p className="font-inter text-muted-foreground">
                  {getContent("values", "description", "Excellence, Integrity, Compassion, Faith, and Community guide everything we do at Elyon School.")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
              {getContent("story", "title", "Our Story")}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 font-inter text-lg text-muted-foreground">
                <p>
                  {getContent("story", "paragraph1", "Elyon Kindergarten and Primary School was founded with a vision to provide quality Christian education to the children of Kampala and surrounding areas. Our name \"Elyon\" means \"Most High,\" reflecting our commitment to excellence and our foundation in faith.")}
                </p>
                
                <p>
                  {getContent("story", "paragraph2", "From our humble beginnings, we have grown to serve families across two campuses in Mutungo and Nsangi, each offering a nurturing environment where children can thrive academically, socially, and spiritually.")}
                </p>
                
                <p>
                  {getContent("story", "paragraph3", "Under the leadership of our dedicated Principal, Winfred Atwongire Namanya, and our passionate team of educators, we continue to build on our tradition of excellence while embracing innovative teaching methods that prepare our students for the challenges of tomorrow.")}
                </p>
              </div>
              
              {getContent("story", "story_image", "") && (
                <div>
                  <img 
                    src={getContent("story", "story_image", "")} 
                    alt="Our Story" 
                    className="rounded-lg shadow-lg w-full h-[300px] object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">Our Leadership</h2>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {getContent("leadership", "photo", "") ? (
                  <img 
                    src={getContent("leadership", "photo", "")} 
                    alt="Principal" 
                    className="w-32 h-32 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-16 w-16 text-white" />
                  </div>
                )}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-poppins text-2xl font-semibold mb-2">
                    {getContent("leadership", "name", "Winfred Atwongire Namanya")}
                  </h3>
                  <p className="font-inter text-primary font-medium mb-3">
                    {getContent("leadership", "title", "Principal & Director")}
                  </p>
                  <p className="font-inter text-muted-foreground">
                    {getContent("leadership", "bio", "With years of experience in education and a heart for children, Winfred leads Elyon School with vision, dedication, and a commitment to excellence in every aspect of our students' development.")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-center mb-12">
              {getContent("philosophy", "title", "Our Educational Philosophy")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-poppins text-xl font-semibold mb-3">
                    {getContent("philosophy", "card1_title", "Child-Centered Learning")}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {getContent("philosophy", "card1_desc", "We recognize that every child is unique and learns differently. Our approach adapts to individual needs and learning styles.")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-poppins text-xl font-semibold mb-3">
                    {getContent("philosophy", "card2_title", "Holistic Development")}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {getContent("philosophy", "card2_desc", "We nurture the whole child - academically, spiritually, physically, emotionally, and socially.")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-poppins text-xl font-semibold mb-3">
                    {getContent("philosophy", "card3_title", "Christian Foundation")}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {getContent("philosophy", "card3_desc", "Biblical principles and Christian values are woven into every aspect of our curriculum and school culture.")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-poppins text-xl font-semibold mb-3">
                    {getContent("philosophy", "card4_title", "Excellence in Education")}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {getContent("philosophy", "card4_desc", "We maintain high academic standards while fostering a love for learning that lasts a lifetime.")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
