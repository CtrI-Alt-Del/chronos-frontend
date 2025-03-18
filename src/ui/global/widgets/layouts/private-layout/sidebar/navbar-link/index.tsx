import { NavbarItem } from '@heroui/navbar'
import { cn } from '@heroui/theme'
import Image from 'next/image'
import Link from 'next/link'

import type { IconName } from '../../../../components/Icon/types/IconName'
import { Icon } from '../../../../components/Icon'

type NavbarLinkProps = {
  href: string
  icon: IconName
  title: string
  isActive: boolean
  highlight?: boolean
}

export const NavbarLink = ({ href, icon, title, isActive }: NavbarLinkProps) => {
  return (
    <NavbarItem className='flex flex-col justify-center items-center mb-2 w-full'>
      <Link
        href={href}
        className={cn(
          'flex items-center py-3 pl-10 w-full text-sm font-semibold',
          isActive
            ? 'rounded-r-full rounded-l-none text-blue-secondary bg-blue-tertiary'
            : 'font-medium text-black hover:text-blue-secondary/90 hover:transition-all',
        )}
      >
        <span className='mr-2'>
          <Icon
            name={icon}
            className={isActive ? 'fill-[#1200AF]' : 'fill-[#000]'}
          />
        </span>
        <span>{title}</span>
      </Link>
      <span
        className={`w-[80%] h-1 ${
          isActive ? 'border-none' : 'border-b border-gray-border'
        }`}
      />
    </NavbarItem>
  )
}
