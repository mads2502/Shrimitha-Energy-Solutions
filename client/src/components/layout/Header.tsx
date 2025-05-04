import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Workshops", href: "/workshops" },
  { label: "Internships", href: "/internships" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const renderNavLinks = (closeSheet?: () => void) => {
    return NAV_ITEMS.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={closeSheet}
        className={`transition-colors duration-200 px-3 py-2 text-base font-medium ${
          location === item.href
            ? "text-primary border-b-2 border-primary"
            : "text-foreground hover:text-primary hover:bg-muted/50 rounded-md"
        }`}
      >
        {item.label}
      </Link>
    ));
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground">Srimitha</span>
              <span className="text-xs text-muted-foreground leading-none">
                Energy Solutions
              </span>
            </div>
          </Link>
        </div>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col mt-8 space-y-3">
                {renderNavLinks(() => {
                  document.querySelector('[data-radix-collection-item]')?.click();
                })}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden md:flex items-center gap-1">
            {renderNavLinks()}
          </nav>
        )}

        <div className="hidden md:flex">
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
