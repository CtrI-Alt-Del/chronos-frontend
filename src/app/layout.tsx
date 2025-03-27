import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'

import '../ui/global/styles/globals.css'
import { RootLayout } from '../ui/global/widgets/layouts/root'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Chronos',
  description: 'The best time tracking app',
}

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang='pt-BR' suppressHydrationWarning className={poppins.className}>
      <RootLayout>{children}</RootLayout>
    </html>
  )
}
