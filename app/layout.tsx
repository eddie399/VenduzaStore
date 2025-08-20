import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";





export const metadata: Metadata = {
  title: "venduza store",
  description: "developed by EJ pixels",
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  
  return (

    
    <html lang="en">
          
    
      
      <body
        className="flex min-h-screen flex-col bg-white overflow-x-hidden"
      >

      <Navbar />
      <main className="container mx-auto px-4 py-8">  {children} </main>
      <Footer />
      </body>

     
    </html>
  );
}
