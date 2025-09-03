"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, User, Settings } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Add School", href: "/addSchool", icon: User },
  { name: "View Schools", href: "/showSchools", icon: User },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const baseClasses =
    "flex items-center text-white rounded-lg font-medium transition-all duration-200";
  const activeClasses = "bg-primary  text-primary-foreground shadow-md";
  const inactiveClasses =
    "text-navbar-text hover:text-navbar-text-hover hover:bg-secondary/50";

  return (
    <nav className="sticky top-0 z-50 w-full bg-navbar/80 backdrop-blur-lg border-b border-navbar-border shadow-navbar bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2  group">
            {/* <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg transition-transform group-hover:scale-105">
              S
            </div> */}
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
            <span className="text-xl text-white font-bold text-navbar-brand">School Directory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex ml-10 space-x-4">
            {navItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={`${baseClasses} px-3 py-2 text-sm ${
                  pathname === href ? activeClasses : inactiveClasses
                }`}
              >
                <Icon size={16} />
                <span className="ml-2">{name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-navbar-text hover:text-navbar-text-hover p-2 bg-gradient-to-r from-indigo-500 to-purple-500"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-navbar/95 backdrop-blur-lg border-t border-navbar-border shadow-elevated">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`${baseClasses} px-3 py-3 text-base w-full ${
                pathname === href ? activeClasses : inactiveClasses
              }`}
            >
              <Icon size={18} />
              <span className="ml-2">{name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
