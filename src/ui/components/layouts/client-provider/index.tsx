"use client";

import type { ReactNode } from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
type ClientProviderProps = { children: ReactNode };

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}
export function ClientProvider({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider forcedTheme="ligth" {...themeProps}>
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
