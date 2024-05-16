import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-full min-h-screen bg-primary">
      <Navbar />
      <main className="p-8">{children}</main>
    </div>
  );
}
