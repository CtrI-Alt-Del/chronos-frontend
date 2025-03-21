'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}
export function ClientProvider({ children, themeProps }: ProvidersProps) {
  const router = useRouter()

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider forcedTheme='ligth' {...themeProps}>
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
