import React, { ReactNode } from 'react';
import Footer from "../footer/Footer";
import Header from "../header/Header";

interface DashboardProps {
    children: ReactNode;
  }

export default function Dashboard({ children }: DashboardProps) {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4">
      {children}
      </main>
      <Footer />
    </div>
  );
}
