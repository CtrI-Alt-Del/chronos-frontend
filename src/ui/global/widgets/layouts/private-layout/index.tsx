"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

type PrivateLayoutProps = {
  children: ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex w-full h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex flex-col flex-1">
        <Header onMenuClick={toggleSidebar} />
        <div className="overflow-auto flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
