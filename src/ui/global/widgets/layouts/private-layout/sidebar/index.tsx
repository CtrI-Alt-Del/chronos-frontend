'use client'

import { Navbar as NavbarRoot, NavbarContent } from '@heroui/navbar'
import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'
import { NavbarLink } from './navbar-link'
import { useSidebar } from './useSidebar'
import { ProfileCard } from './profile-card'
import { Icon } from '../../../components/Icon'

type SidebarProps = {
  isOpen: boolean
  onClose: VoidFunction
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { handleExpandButtonClick, handleLogoutButtonClick } = useSidebar(onClose)

  return (
    <>
      {isOpen && (
        <div
          role='button'
          tabIndex={0}
          className='fixed inset-0 z-40 bg-black/50 md:hidden'
          onClick={onClose}
          onKeyDown={handleExpandButtonClick}
        />
      )}

      <NavbarRoot
        classNames={{
          base: cn(
            'fixed top-0 left-0 flex flex-col p-0 h-full w-64 border-r border-gray-border bg-white z-50 transition-transform duration-300',
            'md:relative md:translate-x-0',
            isOpen ? 'translate-x-0' : '-translate-x-full',
          ),
          wrapper: 'flex flex-col p-0 h-full',
        }}
      >
        <div className='flex gap-2 justify-center items-center mt-6 w-full'>
          <Image src='/images/logo.svg' alt='Chronos' width={35} height={35} />
          <p className='ml-1 text-3xl font-bold text-black'>Chronos</p>
        </div>

        <div className='mt-6'>
          <ProfileCard />
        </div>

        <NavbarContent className='flex flex-col w-full hover:cursor-pointer'>
          <NavbarContent className='flex flex-col gap-0 w-full'>
            <NavbarLink
              href={ROUTES.workSchedule.schedules}
              icon='star'
              title='Registrar ponto'
            />

            <NavbarLink
              href={ROUTES.workSchedule.history}
              icon='history'
              title='Histórico de pontos'
            />

            <NavbarLink
              href={ROUTES.workSchedule.timeCard}
              icon='mirror'
              title='Espelho de pontos'
            />

            <NavbarLink
              href={ROUTES.workSchedule.schedules}
              icon='report'
              title='Revisões'
            />

            <NavbarLink href={ROUTES.report} icon='report' title='Relatório analítico' />
          </NavbarContent>
        </NavbarContent>

        <Button 
          variant="bordered" 
          startContent={<Icon name="logout" size={16} />}
          className="mb-12" 
          onClick={handleLogoutButtonClick}>
          Sair
        </Button>
     
      </NavbarRoot>
    </>
  )
}
