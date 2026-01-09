import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/programs", label: "Programs" },
    { to: "/campuses", label: "Campuses" },
    { to: "/gallery", label: "Gallery" },
    { to: "/vlogs", label: "Vlogs" },
    { to: "/blogs", label: "Blog" },
    { to: "/admissions", label: "Admissions" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex flex-col">
              <span className="font-poppins text-xl font-bold text-primary">Elyon Kindergarten & Primary School</span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="font-inter text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                activeClassName="text-primary font-semibold"
              >
                {link.label}
              </NavLink>
            ))}
            <Button size="sm" className="font-inter">
              Enroll Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="block font-inter text-sm font-medium text-foreground/70 py-2 transition-colors hover:text-foreground"
                activeClassName="text-primary font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Button className="w-full font-inter mt-4">
              Enroll Now
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
