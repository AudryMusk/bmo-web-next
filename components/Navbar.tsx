"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import DownloadAppBtn from "./DownloadAppBtn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Accueil", href: "/" },
    {
      name: "Services",
      href: "/services",
      dropdown: [
        { name: "Particuliers", href: "/services/particuliers" },
        { name: "Business", href: "/services/business" },
      ],
    },
    { name: "Tarifs", href: "/tarifs" },
    { name: "Réseau", href: "/reseau" },
    { name: "Blog", href: "/blog" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 duration-300",
        isScrolled && "bg-white dark:bg-black/50 dark:backdrop-blur-lg"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between h-16 lg:h-20 border-b border-black/20 dark:border-white/10"
          )}
        >
          {/* Logo B-MO */}
          <Link href="/">
            <img src="/bmo-logo.png" alt="bmo logo" className="h-10 lg:h-14" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-semibold transition-colors duration-200",
                      isActive(link.href)
                        ? "text-primary"
                        : isScrolled
                          ? "text-black/50 dark:text-white/75"
                          : "text-white/75"
                    )}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                      {link.dropdown.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className={`block px-4 py-2 text-sm transition-colors hover:bg-muted ${
                            isActive(subLink.href)
                              ? "text-primary bg-primary/5"
                              : "text-foreground"
                          }`}
                          onClick={() => setServicesOpen(false)}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-semibold transition-colors duration-200 hover:text-primary",
                    isActive(link.href)
                      ? "text-primary"
                      : isScrolled
                        ? "text-black/50 dark:text-white/75"
                        : "text-white/75"
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2 text-primary font-bold">
              <Phone className="w-5 h-5" />
              <span className="text-xl">*890#</span>
            </div>
            <DownloadAppBtn />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.name} className="space-y-1">
                    <p className="text-sm font-semibold text-foreground py-2">
                      {link.name}
                    </p>
                    {link.dropdown.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className={`block pl-4 py-2 text-sm transition-colors ${
                          isActive(subLink.href)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`py-2 text-sm font-semibold transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Composez *890#</span>
                </div>
                <Button className="gradient-primary text-primary-foreground">
                  {"Télécharger l'App"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
