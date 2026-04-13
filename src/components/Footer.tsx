import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import schoolBadge from "@/assets/school-badge.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { getContent } = useSiteContent("contact");

  return <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={schoolBadge} alt="Elyon School Badge" className="h-16 w-16 object-contain bg-white rounded-full p-1" />
              <div className="flex flex-col">
                <h3 className="font-poppins text-lg font-semibold">Elyon Kindergarten & Primary School</h3>
                <p className="font-inter text-sm italic text-primary-foreground/90">"In God We Trust"</p>
              </div>
            </div>
            <p className="font-inter text-sm text-primary-foreground/80">
              Nurturing young minds with quality Christian education in Kampala, Uganda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-inter text-sm">
              <li><a href="/about" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="/programs" className="hover:text-secondary transition-colors">Programs</a></li>
              <li><a href="/campuses" className="hover:text-secondary transition-colors">Campuses</a></li>
              <li><a href="/admissions" className="hover:text-secondary transition-colors">Admissions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 font-inter text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Mutungo & Nsangi, Kampala, Uganda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>info@elyonprimaryschool.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@elyonschool.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-poppins text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href={getContent("social", "instagram", "#")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={getContent("social", "youtube", "#")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
              <a href={getContent("social", "x_url", "#")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center font-inter text-sm">
          <p>&copy; {new Date().getFullYear()} Elyon Kindergarten & Primary School. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;