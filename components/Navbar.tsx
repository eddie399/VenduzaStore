"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#052a3d] text-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600 text-2xl font-bold">
    
          <Image
           alt="logo" 
           width={180}
           height={120}
           src="/venduza.png"
           className="w-40 h-auto"
          />


        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">Home</Link>
          <Link href="/products" className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
            Products
          </Link>
          <Link href="/checkout" className="relative inline-block after:block after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 after:absolute after:left-0 after:bottom-0 hover:after:w-full">
            Checkout
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-7 w-7 outline rounded-sm cursor-pointer" />
            ) : (
              <Bars3Icon className="h-7 w-7 outline rounded-sm cursor-pointer" />
            )}
          </Button>
        </div>
      </div>
          
      {mobileOpen && (
        <nav className="md:hidden bg-[#ffffff] text-[#614943] shadow-md opacity-90 rounded-b-lg transition-all duration-300">
          <ul className="flex flex-col p-4">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Products" },
              { href: "/checkout", label: "Checkout" },
            ].map((item, idx, arr) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="block py-3 px-2 rounded-md transition-colors duration-300 hover:bg-[#b3cdd7] hover:text-[#117192] font-semibold"
                >
                  {item.label}
                </Link>
                {idx < arr.length - 1 && (
                  <div className="mx-2 border-b border-dashed border-[#614943] transition-all duration-300 group-hover:border-[#052a3d]"></div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    
    </nav>
  );
};