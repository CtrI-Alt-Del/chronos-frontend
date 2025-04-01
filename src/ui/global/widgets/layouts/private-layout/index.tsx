'use client'

import type { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { usePrivateLayout } from './use-private-layout'

type PrivateLayoutProps = {
  children: ReactNode
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const { isSidebarOpen, handleSidebarClose, handleMenuClick } = usePrivateLayout()

  return (
    <div className='flex w-full h-screen'>
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      <main className='flex flex-col flex-1'>
        <Header onMenuClick={handleMenuClick} />
        <div className='overflow-auto flex-1 px-6 pb-12'>{children}</div>
      </main>
    </div>
  )
}
