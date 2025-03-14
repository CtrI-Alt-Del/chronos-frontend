import type { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

type PrivateLayoutProps = {
  children: ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />

      <main className="flex flex-col flex-1">
        <Header />

        <div className="overflow-auto flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}
