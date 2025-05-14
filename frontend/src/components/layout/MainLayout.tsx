
import React from "react";
import { Navbar } from "./Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-worldrep-dark-bg">
      <Navbar />
      <main className="p-4 md:p-6 container mx-auto">
        {children}
      </main>
    </div>
  );
}
