import type { Metadata } from "next";
import type { ReactNode } from "react";

import { RootLayout } from "../ui/components/layouts"; 
import "../ui/styles/globals.css";

export const metadata: Metadata = {
  title: "Chronos",
  description: "God of time",
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <RootLayout>{children}</RootLayout>;
}
