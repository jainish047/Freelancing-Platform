import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-md">
      {/* Logo */}
      <a href="/" className="text-xl font-bold">
        MyWebsite
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <a href="/services" className="text-gray-700 hover:text-black">
          Services
        </a>
        <a href="/about" className="text-gray-700 hover:text-black">
          About
        </a>
        <a href="/contact" className="text-gray-700 hover:text-black">
          Contact
        </a>
      </nav>

      {/* Mobile Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <nav className="flex flex-col space-y-4">
            <a href="/services" className="text-gray-700 hover:text-black" onClick={() => setOpen(false)}>
              Services
            </a>
            <a href="/about" className="text-gray-700 hover:text-black" onClick={() => setOpen(false)}>
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-black" onClick={() => setOpen(false)}>
              Contact
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
