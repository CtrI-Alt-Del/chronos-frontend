"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthContextProvider } from "@/ui/auth/contexts/auth-context/auth-context";
import { getCookie } from "cookies-next";
import { ToastProvider } from "@heroui/toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function ClientProvider({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const jwt =
    typeof window !== "undefined" ? getCookie("jwt")?.toString() || null : null;

  return (
    <NuqsAdapter>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider forcedTheme="ligth" {...themeProps}>
          <ToastProvider placement="top-center" />
          <AuthContextProvider jwt={jwt}>{children}</AuthContextProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </NuqsAdapter>
  );
}
