import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/ui/theme-provider";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/internships", label: "Internships" },
  { href: "/workshops", label: "Workshops" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMobile();
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch company information for the header
  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
  });

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* Logo */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white p-2 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 7v5h5"></path>
                <path d="M9 17H4V5h6"></path>
                <path d="M12 17v-4"></path>
                <path d="M5 12h5"></path>
                <path d="M17 12h-2"></path>
                <path d="M18 9v8"></path>
              </svg>
            </div>
            <span className="font-bold text-xl">Srimitha Energy</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isMobile && settings?.company_phone && (
              <a 
                href={`tel:${settings.company_phone}`} 
                className="flex items-center text-sm text-foreground/80 hover:text-primary"
              >
                <Phone className="h-4 w-4 mr-2" />
                <span>{settings.company_phone}</span>
              </a>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>

            {!isMobile && (
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            )}

            {isMobile && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Srimitha Energy</SheetTitle>
                    <SheetDescription>
                      Sustainable energy solutions for a brighter future
                    </SheetDescription>
                  </SheetHeader>
                  <Separator className="my-4" />
                  <nav className="flex flex-col space-y-3 mt-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`px-4 py-2 rounded-md text-base font-medium transition-colors ${
                          location === item.href
                            ? "text-primary bg-primary/10"
                            : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Get a Quote
                      </Link>
                    </Button>
                  </div>
                  {settings?.company_phone && (
                    <div className="mt-4 flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <a
                        href={`tel:${settings.company_phone}`}
                        className="text-foreground/80 hover:text-primary"
                      >
                        {settings.company_phone}
                      </a>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
