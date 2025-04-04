import type { ReactNode } from 'react'

import { ClientProvider } from './client-provider'

type RootLayoutProps = { children: ReactNode }

export const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <body className='min-h-screen w-full bg-zinc-50'>
      <ClientProvider>{children}</ClientProvider>
    </body>
  )
}
