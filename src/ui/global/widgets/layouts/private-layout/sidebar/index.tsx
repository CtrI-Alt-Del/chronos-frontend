'use client'

import { Navbar as NavbarRoot, NavbarContent } from '@heroui/navbar'
import { Button } from '@heroui/button'
import { cn } from '@heroui/theme'
import Image from 'next/image'

import { ROUTES } from '@/constants/routes'
import { useSidebar } from './use-sidebar'
import { ProfileCard } from './profile-card'
import { Icon } from '../../../components/Icon'
import { NavbarLink } from './navbar-link'

type SidebarProps = {
  isOpen: boolean
  onClose: VoidFunction
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const {
    collaboratorId,
    isAdmin,
    isManager,
    isEmployee,
    handleExpandButtonClick,
    handleLogoutButtonClick,
  } = useSidebar(onClose)

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
            'fixed top-0 left-0 bottom-0 flex flex-col p-0 h-full w-64 border-r border-gray-border bg-white z-50 transition-transform duration-300',
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

        <NavbarContent className='flex flex-col gap-0 w-full'>
          {(isManager || isEmployee || isAdmin) && (
            <NavbarLink
              href={ROUTES.workSchedule.dashboard}
              icon='dashboard'
              title='Dashboard'
            />
          )}

          {(isManager || isEmployee) && (
            <NavbarLink
              href={ROUTES.workSchedule.timePunch}
              icon='star'
              title='Registrar ponto'
            />
          )}

          {(isManager || isEmployee) && (
            <NavbarLink
              href={ROUTES.hourBank(collaboratorId)}
              icon='clock'
              title='Banco de horas'
            />
          )}

          {isManager && (
            <NavbarLink
              href={ROUTES.workSchedule.sectorHistory}
              icon='file-clock'
              title='Histórico de pontos'
            />
          )}

          {(isManager || isEmployee) && (
            <NavbarLink
              href={ROUTES.workSchedule.collaboratorHistory}
              icon='history'
              title='Meu histórico de pontos'
            />
          )}

          {(isAdmin || isManager) && (
            <NavbarLink
              href={ROUTES.collaboration.collaborators}
              icon='collaborator'
              title='Colaboradores'
            />
          )}

          {(isManager || isEmployee) && (
            <NavbarLink
              href={ROUTES.portal.solicitations}
              icon='report'
              title='Solicitações'
            />
          )}

          {(isAdmin || isManager) && (
            <NavbarLink
              href={ROUTES.portal.justificationTypes}
              icon='justication-type'
              title='Tipos de Justificativas'
            />
          )}

          {(isAdmin || isManager) && (
            <NavbarLink
              href={ROUTES.portal.workLeaveCalendar}
              icon='calendar'
              title='Calendário de férias e afastamentos'
            />
          )}
        </NavbarContent>

        <Button
          variant='bordered'
          startContent={<Icon name='logout' size={16} />}
          className='mb-12'
          onPress={handleLogoutButtonClick}
        >
          Sair
        </Button>
      </NavbarRoot>
    </>
  )
}
