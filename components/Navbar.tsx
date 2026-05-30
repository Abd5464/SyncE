"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "/solutions" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Impact", href: "/impact" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-dark/80 backdrop-blur-md border-b border-primary/10 shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-heading font-extrabold text-2xl tracking-tight">
          <svg className="w-6 h-6 text-primary-light" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 14.23 2.73 16.29 3.97 17.97L12 22L20.03 17.97C21.27 16.29 22 14.23 22 12C22 6.48 17.52 2 12 2ZM13 16H11V12H9V10H13V16ZM13 9H11V7H13V9Z" fill="currentColor"/>
            <path d="M11 18H13V12H15L12 7L9 12H11V18Z" fill="var(--color-secondary)"/>
          </svg>
          Sync <span className="text-primary-light">Energy</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors hover:text-primary-light ${
                pathname === link.href ? "text-primary-light" : "text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="bg-primary hover:bg-primary-light text-white font-semibold px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-primary-light/20">
            Partner With Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-dark border-b border-primary/20 flex flex-col p-6 gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`font-medium text-lg ${
                pathname === link.href ? "text-primary-light" : "text-gray-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-center text-white font-semibold px-6 py-3 rounded-full mt-2"
          >
            Partner With Us
          </Link>
        </div>
      )}
    </nav>
  );
}
