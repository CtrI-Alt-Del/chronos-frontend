import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";

import { RootLayout } from "../ui/components/layouts";
import "../ui/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chronos",
  description: "The best time tracking app",
};

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <RootLayout>
      <div className={poppins.className}>{children}</div>
    </RootLayout>
  );
}
