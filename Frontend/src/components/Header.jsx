import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Header() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        MyWebsite
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/services" className="text-gray-700 hover:text-black">
          Services
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-black">
          About
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-black">
          Contact
        </Link>
      </nav>

      <div className="flex gap-2 items-center">
        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 p-4 space-y-3"
            aria-labelledby="menu-title"
          >
            {/* Visually hidden DialogTitle for screen readers */}
            {/* <VisuallyHidden>
              <h2 id="menu-title">Menu</h2>
            </VisuallyHidden> */}
            <SheetHeader>
              {/* <SheetTitle
                className="truncate"
                title={`Hi ${user.fname || user.companyName || user.email}`}
              /> */}
              <SheetTitle className="truncate">
                Hi {user?.fname || user?.companyName || user?.email}
              </SheetTitle>
              {/* <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription> */}
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/services"
                className="text-gray-700 hover:text-black"
                onClick={() => setOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-black"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-black"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
            {/* <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
          </SheetContent>
        </Sheet>

        {/* Avatar / Login Button */}
        {user ? (
          <Avatar>
            <AvatarImage
              className="w-10 h-10"
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                user?.fname || user?.companyName || user?.email
              }`}
            />
            <AvatarFallback>{(user.fname || "U")[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex">
            <Link to="/auth/login">
              {/* <Button>Login</Button> */}
              Login
            </Link>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Link to="/auth/signup">
              {/* <Button>Login</Button> */}
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
